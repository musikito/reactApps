import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// User registration endpoint
app.post('/register', async (req, res) => {
  const { username, password, email, fullName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [results] = await pool.query(
      'INSERT INTO Users (username, hashed_password, email, full_name) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, email, fullName]
    );
    res.status(201).json({ id: results.insertId, username, email, fullName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    const user = results[0];

    if (user && await bcrypt.compare(password, user.hashed_password)) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
