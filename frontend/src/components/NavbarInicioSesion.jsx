
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../img/logo.png';

function NavbarInicioSesion() {
  return (
    <Navbar className="navbar-inicio-sesion" bg="white" variant="light">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top"
            style={{ height: '50px' }}
          />
        </Navbar.Brand>
        <Link to="/" className="btn btn-primary">
          Registrarme
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavbarInicioSesion;
