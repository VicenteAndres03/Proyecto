import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function HomePage() {

  const [productos, setProductos] = useState([]);


  useEffect(() => {
    console.log("Intentando conectar con el Backend...");
    
    fetch("http://localhost:8080/api/productos")
      .then(response => response.json())
      .then(data => {
        console.log("CONEXIÓN EXITOSA! Aquí están los datos reales:");
        console.log(data); 
        setProductos(data);
      })
      .catch(error => console.error("Error de conexión:", error));
  }, []);

  const heroStyle = {
    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/Ropa/Fondo.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      {/* --- Hero Section (Banner Principal) --- */}
      <section
        className="d-flex align-items-center justify-content-center text-white text-center"
        style={{ ...heroStyle, minHeight: "80vh" }}
      >
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
                  

                  <img 
                    src={producto.imagenUrl} 
                    className="card-img-top" 
                    alt={producto.nombre} 
                    style={{ height: "300px", objectFit: "contain" }} 

                    onError={(e) => { e.target.src = "https://placehold.co/300x300?text=Foto+Pendiente"; }}
                  />
                  
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text flex-grow-1">
                      {producto.descripcion}
                      <br />
                      <strong className="fs-5">${producto.precio}</strong>
                    </p>
                    
                    <Link to={`/${producto.categoria.nombre}`} className="btn btn-dark mt-auto">
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