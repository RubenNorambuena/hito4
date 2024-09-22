
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../img/logo.png';

const CustomNavbar = () => {
  return (
    <Navbar bg="white" variant="light" expand="lg">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top"
            style={{ height: '50px' }}
          />
        </Navbar.Brand>
        <Link to="/login" className="btn btn-primary">
          Inicio de sesión
        </Link>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

