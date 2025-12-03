import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    console.log("Intentando conectar con el Backend...");
    
    fetch("http://localhost:8080/api/productos")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error("Respuesta inválida del servidor:", data);
          setProductos([]);
        }
      })
      .catch(error => console.error("Error de conexión:", error));
  }, []);

  return (
    <>
      {/* --- Hero Section (Clase CSS en lugar de style inline) --- */}
      <section className="hero-section">
        <div className="container">
          <h1 className="display-3 fw-bold">Lleva tu ropa Favorita en FalaFeria</h1>
          <p className="lead">Tu ropa Favorita en Descuento</p>
          <Link to="/productos" className="btn btn-light btn-lg fw-bold">
            Compra YA!
          </Link>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Productos Destacados</h2>
          <div className="row g-4">
            
            {productos.map((producto) => (
              <div className="col-lg-3 col-md-6" key={producto.id}>
                <div className="card h-100 text-center">
                  
                  {/* --- Imagen con clase CSS --- */}
                  <img 
                    src={producto.imagenUrl} 
                    className="card-img-top card-img-custom" 
                    alt={producto.nombre} 
                    onError={(e) => { e.target.src = "https://placehold.co/300x300?text=Foto+Pendiente"; }}
                  />
                  
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text flex-grow-1">
                      {producto.descripcion}
                      <br />
                      <strong className="fs-5">${producto.precio}</strong>
                    </p>
                    
                    <Link to={`/${producto.categoria ? producto.categoria.nombre : 'productos'}`} 
                      className="btn btn-dark mt-auto">
                      Comprar
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {productos.length === 0 && (
              <div className="col-12 text-center">
                <p className="alert alert-info">Cargando productos desde el servidor...</p>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;