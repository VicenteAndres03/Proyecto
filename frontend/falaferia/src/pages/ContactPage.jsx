import React, { useState } from "react";

function ContactPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) {
      nuevosErrores.nombre = "Por favor ingresa tu nombre completo";
    }
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !regexCorreo.test(correo)) {
      nuevosErrores.correo = "Por favor ingresa un correo válido";
    }
    if (!mensaje.trim()) {
      nuevosErrores.mensaje = "Por favor escribe tu mensaje";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEnviado(false);

    if (validarFormulario()) {
      console.log("Enviando datos:", { nombre, correo, mensaje });
      setTimeout(() => {
        setNombre("");
        setCorreo("");
        setMensaje("");
        setEnviado(true);
      }, 1000);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">Contáctanos</h1>
              {enviado && (
                <div className="alert alert-success" role="alert">
                  ¡Mensaje enviado correctamente! Te responderemos pronto.
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    id="nombre"
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    id="correo"
                    className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                  {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">Mensaje</label>
                  <textarea
                    id="mensaje"
                    className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                    rows="5"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  ></textarea>
                  {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Enviar Mensaje</button>
              </form>
              <div className="text-center mt-4 pt-4 border-top">
                <h5>Otras formas de contactarnos</h5>
                <p className="mb-1"><strong>📧 Email:</strong> info@falaferia.com</p>
                <p className="mb-1"><strong>📱 Teléfono:</strong> +56 9 1234 5678</p>
                <p><strong>📍 Dirección:</strong> Santiago, Chile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;