import React from "react";
import { Link } from "react-router-dom";

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

    <div className="row g-0 products-page-container">
      {/* Sección Hombre */}
      <div className="col-md-6 category-section bg-men">
        <div className="position-absolute top-0 start-0 p-3">
          <h2 className="badge bg-light text-dark fs-5">ROPA HOMBRE</h2>
        </div>
        <div className="text-center">
          <Link to="/hombre" className="btn btn-primary btn-lg">
            Comprar Ropa Hombre
          </Link>
        </div>
      </div>

      {/* Sección Mujer */}
      <div className="col-md-6 category-section bg-women">
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