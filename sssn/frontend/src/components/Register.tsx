import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

// Interface for the Register Props
interface RegisterProps {
  // To check if user is logged in
  setAuth: (auth: boolean) => void;
}

const Register = ({ setAuth }: RegisterProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
  const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:3000/register', {
          username,
          password,
          email,
          fullName,
        });
      setAuth(true);
      navigate("/home");
        console.log(response.data);
      } catch (error) {
      alert("Registration failed");
        console.error(error);
      }
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        {/** Username group*/}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      {/** Password group */}
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      {/** Email group */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      {/** Full Name group */}
      <Form.Group className="mb-3" controlId="fullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </Form.Group>
      {/** Submit button  */}
      <Button variant="primary" type="submit">
        Register
      </Button>
      </Form>
    );
  };

export default Register;