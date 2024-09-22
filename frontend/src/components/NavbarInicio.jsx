
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../img/logo.png';

function NavbarInicio() {
  return (
    <Navbar className="navbar-inicio" bg="white" variant="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top"
            style={{ height: '50px', maxWidth: '150px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mr-auto" defaultActiveKey="/inicio" as="ul">
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/inicio">Inicio</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/perfil">Mi Perfil</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/agregar" className="btn btn-primary mr-2">
              Agregar Productos
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

export default NavbarInicio;
