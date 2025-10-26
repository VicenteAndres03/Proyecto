import React from "react";
import { Link } from "react-router-dom"; // Para los enlaces internos
import "./Footer.css"; // Importaremos los estilos específicos del Footer

function Footer() {
  return (
    <footer className="MenuFooter">
      <div className="FooterContainer">
        {/* Sección Contacto */}
        <div className="FooterSeccion">
          <h3>Contacto</h3>
          <p>📍 Antonio Varas</p>
          <p>📞 +56 9 1234 5678</p>
          <p>✉️ info@falaferia.cl</p>
        </div>

        {/* Sección Horarios */}
        <div className="FooterSeccion">
          <h3>Horarios de Atención</h3>
          <p>Lunes a Viernes: 9:00 - 18:00</p>
          <p>Sábados: 10:00 - 16:00</p>
          <p>Domingos: Cerrado</p>
        </div>

        {/* Sección Enlaces Rápidos */}
        <div className="FooterSeccion">
          <h3>Enlaces Rápidos</h3>
          {/* Usamos Link para la navegación interna */}
          <Link to="/productos">Productos</Link>
          <Link to="/nosotros">Sobre Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
          {/* Para enlaces externos o '#' usamos <a> */}
          <a href="#">Política de Privacidad</a>
        </div>

        {/* Sección Síguenos */}
        <div className="FooterSeccion">
          <h3>Síguenos</h3>
          <div className="RedesSociales">
            {/* Usamos <a> para redes sociales ya que suelen ser enlaces externos */}
            <a href="#" title="Facebook">
              📘
            </a>
            <a href="#" title="Instagram">
              📷
            </a>
            <a href="#" title="Twitter">
              🐦
            </a>
            <a href="#" title="WhatsApp">
              💬
            </a>
          </div>
        </div>
      </div>

      {/* Parte inferior del Footer */}
      <div className="FooterBottom">
        <p>&copy; 2025 FalaFeria. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
