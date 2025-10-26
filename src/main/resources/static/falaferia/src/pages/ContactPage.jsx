import React, { useState } from "react";
import "./ContactPage.css"; // Importaremos los estilos

function ContactPage() {
  // Estados para guardar los valores de los inputs
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estados para manejar errores de validación
  const [errores, setErrores] = useState({});

  // Estado para mostrar el mensaje de éxito
  const [enviado, setEnviado] = useState(false);

  // Función para validar el formulario
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
    // Devuelve true si no hay errores (objeto vacío), false si hay errores
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el envío tradicional del formulario
    setEnviado(false); // Oculta mensaje de éxito anterior si lo hubiera

    if (validarFormulario()) {
      // --- Simulación de envío ---
      // En una app real, aquí llamarías a tu backend (API)
      console.log("Enviando datos:", { nombre, correo, mensaje });
      alert("Simulando envío... Revisa la consola (F12)");

      // Limpiar formulario y mostrar mensaje de éxito después de un tiempo simulado
      setTimeout(() => {
        setNombre("");
        setCorreo("");
        setMensaje("");
        setEnviado(true); // Muestra el mensaje de éxito
      }, 1000); // Simula 1 segundo de espera
      // --- Fin simulación ---
    } else {
      console.log("Formulario inválido");
    }
  };

  return (
    <div className="contenedor-contacto">
      {/* Usamos onSubmit en el form y llamamos a handleSubmit */}
      <form
        className="formulario-contacto"
        id="formulario-contacto"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="titulo-contacto">Contáctanos</h1>
        {/* Campo Nombre */}
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ingresa tu nombre completo"
          value={nombre} // Conecta el input al estado 'nombre'
          onChange={(e) => setNombre(e.target.value)} // Actualiza el estado al escribir
          className={errores.nombre ? "input-error" : ""} // Añade clase si hay error
          required // Mantenemos required por semántica HTML
        />
        {/* Muestra mensaje de error si existe */}
        {errores.nombre && (
          <div className="mensaje-error" style={{ display: "block" }}>
            {errores.nombre}
          </div>
        )}
        {/* Campo Correo */}
        <label htmlFor="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="ejemplo@correo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className={errores.correo ? "input-error" : ""}
          required
        />
        {errores.correo && (
          <div className="mensaje-error" style={{ display: "block" }}>
            {errores.correo}
          </div>
        )}
        {/* Campo Mensaje */}
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Escribe tu mensaje aquí..."
          rows="6"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={errores.mensaje ? "input-error" : ""}
          required
        ></textarea>{" "}
        {/* Textarea no se auto-cierra en React */}
        {errores.mensaje && (
          <div className="mensaje-error" style={{ display: "block" }}>
            {errores.mensaje}
          </div>
        )}
        {/* Botón de envío */}
        <button type="submit" className="btn">
          Enviar Mensaje
        </button>
        {/* Mensaje de éxito (se muestra condicionalmente) */}
        {enviado && (
          <div className="mensaje-exito" style={{ display: "block" }}>
            ¡Mensaje enviado correctamente! Te responderemos pronto.
          </div>
        )}
        {/* Información adicional */}
        <div className="info-contacto">
          <h3>Otras formas de contactarnos:</h3>
          <p>
            <strong>📧 Email:</strong> info@falaferia.com
          </p>
          <p>
            <strong>📱 Teléfono:</strong> +56 9 1234 5678
          </p>
          <p>
            <strong>📍 Dirección:</strong> Santiago, Chile
          </p>{" "}
          {/* Corregido texto original */}
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
