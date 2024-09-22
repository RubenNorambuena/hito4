import request from 'supertest';
import app from '../index';

describe('Product Routes', () => {
  // Prueba para obtener todos los productos
  it('should return all products', async () => {
    const res = await request(app).get('/productos');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Prueba para obtener un producto por ID
  it('should return a product by ID', async () => {
    const productId = 1; // Cambia esto a un ID válido en tu base de datos
    const res = await request(app).get(`/producto/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', productId);
  });

  // Prueba para crear un nuevo producto
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/agregar-producto')
      .send({
        titulo: 'New Product',
        imagen: 'url',
        descripcion: 'Description',
        precio: 100,
        stock: 10
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('product');
  });

  // Prueba para actualizar un producto existente
  it('should update an existing product', async () => {
    const productId = 1; // Cambia esto a un ID válido en tu base de datos
    const res = await request(app)
      .put(`/actualizar-producto/${productId}`)
      .send({
        titulo: 'Updated Product',
        imagen: 'new_url',
        descripcion: 'New Description',
        precio: 150,
        stock: 5
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('product');
  });

  // Prueba para eliminar un producto
  it('should delete a product', async () => {
    const productId = 1; // Cambia esto a un ID válido en tu base de datos
    const res = await request(app).delete(`/eliminar-producto/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Producto eliminado');
  });

  // Prueba para obtener productos cuando no hay productos
  it('should return an empty array if no products are found', async () => {
    // Asegúrate de que la base de datos esté vacía o simula un estado vacío
    const res = await request(app).get('/productos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]); // Espera un array vacío
  });

  // Prueba para obtener un producto con un ID no válido
  it('should return 404 if product is not found', async () => {
    const invalidProductId = 99999; // Cambia esto a un ID no válido
    const res = await request(app).get(`/producto/${invalidProductId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Producto no encontrado');
  });
});
