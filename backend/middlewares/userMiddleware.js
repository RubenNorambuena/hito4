import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config(); // Cargar variables de entorno

// Expresión regular para validar emails
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Middleware para validar la creación de usuario
export const validateUserCreation = (req, res, next) => {
    const { name, email, password, date_birth } = req.body;

    if (!name || !email || !password || !date_birth) {
        return res.status(400).json({ message: 'Todos los campos (nombre, email, contraseña y fecha de nacimiento) son obligatorios.' });
    }

    // Validaciones combinadas
    if (name.length < 2 || name.length > 50 || password.length < 6 || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Validaciones fallidas: Nombre (2-50 caracteres), email válido y contraseña (mínimo 6 caracteres).' });
    }

    // Validación de formato de fecha
    const birthDate = new Date(date_birth);
    if (isNaN(birthDate.getTime())) {
        return res.status(400).json({ message: 'Formato de fecha de nacimiento no válido.' });
    }

    next(); // Continuar si todo está correcto
};

// Middleware para validar login
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
    }

    if (!emailRegex.test(email) || password.length < 6) {
        return res.status(400).json({ message: 'Formato de email no válido y la contraseña debe tener al menos 6 caracteres.' });
    }

    next(); // Continuar si todo está correcto
};

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = verified; // Guardar los datos del usuario verificado en req.user
        next(); // Continuar al siguiente middleware o controlador
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return res.status(403).json({ message: 'Token no válido o expirado.' });
    }
};
