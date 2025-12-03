// frontend/falaferia/src/services/api.js

// Aquí definimos la URL base del backend.
// IMPORTANTE: Usamos el puerto 8081 porque en la U el 8080 está ocupado.
export const API_URL = "http://localhost:8081";

// Esta función arma los headers con el token (si existe)
export function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ================== AUTH (LOGIN / REGISTER) ==================

// Login: recibe un objeto con { email, password }
// Devuelve la respuesta JSON del backend (PeticionLogin)
export async function login(credentials) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error en login");
  }

  return response.json(); // { token, rol, id, nombre, ... }
}

// (Opcional) Register por si lo usas después
export async function register(usuario) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error en registro");
  }

  return response.text(); // tu backend devuelve un mensaje String
}

// ================== PRODUCTOS ==================

export async function getProductos() {
  const response = await fetch(`${API_URL}/api/productos`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error obteniendo productos");
  }

  return response.json(); // List<Producto>
}

export async function getProductosByCategoria(categoria) {
  const response = await fetch(
    `${API_URL}/api/productos/filtro/${encodeURIComponent(categoria)}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error filtrando productos");
  }

  return response.json();
}
