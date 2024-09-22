import React from 'react';
import NavbarInicio from '../components/NavbarInicio';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppContext, } from '../context/AppContext'; // Importa el contexto
// Favoritos.jsx


import { ProductoContext, } from '../context/ProductoContext';

const Favoritos = () => {
  const { favoritos, removeFavorito, user } = useAppContext(); // Obtén los favoritos y la función para eliminar

  return (
    <>
      <Container className="container-inicio d-flex flex-column justify-content-space-around">
        <Container className='container-navbar-inicio'>
          <NavbarInicio />
        </Container>

        <Container>
          <h1 className="text-center">Tus Favoritos</h1>
          <h3>Bienvenido</h3>
          <h3>{user.email}</h3>
          {favoritos.length > 0 ? (
            <Row>
              {favoritos.map((producto) => (
                <Col key={producto.id} xs={12} md={6} lg={4} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={producto.imagen} />
                    <Card.Body>
                      <Card.Title>{producto.titulo}</Card.Title>
                      <Card.Text>{producto.descripcion}</Card.Text>
                      <Button variant="danger" onClick={() => removeFavorito(producto.id)}>
                        Eliminar de Favoritos
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">No tienes productos en favoritos.</p>
          )}
        </Container>
      </Container>
    </>
  );
}

export default Favoritos;
