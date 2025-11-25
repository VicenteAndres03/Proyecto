import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "" // Solo para validación visual
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }

    // 2. Preparamos el objeto para Java (quitamos confirmPassword porque Java no lo espera)
    const usuarioParaEnviar = {
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      rol: "USER" // Rol por defecto
    };

    // 3. Enviar al Backend
    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioParaEnviar),
    })
      .then(async (res) => {
        const textoRespuesta = await res.text(); // Leemos la respuesta (sea error o éxito)
        if (!res.ok) throw new Error(textoRespuesta); // Si falló, lanzamos error
        return textoRespuesta;
      })
      .then((mensaje) => {
        alert("✅ " + mensaje);
        navigate("/login"); // Redirigir al login para que entre
      })
      .catch((err) => {
        alert("❌ Error al registrar: " + err.message);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Crear Cuenta</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre Completo</label>
            <input type="text" className="form-control" name="nombre"
              value={formData.nombre} onChange={handleChange} required placeholder="Juan Pérez" />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" name="email"
              value={formData.email} onChange={handleChange} required placeholder="juan@correo.com" />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" name="password"
              value={formData.password} onChange={handleChange} required placeholder="******" />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input type="password" className="form-control" name="confirmPassword"
              value={formData.confirmPassword} onChange={handleChange} required placeholder="******" />
          </div>

          <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>

        <div className="text-center mt-3">
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;