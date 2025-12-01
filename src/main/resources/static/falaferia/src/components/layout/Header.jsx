import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ cartCount }) {
  const navigate = useNavigate();
  
  // Estado para saber si hay usuario logueado
  const [usuario, setUsuario] = useState(null);

  // Al cargar el Header, revisamos si hay datos en la memoria
  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
    const nombreGuardado = localStorage.getItem("nombre");
    
    // Si hay token, asumimos que está logueado
    if (token) {
      setUsuario({ rol: rol, nombre: nombreGuardado});
    }
  }, []);

  // Función para Cerrar Sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setUsuario(null);
    navigate("/login");
    window.location.reload(); // Recargamos para limpiar todo
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/Ropa/Logo.png" alt="Logo" width="50" height="50" className="me-2" />
          <span className="fw-bold">FalaFeria</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Ropa</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            
            {/* Mostrar enlace al Panel Admin SOLO si es ADMIN */}
            {usuario && usuario.rol === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link text-danger fw-bold" to="/admin/inventario">⚙️ Panel Admin</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/carrito" className="btn btn-outline-primary position-relative border-0">
              🛒
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* LÓGICA DEL USUARIO */}
            {usuario ? (
              // SI ESTÁ LOGUEADO: Mostramos Saludo y Logout
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
                  {/* Ícono según rol (Requisito) */}
                  <span>{usuario.rol === "ADMIN" ? "👮‍♂️" : "👤"}</span>
                  <span className="fw-bold small">{usuario.nombre || "Usuario"}</span>
                  <span style={{fontSize: '10px'}} className="text-muted">{usuario.rol === "ADMIN" ? "Administrador" : "Cliente"}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
                </ul>
              </div>
            ) : (
              // SI NO ESTÁ LOGUEADO: Botones de siempre
              <>
                <Link className="btn btn-outline-dark btn-sm" to="/login">Iniciar Sesión</Link>
                <Link className="btn btn-dark btn-sm" to="/register">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;