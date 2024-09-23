import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './view/Home';
import Login from './view/Login';
import Agregar from './view/Agregar';
import Inicio from './view/Inicio';
import Favoritos from './view/Favoritos';
import Perfil from './view/Perfil';
import Productos from './view/Productos';
import { AppProvider } from './context/AppContext';


const App = () => {
  return (
    <>
     <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/agregar" element={<Agregar/>} />
        <Route path="/productos" element={<Productos/>} />
        <Route path="/favoritos" element={<Favoritos/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="*" element={<Home />} />
      </Routes>
     </AppProvider>
    </>
    
  );
};

export default App;

