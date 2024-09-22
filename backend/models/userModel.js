import pool from '../db/dbConfig.js';

export const userModel = {
    // Añadir un nuevo usuario
    addUser: async (userData) => {
        const { name, email, password, date_birth } = userData;
        const sql = 'INSERT INTO users (name, email, password, date_birth) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, email, password, date_birth];
        
        try {
            const result = await pool.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al añadir usuario:', error);
            throw new Error('Error al añadir usuario');
        }
    },
    
    // Obtener un usuario por email
    getUser: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = $1';
        
        try {
            const result = await pool.query(sql, [email]);
            if (result.rows.length === 0) {
                return null;
            }
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw new Error('Error al obtener usuario');
        }
    },

    // Añadir un producto
    addProduct: async (productData) => {
        const { titulo, imagen, descripcion, precio, stock } = productData;
        const sql = 'INSERT INTO products (titulo, imagen, descripcion, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [titulo, imagen, descripcion, precio, stock];
        
        try {
            const result = await pool.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al añadir producto:', error);
            throw new Error('Error al añadir producto');
        }
    }
};

