import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/api"; // 👈 usamos la función de api.js

function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- FUNCIÓN DE VALIDACIÓN DE RUT (MÓDULO 11) ---
  const validarRut = (rut) => {
    let valor = rut.replace(/\./g, "").replace(/-/g, "");
    
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    
    if (cuerpo.length < 7) return false;

    let suma = 0;
    let multiplo = 2;

    for (let i = 1; i <= cuerpo.length; i++) {
      let index = multiplo * valor.charAt(valor.length - i - 1);
      suma = suma + index;
      if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = (dvEsperado === 11) ? "0" : (dvEsperado === 10) ? "K" : dvEsperado.toString();

    return dv === dvEsperado;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }

    if (!validarRut(formData.rut)) {
      alert("❌ El RUT ingresado no es válido (Revise el dígito verificador).");
      return;
    }

    const usuarioParaEnviar = {
      nombre: formData.nombre,
      rut: formData.rut,
      email: formData.email,
      password: formData.password,
      rol: "USER"
    };

    try {
      // usamos la función register de api.js
      const mensaje = await register(usuarioParaEnviar);
      alert("✅ " + mensaje);
      navigate("/login");
    } catch (err) {
      alert("❌ Error al registrar: " + err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Crear Cuenta</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Juan Pérez"
            />
          </div>

          {/* --- CAMPO RUT NUEVO --- */}
          <div className="mb-3">
            <label className="form-label">RUT (Sin puntos y con guión)</label>
            <input 
              type="text" 
              className="form-control" 
              name="rut"
              value={formData.rut} 
              onChange={handleChange} 
              required 
              placeholder="12345678-9" 
            />
          </div>
          {/* ----------------------- */}

          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="juan@correo.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="******"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="******"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Registrarse
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
