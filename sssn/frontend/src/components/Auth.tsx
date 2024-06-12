import { useState } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

interface AuthProps {
  setAuth: (user) => void;
}

const Auth = ({ setAuth }: AuthProps) => {
  const [key, setKey] = useState<string>("login");
  const navigate = useNavigate();

  const handleAuth = (user) => {
    setAuth(user);
    navigate("/tweets/home");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Tabs
            id="auth-tabs"
            activeKey={key}
            onSelect={(k: string | null) => k && setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="login" title="Login">
              <Login setAuth={handleAuth} />
            </Tab>
            <Tab eventKey="register" title="Register">
              <Register setAuth={handleAuth} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
