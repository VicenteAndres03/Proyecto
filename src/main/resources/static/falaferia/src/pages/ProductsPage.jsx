import React from "react";
import { Link } from "react-router-dom";
import "./ProductsPage.css"; // Importaremos los estilos

// Importa las imágenes de fondo si decides manejarlas desde JS
// import imgIzquierda from '../assets/Ropa/Izquierda.png';
// import imgDerecha from '../assets/Ropa/Derecha.png';

function ProductsPage() {
  // Nota: La lógica de JS original para parallax y animación de botones
  // necesitaría reimplementarse usando hooks de React (useEffect, useState)
  // si deseas mantenerla. Por ahora, nos enfocamos en la estructura y estilos.

  return (
    // Quitamos ContenedorPrincipal porque el main ya existe en App.jsx
    <section className="SeccionHeroProducts">
      {" "}
      {/* Renombramos clase */}
      <div className="ContenidoHeroProducts">
        {" "}
        {/* Renombramos clase */}
        {/* Lado Izquierdo - Hombre */}
        <div className="LadoIzquierdoProducts">
          {" "}
          {/* Renombramos clase */}
          <div className="EtiquetaRopaProducts">ROPA HOMBRE</div>
          {/* La imagen de fondo se manejará principalmente con CSS */}
          {/* <div className="ImagenHombreProducts"></div> */}
          <div className="BotonSeccionProducts">
            {/* Usamos Link en lugar de <a> */}
            <Link
              to="/hombre"
              className="BotonCompraGeneroProducts hombre"
              id="BotonHombre"
            >
              Comprar Ropa Hombre
            </Link>
          </div>
        </div>
        {/* Lado Derecho - Mujer */}
        <div className="LadoDerechoProducts">
          {" "}
          {/* Renombramos clase */}
          <div className="EtiquetaRopaProducts">ROPA MUJER</div>
          {/* La imagen de fondo se manejará principalmente con CSS */}
          {/* <div className="ImagenMujerProducts"></div> */}
          <div className="BotonSeccionProducts">
            {/* Usamos Link en lugar de <a> */}
            <Link
              to="/mujer"
              className="BotonCompraGeneroProducts mujer"
              id="BotonMujer"
            >
              Comprar Ropa Mujer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
