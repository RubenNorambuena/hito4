import express from 'express';
import { productController } from '../controllers/productController.js';
import { validateProductData, validateProductId } from '../middlewares/productMiddleware.js';  // Asegúrate de que la ruta sea correcta
import { verifyToken } from '../middlewares/userMiddleware.js';  // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/productos', productController.getProducts);

// Ruta para obtener un producto por su ID
router.get('/producto/:id', validateProductId, productController.getProductById);

// Ruta para crear un nuevo producto (requiere autenticación)
router.post('/producto', verifyToken, validateProductData, productController.createProduct);

// Ruta para actualizar un producto por su ID (requiere autenticación)
router.put('/producto/:id', verifyToken, validateProductId, validateProductData, productController.updateProduct);

// Ruta para eliminar un producto por su ID (requiere autenticación)
router.delete('/producto/:id', verifyToken, validateProductId, productController.deleteProduct);

export default router;
