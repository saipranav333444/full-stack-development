const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "twitterClone.db");
let db = null;

const initializeDbAndServer = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000/");
  });
};
initializeDbAndServer();

app.post("/register/", async (request, response) => {
  const { username, password, name, gender } = request.body;
  const userCheckQuery = `SELECT * FROM user WHERE username = '${username}';`;
  const dbUser = await db.get(userCheckQuery);
  if (dbUser) {
    response.status(400).send("User already exists");
  } else if (password.length < 6) {
    response.status(400).send("Password is too short");
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    await db.run(`INSERT INTO user(username, password, name, gender) 
      VALUES ('${username}', '${hashPassword}', '${name}', '${gender}')`);
    response.send("User created successfully");
  }
});

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const jwtToken = authHeader?.split(" ")[1];
  if (!jwtToken) return response.status(401).send("Invalid JWT Token");

  jwt.verify(jwtToken, "SECRET_KEY", (error, payload) => {
    if (error) return response.status(401).send("Invalid JWT Token");
    request.username = payload.username;
    next();
  });
};

app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const dbUser = await db.get(
    `SELECT * FROM user WHERE username = '${username}'`
  );
  if (!dbUser) return response.status(400).send("Invalid user");

  const isPasswordValid = await bcrypt.compare(password, dbUser.password);
  if (!isPasswordValid) return response.status(400).send("Invalid password");

  response.send({ jwtToken: jwt.sign({ username }, "SECRET_KEY") });
});

const getUserId = async (username) => {
  const dbUser = await db.get(
    `SELECT user_id FROM user WHERE username = '${username}'`
  );
  return dbUser.user_id;
};

app.get("/user/tweets/feed/", authenticateToken, async (request, response) => {
  const userId = await getUserId(request.username);
  const tweets = await db.all(`
    SELECT user.username, tweet.tweet, tweet.date_time AS dateTime 
    FROM follower
    JOIN tweet ON follower.following_user_id = tweet.user_id
    JOIN user ON tweet.user_id = user.user_id
    WHERE follower.follower_user_id = ${userId}
    ORDER BY tweet.date_time DESC
    LIMIT 4`);
  response.send(tweets);
});

app.get("/user/following/", authenticateToken, async (request, response) => {
  const userId = await getUserId(request.username);
  const following = await db.all(`
    SELECT user.name 
    FROM follower
    JOIN user ON follower.following_user_id = user.user_id
    WHERE follower.follower_user_id = ${userId}`);
  response.send(following);
});

app.get("/user/followers/", authenticateToken, async (request, response) => {
  const userId = await getUserId(request.username);
  const followers = await db.all(`
    SELECT user.name 
    FROM follower
    JOIN user ON follower.follower_user_id = user.user_id
    WHERE follower.following_user_id = ${userId}`);
  response.send(followers);
});

const validateTweetAccess = async (request, response, next) => {
  const userId = await getUserId(request.username);
  const tweet = await db.get(`
    SELECT user_id FROM tweet WHERE tweet_id = ${request.params.tweetId}`);

  const isFollowing = await db.get(`
    SELECT * FROM follower 
    WHERE follower_user_id = ${userId} 
    AND following_user_id = ${tweet.user_id}`);

  if (!isFollowing) return response.status(401).send("Invalid Request");
  next();
};

app.get(
  "/tweets/:tweetId/",
  authenticateToken,
  validateTweetAccess,
  async (request, response) => {
    const tweetData = await db.get(`
    SELECT tweet, date_time AS dateTime 
    FROM tweet WHERE tweet_id = ${request.params.tweetId}`);

    const likes = await db.get(`
    SELECT COUNT(*) AS likes 
    FROM like WHERE tweet_id = ${request.params.tweetId}`);

    const replies = await db.get(`
    SELECT COUNT(*) AS replies 
    FROM reply WHERE tweet_id = ${request.params.tweetId}`);

    response.send({ ...tweetData, ...likes, ...replies });
  }
);

app.get(
  "/tweets/:tweetId/likes/",
  authenticateToken,
  validateTweetAccess,
  async (request, response) => {
    const likes = await db.all(`
    SELECT user.username 
    FROM like
    JOIN user ON like.user_id = user.user_id
    WHERE tweet_id = ${request.params.tweetId}`);
    response.send({ likes: likes.map((user) => user.username) });
  }
);

app.get(
  "/tweets/:tweetId/replies/",
  authenticateToken,
  validateTweetAccess,
  async (request, response) => {
    const replies = await db.all(`
    SELECT user.name, reply.reply 
    FROM reply
    JOIN user ON reply.user_id = user.user_id
    WHERE tweet_id = ${request.params.tweetId}`);
    response.send({ replies });
  }
);

app.get("/user/tweets/", authenticateToken, async (request, response) => {
  const userId = await getUserId(request.username);
  const tweets = await db.all(`
    SELECT 
      tweet.tweet,
      COUNT(DISTINCT like.like_id) AS likes,
      COUNT(DISTINCT reply.reply_id) AS replies,
      tweet.date_time AS dateTime
    FROM tweet
    LEFT JOIN like ON tweet.tweet_id = like.tweet_id
    LEFT JOIN reply ON tweet.tweet_id = reply.tweet_id
    WHERE tweet.user_id = ${userId}
    GROUP BY tweet.tweet_id`);
  response.send(tweets);
});

app.post("/user/tweets/", authenticateToken, async (request, response) => {
  const userId = await getUserId(request.username);
  const { tweet } = request.body;
  await db.run(`
    INSERT INTO tweet (tweet, user_id, date_time)
    VALUES ('${tweet}', ${userId}, datetime('now'))`);
  response.send("Created a Tweet");
});

app.delete(
  "/tweets/:tweetId/",
  authenticateToken,
  async (request, response) => {
    const userId = await getUserId(request.username);
    const tweet = await db.get(`
    SELECT user_id FROM tweet 
    WHERE tweet_id = ${request.params.tweetId}`);

    if (tweet.user_id !== userId)
      return response.status(401).send("Invalid Request");

    await db.run(
      `DELETE FROM tweet WHERE tweet_id = ${request.params.tweetId}`
    );
    response.send("Tweet Removed");
  }
);

module.exports = app;
