import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api"; // Importamos la función real

function AdminLoginPage() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLogin("");

    try {
      // 1. Llamada real al backend
      const data = await login({ email: correo, password: contraseña });

      // 2. Verificar si es ADMIN
      if (data.rol !== "ADMIN") {
        setErrorLogin("No tienes permisos de administrador.");
        return;
      }

      // 3. Guardar datos (igual que en LoginPage normal)
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);
      
      const idUsuario = data.usuarioId || data.id;
      if (idUsuario) localStorage.setItem("usuarioId", String(idUsuario));

      alert("¡Bienvenido Administrador!");
      navigate("/admin");
      window.location.reload(); // Para actualizar header

    } catch (err) {
      console.error(err);
      setErrorLogin("Credenciales incorrectas o error de conexión.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">Admin Login</h1>
              {errorLogin && <div className="alert alert-danger">{errorLogin}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Correo (@falaferia.cl)</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">Entrar</button>
              </form>
              <p className="text-center mt-3">
                <Link to="/login">Ir a login de clientes</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;