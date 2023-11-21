import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Customer from './pages/Customer';
import Teacher from './pages/Teacher';
import TeacherList from './pages/TeacherList';
import Descuento from './pages/Descuento';
import ListaDescuento from './pages/ListaDescuento';
import Galeria from './pages/Galeria';
import Login from './pages/Login';
import Producto from './pages/Producto';
import ListaProductos from './pages/ListProductos';
import Estadisticas from './pages/Estadisticas';
import Venta from './pages/Venta';
import SinAcceso from './pages/SinAcceso';

function App() {

  const storedRol = localStorage.getItem('userRol');

  //const [userRol, setUserRol] = useState('');
  const [userRol, setUserRol] = useState(storedRol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setRol={setUserRol} />} />
        <Route path="/home" element={userRol ? <Home rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/about" element={userRol ? <About rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/customer" element={userRol ? <Customer rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/teacher" element={userRol ? <Teacher rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/teacherList" element={userRol ? <TeacherList rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/descuento" element={userRol ? <Descuento rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/listaDescuento" element={userRol ? <ListaDescuento rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/galeria" element={userRol ? <Galeria rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/producto" element={userRol ? <Producto rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/listaproductos" element={userRol ? <ListaProductos rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/estadisticas" element={userRol ? <Estadisticas rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/venta" element={userRol ? <Venta rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/sinacceso" element={<SinAcceso />} />
      </Routes>
    </Router>
  );
}

export default App;