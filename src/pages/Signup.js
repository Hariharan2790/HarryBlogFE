import React, { useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import "./Signup.css";
import { useSignupUserMutation } from '../services/appApi';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [signupUser, { isLoading, data, isError, error }] = useSignupUserMutation();

    function handleSignup(e) {
        e.preventDefault();
        signupUser({ name,email, password }).then(({error}) => {
            if(!error) {
                navigate('/')
            }
        })
    }
    if (data) {
        console.log(data);
    }
    return (
        <Container>
            <Row>
                <Col md={3}>
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-center">

                    <Form className="signupform" onSubmit={handleSignup}>
                        <h1>Create account</h1>
                        {isError && <p className="alert alert-danger text-center">{error.data}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} required/>
                        </Form.Group>
                      
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isLoading}>
                            Register
                        </Button>
                        <div className="py-4 text-center">
                            <p>
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={3}>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup