// ProductoContext.jsx
import React, { createContext, useState } from 'react';

// Crear el Context
const ProductoContext = createContext();

// Crear el Provider
const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  // Función para agregar un producto
  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };

  return (
    <ProductoContext.Provider value={{ productos, agregarProducto }}>
      {children}
    </ProductoContext.Provider>
  );
};

export { ProductoContext, ProductoProvider };
