import pool from '../db/dbConfig.js';

export const userModel = {
    // Añadir un nuevo usuario
    addUser: async ({ name, email, password, date_birth }) => {
        const sql = `
            INSERT INTO users (name, email, password, date_birth)
            VALUES ($1, $2, $3, $4) 
            RETURNING id, name, email, date_birth
        `;
        const values = [name, email, password, date_birth];

        try {
            const { rows } = await pool.query(sql, values);
            return rows[0]; // Devolver el usuario creado sin exponer la contraseña
        } catch (error) {
            if (error.code === '23505') { // Código de error para violación de restricción única (email duplicado)
                throw new Error('El email ya está en uso');
            }
            console.error('Error al añadir usuario:', error);
            throw new Error('Error interno del servidor');
        }
    },
    
    // Obtener un usuario por email
    getUser: async (email) => {
        const sql = 'SELECT id, name, email, password, date_birth FROM users WHERE email = $1';
        
        try {
            const { rows } = await pool.query(sql, [email]);
            return rows.length ? rows[0] : null; // Devolver null si no se encuentra el usuario
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw new Error('Error interno del servidor');
        }
    }
};
