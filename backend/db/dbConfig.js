import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// Configuración del pool de conexión
const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432, // Asegura que sea un número entero
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456', // Evita poner contraseñas por defecto
    database: process.env.DB_DATABASE || 'database',
    allowExitOnIdle: true,
    idleTimeoutMillis: 30000, // Tiempo de espera en milisegundos antes de liberar la conexión
    connectionTimeoutMillis: 2000, // Tiempo máximo para intentar establecer la conexión
};

const pool = new Pool(config);

// Función para probar la conexión
const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()'); // Prueba simple de la conexión
        console.log('🚨🚨 Base de datos conectada 🚨🚨', res.rows[0]);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
    }
};

// Prueba la conexión al arrancar
testConnection();

export default pool;
