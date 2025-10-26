import React from "react";
import { Link } from "react-router-dom"; // Para los enlaces de navegación
import "./HomePage.css"; // Importaremos los estilos CSS específicos de esta página

// Importa las imágenes que usarás desde la carpeta assets
// Ajusta las rutas si tu estructura es diferente
import poleronHombreImg from "../assets/Ropa/Poleron Hombre/Poleron1h.webp";
import poleronMujerImg from "../assets/Ropa/Poleron Mujer/Poleron1M.webp";
import poleraHombreImg from "../assets/Ropa/Polera Hombre/Polera1H.webp";
import poleraMujerImg from "../assets/Ropa/Polera Mujer/Polera1M.webp";
// Nota: Fondo.png se usará en el CSS

function HomePage() {
  return (
    // Usamos React.Fragment (<></>) para no añadir un div extra innecesario al DOM
    <>
      {/* --- Sección 1: Hero --- */}
      {/* El fondo se aplicará con CSS a la clase Contenido1HomePage */}
      <section className="Contenido1HomePage">
        <h1 className="Titulo1HomePage">Lleva tu ropa Favorita en FalaFeria</h1>
        <p className="Descripcion1HomePage">Tu ropa Favorita en Descuento</p>
        {/* Usamos Link de React Router */}
        <Link to="/productos" className="primerBotonHomePage">
          Compra YA!
        </Link>
      </section>

      {/* --- Sección 2: Muestra Ropa --- */}
      <section className="MuestraRopaHomePage">
        <h1 className="Titulo2HomePage">Productos Destacados</h1>
        <div className="ProductosContainerHomePage">
          {" "}
          {/* Contenedor para los productos */}
          {/* Producto 1 */}
          <div className="ProductoItemHomePage">
            <img src={poleronHombreImg} alt="Poleron Hombre" />
            <p>
              Poleron Hombre talla XL <br /> $5700
            </p>
            <Link to="/hombre" className="BotonComprarHomePage">
              Comprar
            </Link>
          </div>
          {/* Producto 2 */}
          <div className="ProductoItemHomePage">
            <img src={poleronMujerImg} alt="Poleron Mujer" />
            <p>
              Poleron Mujer talla M <br /> $5300
            </p>
            <Link to="/mujer" className="BotonComprarHomePage">
              Comprar
            </Link>
          </div>
          {/* Producto 3 */}
          <div className="ProductoItemHomePage">
            <img src={poleraHombreImg} alt="Polera Hombre" />
            <p>
              Polera Hombre talla XL <br /> $3800
            </p>
            <Link to="/hombre" className="BotonComprarHomePage">
              Comprar
            </Link>
          </div>
          {/* Producto 4 */}
          <div className="ProductoItemHomePage">
            <img src={poleraMujerImg} alt="Polera Mujer" />
            {/* Corregido el texto original */}
            <p>
              Polera Mujer talla M <br /> $3800
            </p>
            <Link to="/mujer" className="BotonComprarHomePage">
              Comprar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
