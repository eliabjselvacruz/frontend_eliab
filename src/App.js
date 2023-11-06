import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {

  const [userRol, setUserRol] = useState('');
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setRol={setUserRol} />} />
        <Route path="/home" element={<Home rol={userRol} />} />
        <Route path="/about" element={<About rol={userRol} />} />
        <Route path="/customer" element={<Customer rol={userRol} />} />
        <Route path="/teacher" element={<Teacher rol={userRol} />} />
        <Route path="/teacherList" element={<TeacherList rol={userRol} />} />
        <Route path="/descuento" element={<Descuento rol={userRol} />} />
        <Route path="/listaDescuento" element={<ListaDescuento rol={userRol} />} />
        <Route path="/galeria" element={<Galeria rol={userRol} />} />
        <Route path="/producto" element={<Producto rol={userRol} />} />
        <Route path="/listaproductos" element={<ListaProductos rol={userRol} />} />
        <Route path="/estadisticas" element={<Estadisticas rol={userRol} />} />
      </Routes>
    </Router>
  );
}

export default App;