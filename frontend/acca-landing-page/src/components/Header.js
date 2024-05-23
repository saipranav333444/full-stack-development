import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">IndigoLearn</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-nav">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav className="navbar-right">
          <Button className="login-button" href="#login">
            Login/Signup
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
