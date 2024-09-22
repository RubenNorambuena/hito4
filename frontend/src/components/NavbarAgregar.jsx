
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../img/logo.png';

function NavbarAgregar() {
  return (
    <Navbar className="navbar-agregar" bg="white" variant="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top"
            style={{ height: '50px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/inicio" className="btn btn-primary mr-2">
              Volver
            </Nav.Link>
            <Nav.Link as={Link} to="/home" className="btn btn-danger">
              Salir
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAgregar;
