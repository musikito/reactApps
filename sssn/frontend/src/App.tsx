import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import TweetList from './components/TweetList';
import TweetForm from './components/TweetForm';
import Login from './components/Login';
import Register from './components/Register';
import AllTweets from './components/AllTweets';
import AllUsers from './components/AllUsers';

interface Tweet {
  id: number;
  username: string;
  content: string;
  date: string;
  like_count: number;
  dislike_count: number;
}

const App: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [auth, setAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string>('');

  const addTweet = (userId: number, username: string, content: string, date: string) => {
    const newTweet = {
      id: tweets.length + 1,
      username,
      content,
      date,
      like_count: 0,
      dislike_count: 0,
    };
    setTweets([newTweet, ...tweets]);
  };

  const updateTweet = (updatedTweet: Tweet) => {
    setTweets(tweets.map((tweet) => (tweet.id === updatedTweet.id ? updatedTweet : tweet)));
  };

  const handleLogin = (user: any) => {
    setAuth(true);
    setUserId(user.id);
    setUsername(user.username);
  };

  return (
    <Router>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center my-4">Twitter Clone</h1>
            <Routes>
              <Route path="/login" element={<Login setAuth={handleLogin} />} />
              <Route path="/register" element={<Register setAuth={handleLogin} />} />
              <Route
                path="/tweets"
                element={
                  auth ? (
                    <>
                      <TweetForm addTweet={addTweet} userId={userId as number} username={username} />
                      <TweetList tweets={tweets} updateTweet={updateTweet} />
                    </>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/all-tweets" element={<AllTweets />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
