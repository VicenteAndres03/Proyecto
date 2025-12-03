import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api"; // IMPORTANTE: usamos la función de api.js

function LoginPage() {
  const [email, setEmail] = useState("");        // correo
  const [password, setPassword] = useState("");  // contraseña
  const [error, setError] = useState("");        // mensaje de error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Llamamos a la función login de api.js
      const data = await login({ email, password });

      console.log("Respuesta login:", data);
      alert(`✅ ¡Bienvenido ${data.rol}!`);

      // Extraemos el ID de usuario igual que lo hacías tú
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
          "No se pudo obtener el id de usuario desde la respuesta de login:",
          data
        );
      }

      // Guardamos token, rol y nombre para el resto de la app
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);

      // Redirección según el rol
      if (data.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      // Refrescar para que Header, carrito, etc. detecten el login
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Correo"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Contraseña"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
