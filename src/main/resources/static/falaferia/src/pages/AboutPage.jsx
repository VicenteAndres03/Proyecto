import React from "react";

function AboutPage() {
  return (
    <>
      {/* --- Hero Section --- */}
      <div className="bg-white text-dark py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">FalaFeria</h1>
          <p className="lead">Donde la moda se encuentra con la calle y se convierte en estilo auténtico.</p>
        </div>
      </div>

      <div className="container my-5">
        {/* --- History Section --- */}
        <div className="card shadow-sm mb-5">
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Nuestra Historia</h2>
            <p>
              FalaFeria nació de la unión de dos amigos que compartían una misma visión: transformar la ropa en una forma de expresión auténtica y cercana a la gente. Desde el inicio, nuestra inspiración surgió de la vida cotidiana, de las ferias libres y el movimiento urbano que refleja identidad, colores y culturas diversas. Queríamos crear una marca que no solo vistiera, sino que también contara historias, rescatando lo popular y lo local para convertirlo en diseños únicos y accesibles.
            </p>
            <p>
              Como equipo de dos personas, trabajamos codo a codo en cada detalle: desde la elección de telas y estampados, hasta la experiencia de quienes usan nuestras prendas. FalaFeria representa nuestra pasión compartida por el diseño y el espíritu de comunidad; por eso, más que ropa, ofrecemos una forma de sentirse parte de algo más grande. Nuestra meta es que cada persona que vista FalaFeria lleve con orgullo una pieza que conecta con su estilo y también con la esencia de lo que somos.
            </p>
          </div>
        </div>

        {/* --- Mission & Vision Section --- */}
        <div className="row mb-5 g-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <h3 className="card-title">⚜️ Nuestra Misión</h3>
                <p className="card-text">Diseñar y crear prendas de alta calidad que inspiren confianza y expresen la individualidad de cada cliente, combinando tendencias actuales con toques únicos y atemporales.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <h3 className="card-title">✦ Nuestra Visión</h3>
                <p className="card-text">Ser la marca de moda líder en Latinoamérica, reconocida por nuestra innovación, sostenibilidad y compromiso.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Values Section --- */}
        <div className="card shadow-sm mb-5">
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Nuestros Valores</h2>
            <div className="row text-center">
              <div className="col-md-4">
                <div className="mb-3 fs-2">💠</div>
                <h5>Calidad Premium</h5>
                <p>Utilizamos únicamente materiales de la más alta calidad, garantizando durabilidad y comodidad en cada prenda.</p>
              </div>
              <div className="col-md-4">
                <div className="mb-3 fs-2">🍃</div>
                <h5>Moda Sostenible</h5>
                <p>Comprometidos con el medio ambiente, implementamos prácticas ecológicas en todo nuestro proceso de producción.</p>
              </div>
              <div className="col-md-4">
                <div className="mb-3 fs-2">✦</div>
                <h5>Diseño Único</h5>
                <p>Cada colección refleja creatividad y originalidad, fusionando tendencias globales con inspiración local.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Achievements Section --- */}
        <div className="bg-dark text-white text-center py-5 rounded shadow-sm mb-5">
          <div className="container">
            <h2 className="mb-4">Nuestros Logros</h2>
            <div className="row">
              <div className="col-md-3 col-6">
                <h3 className="display-5">15K+</h3>
                <p>Clientes Felices</p>
              </div>
              <div className="col-md-3 col-6">
                <h3 className="display-5">500+</h3>
                <p>Diseños Únicos</p>
              </div>
              <div className="col-md-3 col-6">
                <h3 className="display-5">25</h3>
                <p>Ciudades</p>
              </div>
              <div className="col-md-3 col-6">
                <h3 className="display-5">98%</h3>
                <p>Satisfacción</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Team Section --- */}
        <div className="card shadow-sm">
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Nuestro Equipo Creativo</h2>
            <div className="row">
              <div className="col-md-6 text-center">
                <div className="mx-auto bg-secondary rounded-circle d-flex justify-content-center align-items-center" style={{ width: "120px", height: "120px" }}>
                  <span className="fs-1 text-white">VP</span>
                </div>
                <h5 className="mt-3">Vicente Pacheco</h5>
                <p className="text-primary">Director Creativo</p>
                <p>Diseñador de moda con 12 años de experiencia, especializado en tendencias contemporáneas y sostenibilidad en la industria textil.</p>
              </div>
              <div className="col-md-6 text-center">
                <div className="mx-auto bg-secondary rounded-circle d-flex justify-content-center align-items-center" style={{ width: "120px", height: "120px" }}>
                  <span className="fs-1 text-white">DE</span>
                </div>
                <h5 className="mt-3">Diego Echeverría</h5>
                <p className="text-primary">Director de Producción</p>
                <p>Experto en gestión de producción textil y control de calidad, garantizando que cada prenda cumpla con nuestros estándares de excelencia.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default AboutPage;