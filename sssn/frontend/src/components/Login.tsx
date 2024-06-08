import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

// Interface for the Login Props
interface LoginProps {
    // To check if user is logged in
    setAuth: (auth: boolean) => void;
}

const Login = ({ setAuth }: LoginProps) => {
    // State
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", {
                username,
                password,
            });
            setAuth(true);
            navigate("/home");
            console.log(response.data);
        } catch (error) {
            alert("Invalid username or password");
            console.error(error);
        }
    }; // End of handleSubmit function
    return (
        <Form onSubmit={handleSubmit}>
            {/* Username group*/}
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            {/* Password group */}
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            {/* Submit button  */}
            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
    );
};

export default Login;
