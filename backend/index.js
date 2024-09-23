import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan'; // Importar morgan
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

config(); // Cargar las variables de entorno

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Agregar morgan como middleware para el registro de solicitudes

// Rutas
app.use('/api/user', userRoutes); 
app.use('/api/products', productRoutes); 


// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de e-commerce');
});

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores internos del servidor
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Configuración del puerto y levantamiento del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚨🚨 Servidor corriendo en el puerto ${PORT} 🚨🚨`);
});

export default app;


