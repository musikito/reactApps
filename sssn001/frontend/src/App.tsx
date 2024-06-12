/**
 * The main React component for the Twitter Clone application.
 * It handles authentication, tweet management, and navigation between different views.
 */
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
} from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import Auth from "./components/Auth";
import TweetForm from "./components/TweetForm";
import TweetList from "./components/TweetList";
import UserTweets from "./components/UserTweets";
import AllTweets from "./components/AllTweets";
import AllUsers from "./components/AllUsers";
import axios from "axios";

interface Tweet {
    id: number;
    user_id: number;
    username: string;
    content: string;
    date: string;
    like_count: number;
    dislike_count: number;
}

const App: React.FC = () => {
    const [auth, setAuth] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [username, setUsername] = useState<string>("");
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");

        if (auth && userId && username) {
            setAuth(true);
            setUserId(parseInt(userId));
            setUsername(username);
        }

        const fetchTweets = async () => {
            try {
                const response = await axios.get("http://localhost:3000/tweets");
                setTweets(response.data);
            } catch (error) {
                console.error("Error fetching tweets:", error);
            }
        };

        fetchTweets();
    }, []);

    const handleLogin = (user) => {
        setAuth(true);
        setUserId(user.id);
        setUsername(user.username);
        localStorage.setItem("auth", "true");
        localStorage.setItem("userId", user.id.toString());
        localStorage.setItem("username", user.username);
    };

    const handleLogout = () => {
        setAuth(false);
        setUserId(null);
        setUsername("");
        localStorage.removeItem("auth");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
    };

    const addTweet = (
        userId: number,
        username: string,
        content: string,
        date: string
    ) => {
        const newTweet = {
            id: Date.now(),
            user_id: userId,
            username,
            content,
            date,
            like_count: 0,
            dislike_count: 0,
        };
        setTweets([newTweet, ...tweets]);
    };

    const updateTweet = (updatedTweet: Tweet) => {
        setTweets(
            tweets.map((tweet) =>
                tweet.id === updatedTweet.id ? updatedTweet : tweet
            )
        );
    };

    return (
        <Router>
            <Container>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand className="text-center my-4" href="/tweets">
                        Twitter Clone
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {auth && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <h1>TODO</h1>
                <p>Create a profile for the uuser</p>
                <p>Use relative URLs for the endpoins, instead of http://localhost:3000</p>
                <p>Better error handling</p>
                <p>Add a delete button to the tweet form</p>
                <p>Fix the hadleLike function </p>
                <p>State management library like Redux?</p>
                <p>Better README</p>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Link to="/tweets">
                            <h1 className="text-center my-4">Twitter Clone</h1>
                        </Link>
                        <Routes>
                            <Route path="/auth" element={<Auth setAuth={handleLogin} />} />
                            <Route
                                path="/tweets"
                                element={
                                    auth ? (
                                        <>
                                            <TweetForm
                                                addTweet={addTweet}
                                                userId={userId as number}
                                                username={username}
                                            />
                                            <TweetList tweets={tweets} updateTweet={updateTweet} />
                                        </>
                                    ) : (
                                        <Navigate to="/auth" />
                                    )
                                }
                            />
                            <Route path="/all-tweets" element={<AllTweets />} />
                            <Route path="/all-users" element={<AllUsers />} />
                            <Route path="/user/:userId" element={<UserTweets />} />
                            <Route path="*" element={<Navigate to="/auth" />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
};

export default App;
