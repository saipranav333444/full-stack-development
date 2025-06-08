const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

let db = null;
const dbPath = path.join(__dirname, "covid19India.db");

const initializeDBAndServer = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  app.listen(3000, () => {
    console.log(`server running at http://localhost:3000/`);
  });
};

initializeDBAndServer();

// API 1: Get all states
app.get("/states/", async (req, res) => {
  const query1 = `SELECT * FROM state`;
  const dbResponse = await db.all(query1);
  const formattedResponse = dbResponse.map((eachState) => ({
    stateId: eachState.state_id,
    stateName: eachState.state_name,
    population: eachState.population,
  }));
  res.send(formattedResponse);
  console.log("API 1 http://localhost:3000/states");
});

// API 2: Get state by ID
app.get("/states/:stateId/", async (req, res) => {
  const { stateId } = req.params;
  const query2 = `SELECT * FROM state WHERE state_id = ?`;
  const dbResponse = await db.get(query2, [stateId]);
  if (dbResponse) {
    const formattedResponse = {
      stateId: dbResponse.state_id,
      stateName: dbResponse.state_name,
      population: dbResponse.population,
    };
    res.send(formattedResponse);
  } else {
    res.status(404).send({ error: "State Not Found" });
  }
  console.log("API 2 http://localhost:3000/states/:stateId/");
});

// API 3: Add new district
app.post("/districts/", async (req, res) => {
  const { districtName, stateId, cases, cured, active, deaths } = req.body;
  const query3 = `
    INSERT INTO district (district_name, state_id, cases, cured, active, deaths)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await db.run(query3, [districtName, stateId, cases, cured, active, deaths]);
  res.send("District Successfully Added");
  console.log("API 3 District added at http://localhost:3000/districts/");
});

// API 4: Get district by ID
app.get("/districts/:districtId/", async (req, res) => {
  const { districtId } = req.params;
  const query4 = `SELECT * FROM district WHERE district_id = ?`;
  const dbResponse = await db.get(query4, [districtId]);
  if (dbResponse) {
    const formattedResponse = {
      districtId: dbResponse.district_id,
      districtName: dbResponse.district_name,
      stateId: dbResponse.state_id,
      cases: dbResponse.cases,
      cured: dbResponse.cured,
      active: dbResponse.active,
      deaths: dbResponse.deaths,
    };
    res.send(formattedResponse);
  } else {
    res.status(404).send({ error: "District Not Found" });
  }
  console.log("API 4 http://localhost:3000/districts/:districtId/");
});

// API 5: Delete district by ID
app.delete("/districts/:districtId/", async (req, res) => {
  const { districtId } = req.params;
  const query5 = `DELETE FROM district WHERE district_id = ?`;
  await db.run(query5, [districtId]);
  res.send("District Removed");
  console.log("API 5 http://localhost:3000/districts/:districtId/");
});

// API 6: Update district details
app.put("/districts/:districtId/", async (req, res) => {
  const { districtId } = req.params;
  const { districtName, stateId, cases, cured, active, deaths } = req.body;
  const updateQuery = `
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
  await db.run(updateQuery, [
    districtName,
    stateId,
    cases,
    cured,
    active,
    deaths,
    districtId,
  ]);
  res.send("District Details Updated");
  console.log("API 6: PUT http://localhost:3000/districts/" + districtId);
});

// API 7: Get stats of a state
app.get("/states/:stateId/stats/", async (req, res) => {
  const { stateId } = req.params;
  const statsQuery = `
    SELECT 
      SUM(cases) AS totalCases,
      SUM(cured) AS totalCured,
      SUM(active) AS totalActive,
      SUM(deaths) AS totalDeaths
    FROM district
    WHERE state_id = ?;
  `;
  const stats = await db.get(statsQuery, [stateId]);
  res.send(stats);
  console.log("API 7: GET http://localhost:3000/states/" + stateId + "/stats/");
  console.log(stats);
});

// API 8: Get state name for a district
app.get("/districts/:districtId/details/", async (req, res) => {
  const { districtId } = req.params;
  const getStateNameQuery = `
    SELECT state.state_name AS stateName
    FROM district
    INNER JOIN state ON district.state_id = state.state_id
    WHERE district.district_id = ?;
  `;
  const result = await db.get(getStateNameQuery, [districtId]);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ error: "District Not Found" });
  }
  console.log(
    "API 8: GET http://localhost:3000/districts/:districtId/details/"
  );
  console.log(result);
});

module.exports = app;
