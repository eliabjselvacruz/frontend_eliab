import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Producto({ rol }) {

  // Crear un estado para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [porcentaje_alcohol, setPorcentaje_alcohol] = useState('');

  const [categorias, setcategorias] = useState([]);
  const [idcategoria, setidcategoria] = useState(''); 

  const [imagen, setImagen] = useState('');

  const handleImagenChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Obtener la imagen en formato base64
      setImagen(base64String); // Puedes visualizar la imagen en base64 en la consola para asegurarte de que la conversión se hizo correctamente
    }; 
    if (file) {
      reader.readAsDataURL(file); // Lee el contenido del archivo como base64
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      cantidad,
      precio,
      descripcion,
      porcentaje_alcohol,
      idcategoria,
      imagen
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setNombre('');
        setCantidad('');
        setPrecio('');
        setDescripcion('');
        setPorcentaje_alcohol('');
        setidcategoria('');
      } else {
        alert('Error al registrar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las especialidades
    fetch('http://localhost:5000/crud/readcategoria')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las especialidades obtenidas
        setcategorias(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías.', error);
      });
  }, []);

  return(
    <div>
      <Header rol={ rol }/>
      
      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Productos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del producto"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese la cantidad"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el precio"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="6">
                  <FloatingLabel controlId="porcentaje_alcohol" label="Porcentaje de alcohol">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el porcentaje de alcohol" 
                      value={porcentaje_alcohol}
                      onChange={(e) => setPorcentaje_alcohol(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="12">
                  <FloatingLabel controlId="descripcion" label="Descripción">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="categoria" label="categorias">
                    <Form.Select
                      aria-label="categorias"
                      value={idcategoria}
                      onChange={(e) => setidcategoria(e.target.value)}
                    >
                      <option>Seleccione la categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.idcategoria} value={categoria.idcategoria}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <Form.Group controlId="imagen" className="" >
                    <Form.Control 
                      type="file" 
                      accept=".jpg, .png, .jpeg"
                      size="lg"
                      onChange={handleImagenChange}
                    />
                  </Form.Group>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}

export default Producto;