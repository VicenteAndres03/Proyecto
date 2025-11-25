import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roleRequired }) => {
  // 1. Recuperamos los datos del navegador
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("rol");

  // 2. Si no hay token, ¡fuera! (Al login)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si se requiere un rol específico (ej: ADMIN) y no lo tiene, ¡fuera!
  if (roleRequired && userRole !== roleRequired) {
    alert("Acceso denegado: Se requieren permisos de Administrador.");
    return <Navigate to="/" replace />;
  }

  // 4. Si pasa todas las pruebas, adelante (Outlet muestra la página solicitada)
  return <Outlet />;
};

export default ProtectedRoute;