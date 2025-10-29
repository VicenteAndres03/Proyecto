import React from "react";
import { Link } from "react-router-dom";
import poleronHombreImg from "../assets/Ropa/Poleron Hombre/Poleron1h.webp";
import poleronMujerImg from "../assets/Ropa/Poleron Mujer/Poleron1M.webp";
import poleraHombreImg from "../assets/Ropa/Polera Hombre/Polera1H.webp";
import poleraMujerImg from "../assets/Ropa/Polera Mujer/Polera1M.webp";
import fondoImg from "../assets/Ropa/Fondo.png";

function HomePage() {
  const heroStyle = {
    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fondoImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      {/* --- Hero Section --- */}
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

      {/* --- Featured Products Section --- */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Productos Destacados</h2>
          <div className="row g-4">
            {/* Product 1 */}
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center">
                <img src={poleronHombreImg} className="card-img-top" alt="Poleron Hombre" style={{ height: "300px", objectFit: "contain" }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Poleron Hombre</h5>
                  <p className="card-text flex-grow-1">Talla XL<br />$5.700</p>
                  <Link to="/hombre" className="btn btn-dark mt-auto">
                    Comprar
                  </Link>
                </div>
              </div>
            </div>
            {/* Product 2 */}
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center">
                <img src={poleronMujerImg} className="card-img-top" alt="Poleron Mujer" style={{ height: "300px", objectFit: "contain" }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Poleron Mujer</h5>
                  <p className="card-text flex-grow-1">Talla M<br />$5.300</p>
                  <Link to="/mujer" className="btn btn-dark mt-auto">
                    Comprar
                  </Link>
                </div>
              </div>
            </div>
            {/* Product 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center">
                <img src={poleraHombreImg} className="card-img-top" alt="Polera Hombre" style={{ height: "300px", objectFit: "contain" }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Polera Hombre</h5>
                  <p className="card-text flex-grow-1">Talla XL<br />$3.800</p>
                  <Link to="/hombre" className="btn btn-dark mt-auto">
                    Comprar
                  </Link>
                </div>
              </div>
            </div>
            {/* Product 4 */}
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center">
                <img src={poleraMujerImg} className="card-img-top" alt="Polera Mujer" style={{ height: "300px", objectFit: "contain" }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Polera Mujer</h5>
                  <p className="card-text flex-grow-1">Talla M<br />$3.800</p>
                  <Link to="/mujer" className="btn btn-dark mt-auto">
                    Comprar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;