import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

config(); // Cargar las variables de entorno

const app = express();

// Middleware
// Configuración de CORS


// Usa CORS con las opciones especificadas
app.use(cors());

app.use(express.json()); // Analizar el cuerpo de las solicitudes en formato JSON

// Rutas
app.use('/api/products', productRoutes); 
app.use('/api/user', userRoutes); 

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de e-commerce');
});

// Error 404 para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores internos
app.use((err, req, res) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚨🚨 Servidor corriendo en el puerto ${PORT} 🚨🚨`);
});

export default app;

