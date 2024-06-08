require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const cors = require("cors")

const app = express();
// use cors middleware
app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// User registration endpoint
app.post('/register', async (req, res) => {
  const { username, password, email, fullName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
    'INSERT INTO Users (username, hashed_password, email, full_name) VALUES (?, ?, ?, ?)',
    [username, hashedPassword, email, fullName],
    (error, results) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(201).json({ id: results.insertId, username, email, fullName });
    }
  );
});

// User login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  pool.query(
    'SELECT * FROM Users WHERE username = ?',
    [username],
    async (error, results) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const user = results[0];

      if (user && await bcrypt.compare(password, user.hashed_password)) {
        res.json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
