import  { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Login from "./components/Login";
import Register from "./components/Register";
import { Router } from 'react-router-dom';

// Post interface
interface Post {
  id: number;
  username: string;
  content: string;
  date: string;
}


const App = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State of the POSTS
  const [authenticated, setAuthenticated] = useState<boolean>(false); // State of the AUTHENTICATED

  // Add Post function
  const addPost = (username: string, content: string) => {
    const newPost: Post = {
      id: posts.length + 1,
      username,
      content,
      date: new Date().toLocaleString(),
    }; // End of newPost function
    setPosts([...posts, newPost]); // Add new post to the posts state
  }; // End of addPost function


  return (
    <Router>
    <Container>
      <Row>
        <Col>
          <h1>Welcome to the React + Node.js Super Simple Social Media App</h1>
          <p>
            This is a simple social media app built using React and Node.js.
          </p>
          <p>
            It is a single-page app (SPA) that uses React Router to navigate
            between different pages.
          </p>
          <p>
            The backend API is built using Express.js and MYSQL.
          </p>
          <p>
            The frontend is built using React and Bootstrap.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Login />
        </Col>
      </Row>
      <Row>
        <Col>
          <Register />
        </Col>
      </Row>
      <Row>
        <Col>
          <PostForm addPost={addPost} />
        </Col>
      </Row>
      <Row>
        <Col>
          <PostList posts={posts} />
        </Col>
      </Row>
    </Container>
    </Router>
  );
};

export default App;
