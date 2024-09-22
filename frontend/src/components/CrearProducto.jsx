
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Container } from 'react-bootstrap';

// Componente para la tarjeta de producto
const ProductoCard = ({ producto }) => (
  <Col md={4} className="mb-3">
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={producto.imagen} alt={producto.titulo} />
      <Card.Body>
        <Card.Title>{producto.titulo}</Card.Title>
        <Card.Text>
          {producto.descripcion}
        </Card.Text>
        <Card.Text>
          Precio: ${producto.precio}
        </Card.Text>
        <Card.Text>
          Stock: {producto.stock}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

// Definición de PropTypes para ProductoCard
ProductoCard.propTypes = {
  producto: PropTypes.shape({
    imagen: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

const CrearProducto = ({ productos }) => {
  return (
    <Container className="d-flex flex-column align-items-center">
      <Row>
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </Row>
    </Container>
  );
};

// Definición de PropTypes para CrearProducto
CrearProducto.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      imagen: PropTypes.string.isRequired,
      titulo: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CrearProducto;
