import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import NavbarInicio from '../components/NavbarInicio';

const CrearProductoForm = () => {
  const { addProducto } = useAppContext();
  const [producto, setProducto] = useState({
    id: '',
    imagen: '',
    titulo: '',
    descripcion: '',
    precio: '',
    stock: ''
  });
  const [productoCreado, setProductoCreado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    if (productosGuardados.length > 0) {
      setProductoCreado(productosGuardados[productosGuardados.length - 1]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { titulo, descripcion, imagen, precio, stock } = producto;

    if (!titulo || !descripcion || !imagen || !precio || !stock) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (parseFloat(precio) <= 0 || parseInt(stock) < 0) {
      setError('El precio debe ser positivo y el stock no puede ser negativo');
      return;
    }

    const nuevoProducto = {
      ...producto,
      id: Date.now()
    };
    addProducto(nuevoProducto);

    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    productosGuardados.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    setProductoCreado(nuevoProducto);
    setError(null);

    setProducto({
      id: '',
      imagen: '',
      titulo: '',
      descripcion: '',
      precio: '',
      stock: ''
    });
  };

  return (
    <>
      <NavbarInicio />
      <Container className="d-flex flex-column align-items-center">
        <h2>Crear Nuevo Producto</h2>
        <Form onSubmit={handleSubmit} className="w-50">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formBasicTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título del producto"
              name="titulo"
              value={producto.titulo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción del producto"
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicImagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la imagen del producto"
              name="imagen"
              value={producto.imagen}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPrecio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio del producto"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
            />
          </Form.Group>

          <Form.Group controlId="formBasicStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el stock del producto"
              name="stock"
              value={producto.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Agregar Producto
          </Button>
        </Form>

        {productoCreado && (
          <Card className="mt-4" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={productoCreado.imagen} />
            <Card.Body>
              <Card.Title>{productoCreado.titulo}</Card.Title>
              <Card.Text>{productoCreado.descripcion}</Card.Text>
              <Card.Text>Precio: ${productoCreado.precio}</Card.Text>
              <Card.Text>Stock: {productoCreado.stock}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default CrearProductoForm;
