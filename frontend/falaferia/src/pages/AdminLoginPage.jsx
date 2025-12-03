import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminLoginPage() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errores, setErrores] = useState({});
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();

  const validarFormulario = () => {
    const nuevosErrores = {};
    const regexCorreo = /@falaferia\.com$/;
    if (!correo || !regexCorreo.test(correo)) {
      nuevosErrores.correo = "Por favor ingresa un correo de administrador válido (@falaferia.com)";
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
      // Aquí iría la lógica de autenticación del administrador
      // Por ahora, simularemos un inicio de sesión exitoso
      alert("¡Bienvenido, administrador!");
      navigate("/admin"); // Redirigir a la página de administración principal
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">Inicio de Sesión de Administrador</h1>

              {errorLogin && (
                <div className="alert alert-danger">
                  {errorLogin}
                </div>
              )}

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
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
              </form>
              <p className="text-center mt-3">
                <Link to="/login">Iniciar sesión como cliente</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
