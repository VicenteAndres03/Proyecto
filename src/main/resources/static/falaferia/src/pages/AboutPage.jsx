import React from "react";
import "./AboutPage.css"; // Importaremos los estilos

function AboutPage() {
  return (
    <div>
      {" "}
      {/* Contenedor principal para la página */}
      <div className="titulo-principal">
        <div className="contenedor">
          <h1>FalaFeria</h1>
          <p>
            Donde la moda se encuentra con la calle y se convierte en estilo
            auténtico.
          </p>
        </div>
      </div>
      <div className="contenedor">
        {" "}
        {/* Contenedor general */}
        {/* Sección Historia */}
        <div className="caja-blanca">
          <h2 className="titulo-seccion">Nuestra Historia</h2>
          <div className="historia-completa">
            <div className="texto-historia">
              <p>
                FalaFeria nació de la unión de dos amigos que compartían una
                misma visión: transformar la ropa en una forma de expresión
                auténtica y cercana a la gente. Desde el inicio, nuestra
                inspiración surgió de la vida cotidiana, de las ferias libres y
                el movimiento urbano que refleja identidad, colores y culturas
                diversas. Queríamos crear una marca que no solo vistiera, sino
                que también contara historias, rescatando lo popular y lo local
                para convertirlo en diseños únicos y accesibles.
              </p>
              <p>
                Como equipo de dos personas, trabajamos codo a codo en cada
                detalle: desde la elección de telas y estampados, hasta la
                experiencia de quienes usan nuestras prendas. FalaFeria
                representa nuestra pasión compartida por el diseño y el espíritu
                de comunidad; por eso, más que ropa, ofrecemos una forma de
                sentirse parte de algo más grande. Nuestra meta es que cada
                persona que vista FalaFeria lleve con orgullo una pieza que
                conecta con su estilo y también con la esencia de lo que somos.
              </p>
            </div>
            {/* Nota: La imagen de historia no estaba en el HTML original, puedes añadirla si quieres */}
            {/* <div className="imagen-historia">🖼️</div> */}
          </div>
        </div>
        {/* Misión y Visión (Asegúrate que estas clases existan en tu CSS) */}
        <div className="mision-vision">
          <div className="tarjeta-mision">
            <h3 className="titulo-tarjeta">⚜️ Nuestra Misión</h3>
            <p>
              Diseñar y crear prendas de alta calidad que inspiren confianza y
              expresen la individualidad de cada cliente, combinando tendencias
              actuales con toques únicos y atemporales.
            </p>
          </div>
          <div className="tarjeta-vision">
            <h3 className="titulo-tarjeta">✦ Nuestra Visión</h3>
            <p>
              Ser la marca de moda líder en Latinoamérica, reconocida por
              nuestra innovación, sostenibilidad y compromiso.
            </p>
          </div>
        </div>
        {/* Valores */}
        <div className="caja-blanca">
          <div className="seccion-valores">
            {" "}
            {/* Contenedor extra si es necesario para el fondo gris */}
            <h2 className="titulo-seccion">Nuestros Valores</h2>
            <div className="lista-valores">
              <div className="valor">
                <div className="icono-valor">💠</div>
                <div className="nombre-valor">Calidad Premium</div>
                <p>
                  Utilizamos únicamente materiales de la más alta calidad,
                  garantizando durabilidad y comodidad en cada prenda.
                </p>
              </div>
              <div className="valor">
                <div className="icono-valor">🍃</div>
                <div className="nombre-valor">Moda Sostenible</div>
                <p>
                  Comprometidos con el medio ambiente, implementamos prácticas
                  ecológicas en todo nuestro proceso de producción.
                </p>
              </div>
              <div className="valor">
                <div className="icono-valor">✦</div>
                <div className="nombre-valor">Diseño Único</div>
                <p>
                  Cada colección refleja creatividad y originalidad, fusionando
                  tendencias globales con inspiración local.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Estadísticas */}
        <div className="caja-blanca">
          <div className="seccion-numeros">
            <h2 className="titulo-numeros">Nuestros Logros</h2>
            <div className="lista-numeros">
              <div className="numero">
                <div className="cifra">15K+</div>
                <div className="descripcion">Clientes Felices</div>
              </div>
              <div className="numero">
                <div className="cifra">500+</div>
                <div className="descripcion">Diseños Únicos</div>
              </div>
              <div className="numero">
                <div className="cifra">25</div>
                <div className="descripcion">Ciudades</div>
              </div>
              <div className="numero">
                <div className="cifra">98%</div>
                <div className="descripcion">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
        {/* Equipo */}
        <div className="caja-blanca">
          <h2 className="titulo-seccion">Nuestro Equipo Creativo</h2>
          <div className="lista-equipo">
            <div className="persona">
              <div className="foto-persona">VP</div>
              <div className="nombre-persona">Vicente Pacheco</div>
              <div className="puesto-persona">Director Creativo</div>
              <p className="descripcion-persona">
                Diseñador de moda con 12 años de experiencia, especializado en
                tendencias contemporáneas y sostenibilidad en la industria
                textil.
              </p>
            </div>
            <div className="persona">
              <div className="foto-persona">DE</div>
              <div className="nombre-persona">Diego Echeverría</div>
              <div className="puesto-persona">Director de Producción</div>
              <p className="descripcion-persona">
                Experto en gestión de producción textil y control de calidad,
                garantizando que cada prenda cumpla con nuestros estándares de
                excelencia.
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Cierre del contenedor general */}
    </div>
  );
}

export default AboutPage;
