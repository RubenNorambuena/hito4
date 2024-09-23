import { userModel } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { validationResult } from 'express-validator';

config(); // Cargar las variables de entorno

// Función para manejar errores
const handleErrors = (res, statusCode, message, error) => {
    console.error(message, error);
    return res.status(statusCode).json({ message });
};

// Controlador Home
const home = (req, res) => {
    res.send('Home page');
};

// Crear usuario con encriptación de contraseña
const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, date_birth } = req.body;

    try {
        const existingUser = await userModel.getUser(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.addUser({ name, email, password: hashedPassword, date_birth });

        res.status(201).json({ message: 'Usuario creado con éxito', user: result });
    } catch (error) {
        handleErrors(res, 500, 'Error interno del servidor al crear usuario', error);
    }
};

// Login con validación de contraseña y generación de JWT
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.getUser(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login exitoso',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        handleErrors(res, 500, 'Error interno del servidor durante el login', error);
    }
};

// Crear producto (implementar lógica)
const createProduct = async (req, res) => {
    // Implementar la lógica de creación de productos
};

// Ruta para manejar errores 404 (opcionalmente se puede eliminar, ya que ya tienes un middleware para 404 en las rutas)
const notFound = (req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
};

export const controller = {
    home,
    createUser,
    login,
    createProduct,
    notFound,
};
