const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'covid19IndiaPortal.db')
let db = null

const initializeServer = async () => {
  try {
    db = await open({filename: dbPath, driver: sqlite3.Database})
    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000')
    })
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}
initializeServer()

app.post('/login/', async (req, res) => {
  const {username, password} = req.body
  const query = `SELECT * FROM user WHERE username = ?;`
  const user = await db.get(query, [username])

  if (user === undefined) {
    res.status(400).send('Invalid user')
  } else {
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (isValidPassword) {
      const payload = {username: username}
      const jwtToken = jwt.sign(payload, 'secret_key_vivek')
      res.send({jwtToken})
    } else {
      res.status(400).send('Invalid password')
    }
  }
})

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  let token
  if (authHeader !== undefined) {
    token = authHeader.split(' ')[1]
  }
  if (token === undefined) {
    res.status(401).send('Invalid JWT Token')
  } else {
    jwt.verify(token, 'secret_key_vivek', (error, payload) => {
      if (error) {
        res.status(401).send('Invalid JWT Token')
      } else {
        req.username = payload.username
        next()
      }
    })
  }
}

const mapState = obj => ({
  stateId: obj.state_id,
  stateName: obj.state_name,
  population: obj.population,
})

const mapDistrict = obj => ({
  districtId: obj.district_id,
  districtName: obj.district_name,
  stateId: obj.state_id,
  cases: obj.cases,
  cured: obj.cured,
  active: obj.active,
  deaths: obj.deaths,
})

app.get('/states/', verifyToken, async (req, res) => {
  const query = `SELECT * FROM state;`
  const rows = await db.all(query)
  res.send(rows.map(item => mapState(item)))
})

app.get('/states/:stateId/', verifyToken, async (req, res) => {
  const {stateId} = req.params
  const query = `SELECT * FROM state WHERE state_id = ?;`
  const row = await db.get(query, [stateId])
  res.send(mapState(row))
})

app.post('/districts/', verifyToken, async (req, res) => {
  const {districtName, stateId, cases, cured, active, deaths} = req.body
  const query = `
    INSERT INTO district (district_name, state_id, cases, cured, active, deaths)
    VALUES (?, ?, ?, ?, ?, ?);`
  await db.run(query, [districtName, stateId, cases, cured, active, deaths])
  res.send('District Successfully Added')
})

app.get('/districts/:districtId/', verifyToken, async (req, res) => {
  const {districtId} = req.params
  const query = `SELECT * FROM district WHERE district_id = ?;`
  const row = await db.get(query, [districtId])
  res.send(mapDistrict(row))
})

app.delete('/districts/:districtId/', verifyToken, async (req, res) => {
  const {districtId} = req.params
  const query = `DELETE FROM district WHERE district_id = ?;`
  await db.run(query, [districtId])
  res.send('District Removed')
})

app.put('/districts/:districtId/', verifyToken, async (req, res) => {
  const {districtId} = req.params
  const {districtName, stateId, cases, cured, active, deaths} = req.body
  const query = `
    UPDATE district
    SET district_name = ?, state_id = ?, cases = ?, cured = ?, active = ?, deaths = ?
    WHERE district_id = ?;`
  await db.run(query, [
    districtName,
    stateId,
    cases,
    cured,
    active,
    deaths,
    districtId,
  ])
  res.send('District Details Updated')
})

app.get('/states/:stateId/stats/', verifyToken, async (req, res) => {
  const {stateId} = req.params
  const query = `
    SELECT 
      SUM(cases) AS totalCases,
      SUM(cured) AS totalCured,
      SUM(active) AS totalActive,
      SUM(deaths) AS totalDeaths
    FROM district WHERE state_id = ?;`
  const row = await db.get(query, [stateId])
  res.send(row)
})

module.exports = app
