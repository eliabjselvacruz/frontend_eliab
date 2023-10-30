import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Galeria() {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    async function fetchImagenes() {
      try {
        const response = await axios.get('http://localhost:5000/crud/getImagenes');
        setImagenes(response.data);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    }

    fetchImagenes();
  }, []);

  return (
    <div>
      <h1>Galería de Imágenes</h1>
      <div className="image-gallery">
        {imagenes.map((imagen) => (
          <div key={imagen.id} className="image-container">
            <img src={`http://localhost:5000/uploads/${imagen.nombre}`} alt={imagen.nombre} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeria;