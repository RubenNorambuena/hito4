import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config(); // Cargar variables de entorno

// Expresión regular para validar emails
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Una expresión regular más restrictiva

// Middleware para validar la creación de usuario
export const validateUserCreation = (req, res, next) => {
    const { name, email, password, date_birth } = req.body;

    // Verificación de campos vacíos
    if (!name || !email || !password || !date_birth) {
        return res.status(400).json({ message: 'Todos los campos (nombre, email, contraseña y fecha de nacimiento) son obligatorios.' });
    }

    // Validación de formato de email
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email no válido.' });
    }

    // Validación de longitud de la contraseña
    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    // Validación básica de formato de fecha (puedes personalizar esto según tus necesidades)
    const birthDate = new Date(date_birth);
    if (isNaN(birthDate.getTime())) {
        return res.status(400).json({ message: 'Formato de fecha de nacimiento no válido.' });
    }

    // Continuar si todo está correcto
    next();
};

// Middleware para validar login
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Verificación de campos vacíos
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
    }

    // Validación de formato de email
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email no válido.' });
    }

    // Continuar si todo está correcto
    next();
};

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    // Verificación de existencia del token
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Eliminar el prefijo 'Bearer ' si está presente
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        // Verificación del token JWT
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = verified;  // Guardar los datos del usuario verificado en req.user
        next();  // Continuar al siguiente middleware o controlador
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(403).json({ message: 'Token no válido o expirado.' });  // Código 403 para indicar que está prohibido
    }
};

