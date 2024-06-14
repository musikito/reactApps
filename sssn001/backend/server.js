require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const cors = require("cors")

/** Middleware */
const app = express();
app.use(cors());
app.use(bodyParser.json());


// connect to the Database
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

// Add tweet endpoint
app.post('/tweets', async (req, res) => {
  const { userId, content } = req.body;
  console.log(req.body);

  try {
    const [results] = await pool.query(
      'INSERT INTO Posts (user_id, content) VALUES (?, ?)',
      [userId, content]
    );
    const tweetId = results.insertId;
    const date = new Date().toISOString();
    res.status(201).json({ id: tweetId, userId, content, date });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get home tweets
app.get('/tweets/home', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM Posts ORDER BY posts.created_at DESC');
    console.log('resultados',results);
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get all tweets
app.get('/tweets', async (req, res) => {

  try {
    const [results] = await pool.query('SELECT * FROM Posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC');
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get tweet by ID
app.get('/tweets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool.query('SELECT * FROM Posts WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    res.json(results[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM Users');
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Like tweet endpoint
app.post('/tweets/:id/like', async (req, res) => {
  const tweetId = req.params.id;

  try {
    await pool.query('UPDATE Posts SET like_count = like_count + 1 WHERE id = ?', [tweetId]);
    res.status(200).json({ message: 'Tweet liked' });
    console.log("Tweet liked");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Dislike tweet endpoint
app.post('/tweets/:id/dislike', async (req, res) => {
  const tweetId = req.params.id;

  try {
    await pool.query('UPDATE Posts SET dislike_count = dislike_count + 1 WHERE id = ?', [tweetId]);
    res.status(200).json({ message: 'Tweet disliked' });
    console.log("Tweet disliked");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get tweets by user ID
app.get('/tweets/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [results] = await pool.query(
      "select * from posts JOIN users ON posts.user_id = users.id where user_id = ?",
      [userId]
    );
    // const [results] = await pool.query('SELECT * FROM Posts WHERE user_id = ?', [userId]);
    // console.log("resultados del user", results);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
