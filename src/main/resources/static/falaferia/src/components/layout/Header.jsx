import React, { useState } from "react";
import { Link } from "react-router-dom"; // Para los enlaces de navegación
import "./Header.css"; // Importaremos los estilos CSS
import logoImg from "../../assets/Ropa/Logo.png"; // Importa la imagen del logo

function Header() {
  // Estado para controlar la visibilidad del menú hamburguesa en móviles
  const [menuVisible, setMenuVisible] = useState(false);

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header className="Menu">
      <div className="ContenidoMenu">
        <div className="LogoTienda">
          {/* Usamos Link para que el logo también lleve al inicio */}
          <Link to="/">
            <img src={logoImg} alt="Logo FalaFeria" className="Logo" />
          </Link>
          <p className="NombreTienda">FalaFeria</p>
        </div>

        {/* Botón Carrito (la lógica del contador vendrá después) */}
        <div className="Carrito">
          <button id="Carrito">
            🛒<span id="CantidadCarrito">0</span>
          </button>
        </div>

        {/* Botón Hamburguesa (solo visible en móvil gracias a CSS) */}
        <button
          className="MenuHamburguesa"
          id="MenuHamburguesa"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Navegación */}
        {/* Clase 'show' se añade condicionalmente basada en el estado 'menuVisible' */}
        <nav
          className={`MenuNavegacion ${menuVisible ? "show" : ""}`}
          id="MenuNavegacion"
        >
          <Link className="Links" to="/" onClick={() => setMenuVisible(false)}>
            Inicio
          </Link>
          <Link
            className="Links"
            to="/contacto"
            onClick={() => setMenuVisible(false)}
          >
            Contacto
          </Link>
          <Link
            className="Links"
            to="/nosotros"
            onClick={() => setMenuVisible(false)}
          >
            Sobre nosotros
          </Link>
          <Link
            className="Links"
            to="/productos"
            onClick={() => setMenuVisible(false)}
          >
            Ropa
          </Link>
          <Link
            className="Links"
            to="/login"
            onClick={() => setMenuVisible(false)}
          >
            Inicio Sesion
          </Link>{" "}
          {/* Asegúrate que esta es la ruta correcta */}
          <Link
            className="Links"
            to="/registro"
            onClick={() => setMenuVisible(false)}
          >
            Registrarse
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
