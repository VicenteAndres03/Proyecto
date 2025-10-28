import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate
import "./LoginPage.css"; // Importaremos los estilos

function LoginPage() {
  // Estados para los campos del formulario
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [recordar, setRecordar] = useState(false);

  // Estados para validación y mensajes
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);
  const [errorLogin, setErrorLogin] = useState(""); // Para error general de login

  const navigate = useNavigate(); // Para redirigir

  // Función de validación simple
  const validarFormulario = () => {
    const nuevosErrores = {};
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !regexCorreo.test(correo)) {
      nuevosErrores.correo = "Por favor ingresa un correo válido";
    }
    if (!contraseña) {
      nuevosErrores.contraseña = "Por favor ingresa tu contraseña";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setExito(false);
    setErrorLogin("");

    if (validarFormulario()) {
      // --- Simulación de Login (Reemplazar con llamada a API) ---
      console.log("Intentando login:", { correo, contraseña, recordar });
      // Ejemplo simple:
      if (correo === "cliente@ejemplo.com" && contraseña === "password123") {
        setExito(true);
        // Simula redirección después de 1 segundo
        setTimeout(() => {
          navigate("/"); // Redirige a la página de inicio
        }, 1000);
      } else {
        setErrorLogin("Correo o contraseña incorrectos.");
      }
      // --- Fin Simulación ---
    }
  };

  return (
    <div className="contenedor-login-customer">
      {" "}
      {/* Clase específica */}
      <form
        className="formulario-login-customer"
        id="formulario-login"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="titulo-login-customer">Iniciar Sesión</h1>

        {/* Campo Correo */}
        <label htmlFor="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="ejemplo@correo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className={errores.correo ? "input-error-customer" : ""}
          required
        />
        {errores.correo && (
          <div className="mensaje-error-customer" style={{ display: "block" }}>
            {errores.correo}
          </div>
        )}

        {/* Campo Contraseña */}
        <label htmlFor="contraseña">Contraseña</label>
        <input
          type="password"
          id="contraseña"
          name="contraseña"
          placeholder="Ingresa tu contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className={errores.contraseña ? "input-error-customer" : ""}
          required
        />
        {errores.contraseña && (
          <div className="mensaje-error-customer" style={{ display: "block" }}>
            {errores.contraseña}
          </div>
        )}

        {/* Opciones Recordar / Olvidaste Contraseña */}
        <div className="recordar-contraseña-customer">
          <label className="checkbox-container-customer">
            <input
              type="checkbox"
              id="recordar"
              name="recordar"
              checked={recordar}
              onChange={(e) => setRecordar(e.target.checked)}
            />
            {/* <span className="checkmark"></span> -- Si tienes estilo específico */}
            Recordar sesión
          </label>
          <Link to="/olvide-contrasena" className="enlace-olvide-customer">
            ¿Olvidaste tu contraseña?
          </Link>{" "}
          {/* Ruta ejemplo */}
        </div>

        {/* Botón de Envío */}
        <button type="submit" className="btn-customer">
          Iniciar Sesión
        </button>

        {/* Mensaje de Error General */}
        {errorLogin && (
          <div
            className="mensaje-error-customer general"
            style={{ display: "block", marginTop: "15px", textAlign: "center" }}
          >
            {errorLogin}
          </div>
        )}

        {/* Mensaje de Éxito */}
        {exito && (
          <div className="mensaje-exito-customer" style={{ display: "block" }}>
            ¡Inicio de sesión exitoso! Redirigiendo...
          </div>
        )}

        {/* Enlace a Registro */}
        <div className="enlaces-login-customer">
          <p>
            ¿No tienes una cuenta? <Link to="/registro">Registrarse</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
