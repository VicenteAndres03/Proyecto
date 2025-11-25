import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {

  const [indicadores, setIndicadores] = useState(null);

  useEffect(() => {
    fetch("https://mindicador.cl/api")
      .then((response) => response.json())
      .then((data) => {
        setIndicadores(data);
      })
      .catch((error) => console.error("Error cargando indicadores:", error));
  }, []);

  return (
    <footer className="bg-light text-center text-lg-start mt-auto border-top">
      <div className="container p-4">
        <div className="row">
          
 
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold">Contacto</h5>
            <ul className="list-unstyled mb-0">
              <li><p>📍 Antonio Varas</p></li>
              <li><p>📞 +56 9 1234 5678</p></li>
              <li><p>✉️ info@falaferia.cl</p></li>
            </ul>
          </div>


          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold">Horarios</h5>
            <ul className="list-unstyled">
              <li><p>Lunes a Viernes: 9:00 - 18:00</p></li>
              <li><p>Sábados: 10:00 - 16:00</p></li>
            </ul>
          </div>


          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold">Enlaces</h5>
            <ul className="list-unstyled">
              <li><Link to="/productos" className="text-dark text-decoration-none">Productos</Link></li>
              <li><Link to="/nosotros" className="text-dark text-decoration-none">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="text-dark text-decoration-none">Contacto</Link></li>
            </ul>
          </div>


          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold text-primary">Indicadores Hoy</h5>
            {indicadores ? (
              <div className="card bg-white shadow-sm p-2">
                <p className="mb-1">
                  🇺🇸 <strong>Dólar:</strong> ${indicadores.dolar.valor}
                </p>
                <p className="mb-1">
                  🇪🇺 <strong>Euro:</strong> ${indicadores.euro.valor}
                </p>
                <p className="mb-0">
                  📈 <strong>UF:</strong> ${indicadores.uf.valor}
                </p>
                <small className="text-muted" style={{fontSize: '10px'}}>Fuente: mindicador.cl</small>
              </div>
            ) : (
              <p className="text-muted">Cargando indicadores...</p>
            )}
          </div>

        </div>
      </div>

      <div className="text-center p-3 bg-dark text-white">
        &copy; {new Date().getFullYear()} FalaFeria. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;