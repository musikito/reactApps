# Super Simple Twitter Clone

This project is a simple Twitter clone built with React, TypeScript, and Node.js. It allows users to register, log in, post tweets, and like or dislike tweets. The backend uses MySQL for database management.

###  - Table of Contents
 - Features
 - Technologies Used
 - Getting Started
 - Prerequisites
 - Installation
 - Running the Application
 - Project Structure
 - API Endpoints
 - Contributing
 - License
### - Features
 - User authentication (register and login)
 - Post tweets
 - Like and dislike tweets
 - View all tweets
 - View tweets by a specific user
 ### - Technologies Used
 - Frontend: React, TypeScript, Bootstrap, Axios, React Router
 - Backend: Node.js, Express, MySQL, bcrypt
 ### - Getting Started
 ####  Prerequisites
 - Node.js (v12.x or later)
 - MySQL (v5.7 or later)
 ### - Installation
 1.- Clone the repository:

### bash
    git clone https://github.com/your-username/twitter-clone.git
    cd twitter-clone
 2.- Install dependencies for the backend:

### bash
    cd backend
    npm install
3.- Install dependencies for the frontend:

### bash
    cd ../frontend
    npm install
4.- Set up the MySQL database:

 - Create a MySQL database named twitter_clone.

 - Run the following SQL commands to create the necessary tables:

### sql
    CREATE DATABASE twitter_clone;
    USE twitter_clone;

    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
    );

    CREATE TABLE tweets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT,
    date DATETIME,
    like_count INT DEFAULT 0,
    dislike_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );
5. -Set up environment variables:

 - Create a .env file in the backend directory with the following content:

### env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=twitter_clone
## Running the Application
 1.- Start the backend server:

### bash
    cd backend
    npm start
2.- Start the frontend server:

### bash
    cd ../frontend
    npm start
3.- Open your browser and navigate to http://localhost:3000.

## Project Structure
    twitter-clone/
    ├── backend/
    │   ├── index.js
    │   ├── package.json
    │   ├── .env
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── Auth.tsx
    │   │   │   ├── TweetForm.tsx
    │   │   │   ├── TweetList.tsx
    │   │   │   ├── UserTweets.tsx
    │   │   ├── App.tsx
    │   │   ├── index.tsx
    │   ├── package.json
    ├── README.md

## API Endpoints
### User Endpoints
POST /register: Register a new user

Request body: { "username": "string", "password": "string" }
Response: { "id": number, "username": "string" }
POST /login: Login a user

Request body: { "username": "string", "password": "string" }
Response: { "id": number, "username": "string" }
Tweet Endpoints
GET /tweets: Get all tweets

Response: [{ "id": number, "user_id": number, "username": "string", "content": "string", "date": "string", "like_count": number, "dislike_count": number }]
GET /tweets/
: Get tweet by ID

Response: { "id": number, "user_id": number, "username": "string", "content": "string", "date": "string", "like_count": number, "dislike_count": number }
POST /tweets: Post a new tweet

Request body: { "user_id": number, "content": "string" }
Response: { "id": number, "user_id": number, "username": "string", "content": "string", "date": "string", "like_count": number, "dislike_count": number }
POST /tweets/
/like: Like a tweet

Response: { "message": "Tweet liked" }
POST /tweets/
/dislike: Dislike a tweet

Response: { "message": "Tweet disliked" }
GET /users: Get all users

Response: [{ "id": number, "username": "string" }]
GET /users/
: Get user by ID

Response: { "id": number, "username": "string" }
Contributing
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

css
Copy code

This README provides a comprehensive overview of the project, including setup instructions, project structure, and API endpoint details. Adjust the project repository URL and other specific details as needed.

## Created with the help of ChatGPT