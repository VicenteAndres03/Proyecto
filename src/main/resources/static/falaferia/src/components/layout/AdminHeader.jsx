import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/Ropa/Logo.png";

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para limpiar el estado de autenticación si es necesario
    // Por ejemplo, limpiar localStorage, cookies, o un estado de Redux/Context
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/admin">
          <img
            src={logoImg}
            alt="Logo FalaFeria"
            width="80"
            height="80"
            className="d-inline-block align-text-top me-2"
          />
          Panel de Administración
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbarNav"
          aria-controls="adminNavbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/clientes">
                Gestión de Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/inventario">
                Gestión de Inventario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/pedidos">
                Gestión de Pedidos
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
