import express from 'express';
import { controller } from '../controllers/userController.js';
import { validateUserCreation, validateLogin, verifyToken } from '../middlewares/userMiddleware.js';

const router = express.Router();

// Ruta principal - Página de inicio (opcional)
router.get('/', controller.home);

// Ruta para login de usuario
router.post('/login', validateLogin, controller.login);

// Ruta para crear usuarios
router.post('/create', controller.createUser); 

// Ruta protegida para crear un nuevo producto (requiere autenticación JWT)
router.post('/producto', verifyToken, controller.createProduct);

// Ruta para crear un nuevo usuario
router.post('/usuario', validateUserCreation, controller.createUser);

// Manejo de rutas no encontradas (404)
router.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores internos del servidor
router.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

router.post('/login', (req, res, next) => {
    console.log('Ruta de login alcanzada');
    next();
}, validateLogin, controller.login);

export default router;


