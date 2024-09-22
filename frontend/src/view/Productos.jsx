import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarInicio from '../components/NavbarInicio';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';

const Productos = () => {
  const { productos, addFavorito, removeFavorito, favoritos, user } = useAppContext();

  const handleAddToFavorites = (producto) => {
    if (favoritos.some(fav => fav.id === producto.id)) {
      removeFavorito(producto.id); // Elimina de favoritos si ya está añadido
    } else {
      addFavorito(producto); // Añade a favoritos si no está añadido
    }
  };

  return (
    <Container>
      <NavbarInicio /> {/* Asegúrate de que el Navbar se muestra */}
      <h1 className="text-center">Nuestros Productos</h1>
      <h3>Bienvenido</h3>
      <h3>{user.email}</h3>
      <Row>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <Col key={producto.id} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={producto.imagen} />
                <Card.Body>
                  <Card.Title>{producto.titulo}</Card.Title>
                  <Card.Text>{producto.descripcion}</Card.Text>
                  <Card.Text>Precio: ${producto.precio}</Card.Text>
                  <Card.Text>Stock: {producto.stock}</Card.Text>
                  <Button 
                    variant={favoritos.some(fav => fav.id === producto.id) ? 'danger' : 'primary'}
                    onClick={() => handleAddToFavorites(producto)}
                  >
                    {favoritos.some(fav => fav.id === producto.id) ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </Row>
    </Container>
  );
};

export default Productos;

