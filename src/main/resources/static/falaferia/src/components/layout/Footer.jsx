import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contacto</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p>📍 Antonio Varas</p>
              </li>
              <li>
                <p>📞 +56 9 1234 5678</p>
              </li>
              <li>
                <p>✉️ info@falaferia.cl</p>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Horarios de Atención</h5>
            <ul className="list-unstyled">
              <li>
                <p>Lunes a Viernes: 9:00 - 18:00</p>
              </li>
              <li>
                <p>Sábados: 10:00 - 16:00</p>
              </li>
              <li>
                <p>Domingos: Cerrado</p>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/productos" className="text-dark">Productos</Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-dark">Sobre Nosotros</Link>
              </li>
              <li>
                <Link to="/contacto" className="text-dark">Contacto</Link>
              </li>
              <li>
                <a href="#!" className="text-dark">Política de Privacidad</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Síguenos</h5>
            <div>
              <a href="#!" className="btn btn-outline-dark btn-floating m-1" role="button">
                📘
              </a>
              <a href="#!" className="btn btn-outline-dark btn-floating m-1" role="button">
                📷
              </a>
              <a href="#!" className="btn btn-outline-dark btn-floating m-1" role="button">
                🐦
              </a>
              <a href="#!" className="btn btn-outline-dark btn-floating m-1" role="button">
                💬
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; 2025 FalaFeria. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
