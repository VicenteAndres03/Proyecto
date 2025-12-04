// frontend/falaferia/src/services/api.js

// Aquí definimos la URL base del backend.
// IMPORTANTE: Usamos el puerto 8081 porque en la U el 8080 está ocupado.
export const API_URL = "http://10.28.107.69:8081";

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

// ================== CRUD PRODUCTOS (ADMIN) ==================

export async function crearProducto(producto) {
  const response = await fetch(`${API_URL}/api/productos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al crear producto");
  }

  return response.json(); // devuelve el producto creado
}

export async function actualizarProducto(id, producto) {
  const response = await fetch(`${API_URL}/api/productos/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al actualizar producto");
  }

  return response.json(); // devuelve el producto actualizado
}

export async function eliminarProductoApi(id) {
  const response = await fetch(`${API_URL}/api/productos/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al eliminar producto");
  }

  return true;
}

// ================== CLIENTES (ADMIN) ==================

export async function getUsuarios() {
  const response = await fetch(`${API_URL}/api/usuarios`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al obtener usuarios");
  }

  return response.json(); // debería devolver List<Usuario>
}

export async function eliminarUsuario(id) {
  const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al eliminar usuario");
  }

  return true;
}

// src/services/api.js

// ... (El resto de tu archivo sigue igual) ...

// ================== CARRITO CORREGIDO ==================

export async function getCarrito(usuarioId) {
  const response = await fetch(`${API_URL}/api/carrito/usuario/${usuarioId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Error cargando carrito");
  return response.json(); // Esto SÍ devuelve JSON (la lista)
}

export async function agregarAlCarrito(usuarioId, productoId, cantidad = 1) {
  const response = await fetch(`${API_URL}/api/carrito/agregar`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ usuarioId, productoId, cantidad }),
  });
  
  if (response.status === 403) throw new Error("403"); 
  if (!response.ok) throw new Error("Error al agregar al carrito");
  
  // CORRECCIÓN: Usamos text() en lugar de json()
  return response.text(); 
}

export async function restarDelCarrito(usuarioId, productoId) {
  const response = await fetch(`${API_URL}/api/carrito/restar`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ usuarioId, productoId }),
  });
  
  if (!response.ok) throw new Error("Error al restar del carrito");
  
  // CORRECCIÓN: Usamos text() aquí también
  return response.text();
}

export async function eliminarItemCarrito(itemId) {
  const response = await fetch(`${API_URL}/api/carrito/eliminar/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Error al eliminar item");
  return true;
}

export async function vaciarCarritoApi(usuarioId) {
  const response = await fetch(`${API_URL}/api/carrito/vaciar/${usuarioId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Error al vaciar carrito");
  return true;
}

// ================== API EXTERNA (OPCIONAL) ==================
export async function getIndicadores() {
  const response = await fetch("https://mindicador.cl/api");
  if (!response.ok) throw new Error("Error cargando indicadores");
  return response.json();
}
