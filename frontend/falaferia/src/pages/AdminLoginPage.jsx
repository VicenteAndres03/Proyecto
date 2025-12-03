import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api"; // 👈 usamos el login del backend

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
      nuevosErrores.correo =
        "Por favor ingresa un correo de administrador válido (@falaferia.com)";
    }
    if (!contraseña) {
      nuevosErrores.contraseña = "Por favor ingresa tu contraseña";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLogin("");

    if (!validarFormulario()) return;

    try {
      // Llamamos al backend usando la función login de api.js
      const data = await login({
        email: correo,
        password: contraseña,
      });

      console.log("Respuesta login ADMIN:", data);

      // Verificamos que realmente sea ADMIN
      if (data.rol !== "ADMIN") {
        setErrorLogin("No tienes permisos de administrador.");
        return;
      }

      // Sacar id de usuario igual que en LoginPage (por si cambia el backend)
      const idUsuario =
        data.id ??
        data.usuarioId ??
        data.idUsuario ??
        data.usuario?.idUsuario ??
        data.usuario?.id ??
        data.user?.idUsuario ??
        data.user?.id;

      if (idUsuario !== undefined && idUsuario !== null) {
        localStorage.setItem("usuarioId", String(idUsuario));
      } else {
        console.error(
          "No se pudo obtener el id de usuario desde la respuesta de login (ADMIN):",
          data
        );
      }

      // Guardamos token, rol y nombre
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);

      alert("¡Bienvenido, administrador!");
      navigate("/admin");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setErrorLogin("Credenciales incorrectas o error en el servidor.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">
                Inicio de Sesión de Administrador
              </h1>

              {errorLogin && (
                <div className="alert alert-danger">
                  {errorLogin}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    className={`form-control ${
                      errores.correo ? "is-invalid" : ""
                    }`}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                  {errores.correo && (
                    <div className="invalid-feedback">
                      {errores.correo}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="contraseña" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contraseña"
                    className={`form-control ${
                      errores.contraseña ? "is-invalid" : ""
                    }`}
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                  />
                  {errores.contraseña && (
                    <div className="invalid-feedback">
                      {errores.contraseña}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Iniciar Sesión
                </button>
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
