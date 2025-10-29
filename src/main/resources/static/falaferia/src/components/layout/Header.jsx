import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/Ropa/Logo.png";

function Header({ cartCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logoImg} alt="Logo FalaFeria" width="80" height="80" className="d-inline-block align-text-top me-2" />
          FalaFeria
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Sobre nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Ropa</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Link className="btn btn-outline-dark me-2" to="/login">Inicio Sesion</Link>
            <Link className="btn btn-primary me-3" to="/register">Registrarse</Link>
            <Link to="/carrito" className="btn btn-outline-primary position-relative">
              🛒
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
                <span className="visually-hidden">items in cart</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
