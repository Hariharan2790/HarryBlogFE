import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavDropdown, Navbar, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from "../services/appApi";
import './Navigation.css';



function Navigation() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  function handleLogout() {

    logoutUser().then(({ error }) => {
      if (!error) {
        navigate('/');
        console.log('logged out successfully');
      }
      alert('logged out successfully');
    })
  }
  return (
    <Navbar expand="lg" className="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Blogz</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link className="mx-1 my-1">Home</Nav.Link>
            </LinkContainer>
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link className="btn btn-primary text-white mx-1 my-1" >Login</Nav.Link>
              </LinkContainer>
            )}
            {!user && (
              <LinkContainer to='/signup'>
                <Nav.Link className="btn btn-primary text-white mx-1 my-1">Register</Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <LinkContainer to='/new-article'>
                <Nav.Link className="btn btn-primary text-white mx-1 my-1">Create Post</Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <LinkContainer to="/new-article">
                  <NavDropdown.Item>Create</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/articles/me">
                  <NavDropdown.Item>My Article</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation