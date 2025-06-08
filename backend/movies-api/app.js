const express = require("express");
const app = express();
app.use(express.json());

const path = require("path");

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db = null;
const dbPath = path.join(__dirname, "moviesData.db");

//initialize and connect DATABASE WITH SERVER
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log(`SERVER IS RUNNING ON http://localhost:3000/`);
    });
  } catch (e) {
    console.log(`You have an error ${e}`);
  }
};

initializeDBAndServer();

//initialize and connect DATABASE WITH SERVER

//API 1

app.get("/movies/", async (req, res) => {
  const getMoviesQuery = `
    SELECT movie_name AS movieName FROM movie;
  `;
  const movies = await db.all(getMoviesQuery);
  res.send(movies);
});

//API 1

//API 2

app.post("/movies", async (req, res) => {
  const { directorId, movieName, leadActor } = req.body;
  const query = `
    INSERT INTO movie (director_id, movie_name, lead_actor)
    VALUES (?, ?, ?);
  `;
  await db.run(query, [directorId, movieName, leadActor]);
  res.send("Movie Successfully Added");
  console.log("Movie Successfully Added");
});

//API 2

//API 3

app.get("/movies/:movieId/", async (req, res) => {
  const { movieId } = req.params;
  const query = `
    SELECT 
      movie_id AS movieId,
      director_id AS directorId,
      movie_name AS movieName,
      lead_actor AS leadActor
    FROM movie
    WHERE movie_id = ?;
  `;
  const movie = await db.get(query, [movieId]);
  res.send(movie);
  console.log(movie);
});

//API 3

//API 4
app.put("/movies/:movieId/", async (req, res) => {
  const { movieId } = req.params;
  const { directorId, movieName, leadActor } = req.body;

  const query = `
    UPDATE movie
    SET
      director_id = ?,
      movie_name = ?,
      lead_actor = ?
    WHERE movie_id = ?;
  `;

  await db.run(query, [directorId, movieName, leadActor, movieId]);
  res.send("Movie Details Updated");
});

//API 4

//API5
app.delete("/movies/:movieId/", async (req, res) => {
  const { movieId } = req.params;
  const query5 = `DELETE FROM movie WHERE movie_id = ?`;
  await db.run(query5, movieId);
  res.send("Movie Removed");
});
//API5

//API 6
app.get("/directors", async (req, res) => {
  const query6 = `SELECT director_id AS directorId, director_name AS directorName FROM director`;
  const directorResults = await db.all(query6);
  res.send(directorResults);
});
//API 6

//API 7
app.get("/directors/:directorId/movies/", async (req, res) => {
  const { directorId } = req.params;
  const query7 = `SELECT movie_name as movieName from movie WHERE director_id = ?`;
  const specificMovie = await db.all(query7, [directorId]);
  res.send(specificMovie);
});
//API 7

module.exports = app;
