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

// Create the pool to connect to the database
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

  // pool.query(
  //   'INSERT INTO Users (username, hashed_password, email, full_name) VALUES (?, ?, ?, ?)',
  //   [username, hashedPassword, email, fullName],
  //   (error, results) => {
  //     if (error) {
  //       return res.status(400).json({ error: error.message });
  //     }
  //     res.status(201).json({ id: results.insertId, username, email, fullName });
  //   }
  // );
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

  // pool.query(
  //   'SELECT * FROM Users WHERE username = ?',
  //   [username],
  //   async (error, results) => {
  //     if (error) {
  //       return res.status(400).json({ error: error.message });
  //     }
  //     const user = results[0];

  //     if (user && await bcrypt.compare(password, user.hashed_password)) {
  //       res.json({ message: 'Login successful', user });
  //     } else {
  //       res.status(401).json({ error: 'Invalid username or password' });
  //     }
  //   }
  // );
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

  try {
    const [results] = await pool.query(
      'INSERT INTO Tweets (user_id, content) VALUES (?, ?)',
      [userId, content]
    );
    res.status(201).json({ id: results.insertId, userId, content, date: new Date() });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tweets
app.get('/tweets', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM Tweets');
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/*
// Add post endpoint
app.post('/add-post', async (req, res) => {
  const { user_id, content } = req.body;

  try {
    const [results] = await pool.query(
      'INSERT INTO Posts (user_id, content) VALUES (?, ?)',
      [user_id, content]
    );
    return res.status(201).json({ message: 'Post added' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Get all posts endpoint
app.get('/get-posts', async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM Posts");
    res.json(results);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  // pool.query('SELECT * FROM Posts', (error, results) => {
  //   if (error) {
  //     return res.status(400).json({ error: error.message });
  //   }
  //   res.json(results);
  // });
});

// Get post by id endpoint
app.get('/get-post/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool.query("SELECT * FROM Posts WHERE id =?", [id]);
    if (results.lenght === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });

  }
  // pool.query('SELECT * FROM Posts WHERE id =?', [id], (error, results) => {
  //   if (error) {
  //     return res.status(400).json({ error: error.message });
  //   }
  //   res.json(results);
  // });
});

// Get all users endpoint
app.get('/get-users', async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM Users");
    res.json(results);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  // pool.query('SELECT * FROM Users', (error, results) => {
  //   if (error) {
  //     return res.status(400).json({ error: error.message });
  //   }
  //   res.json(results);
  // });
});

// Get user by id endpoint
app.get('/get-user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query("SELECT * FROM Users WHERE id =?", [id]);
    if (results.lenght === 0) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });

  }
  // pool.query('SELECT * FROM Users WHERE id =?', [id], (error, results) => {
  //   if (error) {
  //     return res.status(400).json({ error: error.message });
  //   }
  //   res.json(results);
  // });
});
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
