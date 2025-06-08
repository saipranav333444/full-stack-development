const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let db = null;
const dbPath = path.join(__dirname, "covid19IndiaPortal.db");

//CONNECT DATABASE AND SERVER

const initializeDbAndServer = async (req, res) => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("SERVER IS RUNNING ON http://localhost:3000/");
    });
  } catch (e) {
    console.log(`ERROR ${e}`);
  }
};

initializeDbAndServer();

//API 1

app.post("/login/", async (req, res) => {
  const { username, password } = req.body;
  const userQuery = `SELECT * FROM user WHERE username = ?`;
  const user = await db.get(userQuery, [username]);

  if (!user) {
    res.status(400).send("Invalid user");
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(400).send("Invalid password");
    return;
  }

  const payload = { username: user.username };
  const jwtToken = jwt.sign(payload, "THE_SECRET_KEY");
  res.send({ jwtToken });
});

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];

  if (authHeader === undefined) {
    response.status(401).send("Invalid JWT Token");
  } else {
    const jwtToken = authHeader.split(" ")[1];

    jwt.verify(jwtToken, "THE_SECRET_KEY", (error, payload) => {
      if (error) {
        response.status(401).send("Invalid JWT Token");
      } else {
        request.username = payload.username;
        next();
      }
    });
  }
};

//API 2

app.get("/states/", authenticateToken, async (req, res) => {
  const query2 = `
    SELECT 
      state_id AS stateId,
      state_name AS stateName,
      population 
    FROM state`;
  const stateDetails = await db.all(query2);
  res.send(stateDetails);
});

//API 3
app.get("/states/:stateId/", authenticateToken, async (req, res) => {
  const { stateId } = req.params;
  const query3 = `
    SELECT 
      state_id AS stateId,
      state_name AS stateName,
      population 
    FROM state WHERE state_id = ?`;
  const stateDetails = await db.get(query3, [stateId]);
  res.send(stateDetails);
});

//API 4
app.post("/districts/", authenticateToken, async (req, res) => {
  const { districtName, stateId, cases, cured, active, deaths } = req.body;
  const query4 = `
    INSERT INTO district (district_name, state_id, cases, cured, active, deaths)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    await db.run(query4, [districtName, stateId, cases, cured, active, deaths]);
    res.status(200).send("District Successfully Added");
  } catch (error) {
    res.status(500).send("Error adding district");
  }
});

// API 5 - Get district by districtId
app.get("/districts/:districtId/", authenticateToken, async (req, res) => {
  const { districtId } = req.params;
  const query = `
    SELECT 
      district_id AS districtId,
      district_name AS districtName,
      state_id AS stateId,
      cases,
      cured,
      active,
      deaths
    FROM district
    WHERE district_id = ?;
  `;
  try {
    const district = await db.get(query, [districtId]);
    if (district) {
      res.send(district);
    } else {
      res.status(404).send("District Not Found");
    }
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

// API 6 - Delete district by districtId
app.delete("/districts/:districtId/", authenticateToken, async (req, res) => {
  const { districtId } = req.params;
  const query = `DELETE FROM district WHERE district_id = ?;`;
  try {
    const result = await db.run(query, [districtId]);
    if (result.changes > 0) {
      res.send("District Removed");
    } else {
      res.status(404).send("District Not Found");
    }
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

// API 7 - Update district details by districtId
app.put("/districts/:districtId/", authenticateToken, async (req, res) => {
  const { districtId } = req.params;
  const { districtName, stateId, cases, cured, active, deaths } = req.body;
  const query = `
    UPDATE district 
    SET 
      district_name = ?,
      state_id = ?,
      cases = ?,
      cured = ?,
      active = ?,
      deaths = ?
    WHERE district_id = ?;
  `;
  try {
    const result = await db.run(query, [
      districtName,
      stateId,
      cases,
      cured,
      active,
      deaths,
      districtId,
    ]);
    if (result.changes > 0) {
      res.send("District Details Updated");
    } else {
      res.status(404).send("District Not Found");
    }
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

// API 8 - Get state stats by stateId
app.get("/states/:stateId/stats/", authenticateToken, async (req, res) => {
  const { stateId } = req.params;
  const query = `
    SELECT 
      SUM(cases) AS totalCases,
      SUM(cured) AS totalCured,
      SUM(active) AS totalActive,
      SUM(deaths) AS totalDeaths
    FROM district
    WHERE state_id = ?;
  `;
  try {
    const stats = await db.get(query, [stateId]);
    if (stats) {
      // If the state has no districts, sums might be null, so default to 0
      res.send({
        totalCases: stats.totalCases || 0,
        totalCured: stats.totalCured || 0,
        totalActive: stats.totalActive || 0,
        totalDeaths: stats.totalDeaths || 0,
      });
    } else {
      res.status(404).send("State Not Found");
    }
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

module.exports = app;
