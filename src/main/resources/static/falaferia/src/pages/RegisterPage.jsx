import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Para enlace a Login y posible redirección
import "./RegisterPage.css"; // Importaremos los estilos

function RegisterPage() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  // Estado para los errores de validación
  const [errores, setErrores] = useState({});

  // Estado para simular carga o éxito (opcional)
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false); // Podrías usarlo en lugar de alert

  const navigate = useNavigate(); // Para redirigir después del registro

  // Función de validación (adaptada de tu script.js)
  const validarFormulario = () => {
    const nuevosErrores = {};
    if (nombre.trim().length < 2) {
      nuevosErrores.nombre = "Por favor ingresa tu nombre completo";
    }
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !regexCorreo.test(correo)) {
      nuevosErrores.correo = "Por favor ingresa un correo válido";
    }
    if (contraseña.length < 6) {
      nuevosErrores.contraseña =
        "La contraseña debe tener al menos 6 caracteres";
    }
    if (contraseña !== confirmarContraseña) {
      nuevosErrores.confirmar = "Las contraseñas no coinciden";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Opcional: indicar carga
    // setSuccess(false);

    if (validarFormulario()) {
      // --- Simulación de Registro (Reemplazar con llamada a API) ---
      console.log("Datos del registro:", { nombre, correo, contraseña });
      alert(`¡Registro exitoso! Bienvenido a FalaFeria, ${nombre}!`);

      // Limpiar formulario
      setNombre("");
      setCorreo("");
      setContraseña("");
      setConfirmarContraseña("");
      setErrores({});
      setLoading(false);
      // setSuccess(true);

      // Opcional: Redirigir a la página de login o inicio
      navigate("/login"); // Redirige a la página de login de cliente
      // --- Fin Simulación ---
    } else {
      console.log("Formulario de registro inválido");
      setLoading(false);
    }
  };

  return (
    <div className="contenedor-registro-page">
      {" "}
      {/* Clase específica */}
      <form
        className="formulario-registro-page"
        id="formulario-registro"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="titulo-registro-page">Crear Cuenta</h1>

        {/* Nombre Completo */}
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          placeholder="Ingresa tu nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={errores.nombre ? "input-error-register" : ""}
          disabled={loading}
        />
        {errores.nombre && (
          <div className="mensaje-error-register" style={{ display: "block" }}>
            {errores.nombre}
          </div>
        )}

        {/* Correo Electrónico */}
        <label htmlFor="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          required
          placeholder="ejemplo@correo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className={errores.correo ? "input-error-register" : ""}
          disabled={loading}
        />
        {errores.correo && (
          <div className="mensaje-error-register" style={{ display: "block" }}>
            {errores.correo}
          </div>
        )}

        {/* Contraseña */}
        <label htmlFor="contraseña">Contraseña</label>
        <input
          type="password"
          id="contraseña"
          name="contraseña"
          required
          placeholder="Mínimo 6 caracteres"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className={errores.contraseña ? "input-error-register" : ""}
          disabled={loading}
        />
        {errores.contraseña && (
          <div className="mensaje-error-register" style={{ display: "block" }}>
            {errores.contraseña}
          </div>
        )}

        {/* Confirmar Contraseña */}
        <label htmlFor="confirmar-contraseña">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmar-contraseña"
          name="confirmar-contraseña"
          required
          placeholder="Repite tu contraseña"
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
          className={errores.confirmar ? "input-error-register" : ""}
          disabled={loading}
        />
        {errores.confirmar && (
          <div className="mensaje-error-register" style={{ display: "block" }}>
            {errores.confirmar}
          </div>
        )}

        {/* Botón de envío */}
        <button type="submit" className="btn-register" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        {/* Enlace a Iniciar Sesión */}
        <div className="enlaces-registro-page">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
