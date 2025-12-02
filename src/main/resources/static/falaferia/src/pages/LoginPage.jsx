import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Credenciales incorrectas");
        return res.json();
      })
          .then((data) => {
      console.log("Respuesta login:", data); 

      alert(`✅ ¡Bienvenido ${data.rol}!`);

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
          "⚠️ No se pudo obtener el id de usuario desde la respuesta de login:",
          data
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);

      if (data.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      window.location.reload();
    })
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Correo"
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
              placeholder="Contraseña"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
        <div className="text-center mt-3">
          <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;