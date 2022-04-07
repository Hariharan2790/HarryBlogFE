import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useLoginUserMutation } from "../services/appApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  function handleLogin(e) {
    e.preventDefault();
    loginUser({ email, password }).then(({ error }) => {
      if (!error) {
        navigate("/");
      }
    });
  }

  function userCredentials() {
    setEmail("admin@gmail.com");
    setPassword("admin123");
  }

  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Form className="loginform" onSubmit={handleLogin}>
            <h1>Login</h1>
            {isError && (
              <p className="alert alert-danger text-center">{error.data}</p>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              Login
            </Button>
            <div className="py-4 text-center">
              <p>
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </div>
            <Button variant="primary"  onClick={userCredentials}>
              User Credentials
            </Button>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}

export default Login;
