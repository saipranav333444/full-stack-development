const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db = null;
const dbPath = path.join(__dirname, "userData.db");

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log(`SERVER RUNNING AT http://localhost:3000/`);
    });
  } catch (e) {
    console.log(`ERROR MESSAGE ${e}`);
  }
};

initializeDbAndServer();

// CONNECTED DATABASE WITH SERVER AT PORT 3000

//API 1

app.post("/register", async (req, res) => {
  const { username, name, password, gender, location } = req.body;

  const checkingUser = `SELECT * FROM user WHERE username = ?`;
  const result = await db.get(checkingUser, [username]);

  if (result !== undefined) {
    res.status(400).send("User already exists");
    return;
  }
  if (password.length < 5) {
    res.status(400).send("Password is too short");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const insertingUser = `INSERT INTO user(username, name, password, gender, location)
  VALUES (?,?,?,?,?)`;
  await db.run(insertingUser, [
    username,
    name,
    hashedPassword,
    gender,
    location,
  ]);
  res.status(200).send("User created successfully");
});

//API 2

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDetailsQuery = `SELECT * FROM user WHERE username = ?`;
  const dbUser = await db.get(userDetailsQuery, [username]);
  if (dbUser === undefined) {
    res.status(400).send("Invalid user");
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, dbUser.password);

  if (!isPasswordValid) {
    res.status(400).send("Invalid password");
    return;
  }

  res.status(200).send("Login success!");
});

//API 3

app.put("/change-password", async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const query3 = `SELECT * FROM user WHERE username = ?`;
  const userDetails = await db.get(query3, [username]);

  const isValidCurrentPassword = await bcrypt.compare(
    oldPassword,
    userDetails.password
  );

  if (!isValidCurrentPassword) {
    res.status(400).send("Invalid current password");
    return;
  }

  if (newPassword.length < 5) {
    res.status(400).send("Password is too short");
    return;
  }

  const newPasswordBcrypt = await bcrypt.hash(newPassword, 10);
  const updatePasswordQuery = `UPDATE user SET password = ? WHERE username = ?`;
  await db.run(updatePasswordQuery, [newPasswordBcrypt, username]);
  res.status(200).send("Password updated");
});

module.exports = app;
