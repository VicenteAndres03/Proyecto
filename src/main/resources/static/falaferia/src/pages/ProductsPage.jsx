import React from "react";
import { Link } from "react-router-dom";
import imgIzquierda from '../assets/Ropa/Izquierda.png';
import imgDerecha from '../assets/Ropa/Derecha.png';

function ProductsPage() {
  const sectionStyle = {
    height: "calc(100vh - 56px)", // Adjust based on header height
    overflow: "hidden",
  };

  const createSideStyle = (image) => ({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "transform 0.3s ease",
  });

  return (
    <div className="row g-0" style={sectionStyle}>
      {/* Men's Section */}
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white position-relative"
        style={createSideStyle(imgIzquierda)}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <div className="position-absolute top-0 start-0 p-3">
          <h2 className="badge bg-light text-dark fs-5">ROPA HOMBRE</h2>
        </div>
        <div className="text-center">
          <Link to="/hombre" className="btn btn-primary btn-lg">
            Comprar Ropa Hombre
          </Link>
        </div>
      </div>

      {/* Women's Section */}
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white position-relative"
        style={createSideStyle(imgDerecha)}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <div className="position-absolute top-0 start-0 p-3">
          <h2 className="badge bg-light text-dark fs-5">ROPA MUJER</h2>
        </div>
        <div className="text-center">
          <Link to="/mujer" className="btn btn-danger btn-lg">
            Comprar Ropa Mujer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;