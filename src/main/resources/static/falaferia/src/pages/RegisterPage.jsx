import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

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
      nuevosErrores.contraseña = "La contraseña debe tener al menos 6 caracteres";
    }
    if (contraseña !== confirmarContraseña) {
      nuevosErrores.confirmar = "Las contraseñas no coinciden";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (validarFormulario()) {

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      if (usuarios.find(u => u.correo === correo)) {
      setErrores({ correo: "Este correo ya está registrado" });
      setLoading(false);
      return;
      }

      usuarios.push({ nombre, correo, contraseña });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      console.log("Datos del registro:", { nombre, correo, contraseña });
      alert(`¡Registro exitoso! Bienvenido a FalaFeria, ${nombre}!`);
      setExito(true);
      
      //Esto es para limpiar el formulario
      setNombre("");
      setCorreo("");
      setContraseña("");
      setConfirmarContraseña("");

      setLoading(false);
      navigate("/login");
    } else {
      setLoading(false);
    }

  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">Crear Cuenta</h1>

              {exito && (
                <div className="alert alert-success">
                  ¡Registro exitoso!
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                  {errores.contraseña && <div className="invalid-feedback">{errores.contraseña}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmar-contraseña" className="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmar-contraseña"
                    className={`form-control ${errores.confirmar ? 'is-invalid' : ''}`}
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    disabled={loading}
                  />
                  {errores.confirmar && <div className="invalid-feedback">{errores.confirmar}</div>}
                </div>
                <button type="button" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Registrando..." : "Registrarse"}
                </button>
              </form>
              <div className="text-center mt-4 pt-4 border-top">
                <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;