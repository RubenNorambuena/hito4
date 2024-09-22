import pool from "../db/dbConfig.js";  // Conexión a la base de datos

export const productModel = {
    // Obtener todos los productos
    getAllProducts: async () => {
        try {
            const query = 'SELECT * FROM products';
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw new Error('Error al obtener productos');
        }
    },

    // Obtener un producto por ID
    getProductById: async (id) => {
        try {
            const query = 'SELECT * FROM products WHERE id = $1';
            const result = await pool.query(query, [id]);
            if (result.rows.length === 0) {
                return null;  // Producto no encontrado
            }
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            throw new Error('Error al obtener producto por ID');
        }
    },

    // Añadir un nuevo producto
    addProduct: async (productData) => {
        const { titulo, imagen, descripcion, precio, stock } = productData;
        try {
            const query = 'INSERT INTO products (titulo, imagen, descripcion, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [titulo, imagen, descripcion, precio, stock];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al añadir producto:', error);
            throw new Error('Error al añadir producto');
        }
    },

    // Actualizar un producto existente
    updateProduct: async (id, productData) => {
        const { titulo, imagen, descripcion, precio, stock } = productData;
        try {
            const query = `
                UPDATE products 
                SET titulo = $1, imagen = $2, descripcion = $3, precio = $4, stock = $5
                WHERE id = $6
                RETURNING *`;
            const values = [titulo, imagen, descripcion, precio, stock, id];
            const result = await pool.query(query, values);
            if (result.rows.length === 0) {
                return null;  // Producto no encontrado
            }
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw new Error('Error al actualizar producto');
        }
    },

    // Eliminar un producto
    deleteProduct: async (id) => {
        try {
            const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
            const result = await pool.query(query, [id]);
            if (result.rows.length === 0) {
                return null;  // Producto no encontrado
            }
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw new Error('Error al eliminar producto');
        }
    }
};
