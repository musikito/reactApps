import axios from "axios";
import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:3000/register', {
          username,
          password,
          email,
          fullName,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    );
  };

export default Register