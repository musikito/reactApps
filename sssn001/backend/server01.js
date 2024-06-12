require("dotenv").config() // Load .env file
const mysql = require("mysql2")
const cors = require("cors")
const bodyParser = require("body-parser")
const PORT = process.env.PORT
const express = require("express") // init express server
const app = express()

// use cors middleware
app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json()) // This must be before any routes

// MySQL Configuration
const HOST = process.env.DB_HOST
const DBUSERNAME = process.env.DB_USER
const DBPW = process.env.DB_PASS
const DATABASE = process.env.DB_NAME

// MySQL Connection
const db = mysql.createConnection({
  host: HOST,
  user: DBUSERNAME,
  password: DBPW,
  database: DATABASE,
})

db.connect((err) => {
  if (err) return console.error(err.message)

  console.log(`Connected to the Database!`)
})

/////////////////////
//    ROUTES       //
/////////////////////

// POST Login
app.post("/api/login", (req, res) => {
  // console.log("Received request:", req.body) // Debugging log
  const { username, password } = req.body // Destructure data submitted on form

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" })
  }

  const query = `SELECT * FROM users WHERE username = ?`

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" })
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" })
    }

    const loginDetails = results[0]

    // If username matches username in result obj and password match
    if (
      username === loginDetails.username &&
      password === loginDetails.password
    ) {
      console.log(`User ${username} has logged in`)
      res.status(200).json({ message: "Login successful" })
    } else {
      console.log("Failed Login Attempt!")
      res.status(401).json({ error: "Invalid username or password" })
    }
  })
})

// GET All Users
app.get("/api/users/all", (req, res) => {
  console.log("GET: All Users")

  // query
  const query = "SELECT username FROM users ORDER BY username ASC"

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack)
      res.status(500).send("Server error")
      return
    }
    res.json(results)
  })
})

// GET All Posts
app.get("/api/posts/all", (req, res) => {
  console.log("GET: All Posts")

  // query
  const query = "SELECT * FROM posts ORDER BY created_at DESC"

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack)
      res.status(500).send("Server error")
      return
    }
    res.json(results)
  })
})

// GET :username Posts
app.get("/api/user/:username/posts", (req, res) => {
  const username = req.params.username
  console.log(`GET: User ${username} Posts`)

  const query = "SELECT * FROM posts WHERE username = ?"
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query:", err)
      res.status(500).send("Server error")
      return
    }

    if (results.length === 0) {
      res.status(404).send("User not found")
      return
    }

    res.json(results)
  })
})

app.listen(PORT, () => {
  console.log(`Node.js server running at http://localhost:${PORT}`)
})