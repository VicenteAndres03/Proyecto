import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [recordar, setRecordar] = useState(false);
  const [errores, setErrores] = useState({});
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorLogin("");

    if (validarFormulario()) {
      if (correo === "cliente@ejemplo.com" && contraseña === "password123") {
        alert("¡Inicio de sesión exitoso! Redirigiendo...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setErrorLogin("Correo o contraseña incorrectos.");
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">Iniciar Sesión</h1>
              {errorLogin && <div className="alert alert-danger">{errorLogin}</div>}
              <form onSubmit={handleSubmit} noValidate>
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
                  <label htmlFor="contraseña" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    id="contraseña"
                    className={`form-control ${errores.contraseña ? 'is-invalid' : ''}`}
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                  />
                  {errores.contraseña && <div className="invalid-feedback">{errores.contraseña}</div>}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="recordar"
                      className="form-check-input"
                      checked={recordar}
                      onChange={(e) => setRecordar(e.target.checked)}
                    />
                    <label htmlFor="recordar" className="form-check-label">Recordar sesión</label>
                  </div>
                  <Link to="/olvide-contrasena">¿Olvidaste tu contraseña?</Link>
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
              </form>
              <div className="text-center mt-4 pt-4 border-top">
                <p>¿No tienes una cuenta? <Link to="/registro">Registrarse</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;