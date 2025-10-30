import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [recordar, setRecordar] = useState(false);
  const [errores, setErrores] = useState({});
  const [errorLogin, setErrorLogin] = useState("");
  const [exito, setExito] = useState(false);
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
  setExito(false);

  if (validarFormulario()) {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.length === 0) {
      setErrorLogin("No hay usuarios registrados en el sistema");
      return;
    }

    const usuarioEncontrado = usuarios.find(u => u.correo === correo);

    if (!usuarioEncontrado) {
      setErrorLogin("No existe una cuenta registrada con este correo");
      return;
    }

    if (usuarioEncontrado.contraseña !== contraseña) {
      setErrorLogin("Contraseña incorrecta");
      return;
    }

    setExito(true);
    alert(`¡Bienvenido a FalaFeria, ${usuarioEncontrado.nombre}!`);

    if (recordar) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    }

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }
};


  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">Iniciar Sesión</h1>

              {errorLogin && (
                <div className="alert alert-danger">
                  {errorLogin}
                </div>
              )}

              {exito && (
                <div className="alert alert-success">
                  Inicio de sesión exitoso
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate autoComplete= "off">
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                  <input
                    type="text"
                    id="correo"
                    autoComplete="off"
                    className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="contraseña" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    id="contraseña"
                    autoComplete="off"
                    className={`form-control ${errores.contraseña ? 'is-invalid' : ''}`}
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
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
              <div className="text-center mt-3">
                <Link to="/admin-login">Ingresar como administrador</Link>
              </div>
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