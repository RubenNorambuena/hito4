import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'e-commers',
    allowExitOnIdle: true,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('🚨🚨 Base de datos conectada 🚨🚨', res.rows[0]);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.stack);
    }
};

testConnection();

export default pool;
