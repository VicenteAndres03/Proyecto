import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MenProductsPage from "./pages/MenProductsPage";
import WomenProductsPage from "./pages/WomenProductsPage";
import CartPage from "./pages/CartPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import GestionClientesPage from "./pages/GestionClientesPage";
import GestionInventarioPage from "./pages/GestionInventarioPage";
import GestionPedidosPage from "./pages/GestionPedidosPage";
import RutaProtegida from "./components/RutaProtegida";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ====== HELPER PARA OBTENER EL ID DEL USUARIO ======
const getUsuarioIdFromStorage = () => {
  // 1) Claves directas
  let raw =
    localStorage.getItem("usuarioId") ||
    localStorage.getItem("userId") ||
    localStorage.getItem("idUsuario") ||
    localStorage.getItem("id");

  if (raw && raw !== "undefined" && raw !== "null") {
    return raw;
  }

  // 2) Objeto usuario / user en JSON
  const usuarioJson =
    localStorage.getItem("usuario") || localStorage.getItem("user");

  if (usuarioJson) {
    try {
      const u = JSON.parse(usuarioJson);
      const posibleId =
        u?.idUsuario || u?.usuarioId || u?.id || u?.userId;
      if (posibleId !== undefined && posibleId !== null) {
        return String(posibleId);
      }
    } catch (e) {
      console.error("No se pudo parsear usuario de localStorage", e);
    }
  }

  return null;
};

const AppRoutes = ({
  cartItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateQuantity,
  handleCheckout
}) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const cartCount = safeCartItems.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      {!isAdminRoute && <Header cartCount={cartCount} />}
      <div className={isAdminRoute ? "" : "main-content"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route
            path="/hombre"
            element={<MenProductsPage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/mujer"
            element={<WomenProductsPage onAddToCart={handleAddToCart} />}
          />

          <Route
            path="/carrito"
            element={
              <CartPage
                cartItems={safeCartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onCheckout={handleCheckout}
              />
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />

          <Route element={<RutaProtegida roleRequired="ADMIN" />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/clientes" element={<GestionClientesPage />} />
            <Route
              path="/admin/inventario"
              element={<GestionInventarioPage />}
            />
            <Route path="/admin/pedidos" element={<GestionPedidosPage />} />
          </Route>
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
};
const getProductoIdFromCartItem = (item) => {
  if (!item) return null;

  if (item.producto && item.producto.id !== undefined && item.producto.id !== null) {
    return item.producto.id;
  }

  if (item.productoId !== undefined && item.productoId !== null) {
    return item.productoId;
  }

  if (item.idProducto !== undefined && item.idProducto !== null) {
    return item.idProducto;
  }

  // Ultimo fallback: usar id del propio item
  if (item.id !== undefined && item.id !== null) {
    return item.id;
  }

  return null;
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);

  // Al montar, resolvemos el ID del usuario
  useEffect(() => {
    const id = getUsuarioIdFromStorage();
    if (id) setUsuarioId(id);
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  };

  useEffect(() => {
    if (usuarioId) {
      fetchCart(usuarioId);
    } else {
      setCartItems([]);
    }
  }, [usuarioId]);

  const fetchCart = (idUsuario) => {
    if (!idUsuario) return;

    fetch(`http://localhost:8081/api/carrito/usuario/${idUsuario}`, {
      method: "GET",
      headers: getAuthHeaders()
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error servidor: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCartItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error cargando carrito (Probable error 500 o red):", err);
        setCartItems([]);
      });
  };

  const handleAddToCart = (product) => {
    // Siempre resolvemos de nuevo por si el login acaba de cambiar algo
    const id = getUsuarioIdFromStorage();

    if (!id) {
      alert("⚠️ Debes iniciar sesión para comprar.");
      return;
    }

    const requestBody = {
      usuarioId: parseInt(id),
      productoId: product.id,
      cantidad: 1
    };

    fetch("http://localhost:8081/api/carrito/agregar", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(requestBody)
    })
      .then((res) => {
        if (res.ok) {
          alert(`✅ "${product.nombre || product.name}" añadido.`);
          setUsuarioId(id); // nos aseguramos de que el estado y el storage coincidan
          fetchCart(id);
        } else if (res.status === 403) {
          alert("⛔ Tu sesión ha caducado o no tienes permisos.");
        } else {
          alert("❌ Error al agregar al carrito.");
        }
      })
      .catch((err) => console.error("Error en add to cart:", err));
  };

  const handleRemoveFromCart = (itemId) => {
    const id = getUsuarioIdFromStorage();
    if (!id) return;

    fetch(`http://localhost:8081/api/carrito/eliminar/${itemId}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    })
      .then(() => fetchCart(id))
      .catch((err) => console.error(err));
  };

  const handleUpdateQuantity = (item, newQuantity) => {
  const idUsuario = getUsuarioIdFromStorage();
  if (!idUsuario || idUsuario === "undefined" || idUsuario === "null") return;

  // Usamos el helper para sacar el id del producto
  const productoId = getProductoIdFromCartItem(item);

  if (!productoId) {
    console.error("❌ No se pudo determinar el productoId a partir del item:", item);
    return;
  }

  if (newQuantity > item.cantidad) {
    // Sumar 1
    fetch("http://localhost:8081/api/carrito/agregar", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        usuarioId: parseInt(idUsuario),
        productoId: productoId,
        cantidad: 1
      })
    }).then(() => fetchCart(idUsuario));

  } else if (newQuantity < item.cantidad) {
    // Restar 1
    fetch("http://localhost:8081/api/carrito/restar", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        usuarioId: parseInt(idUsuario),
        productoId: productoId
      })
    }).then(() => fetchCart(idUsuario));
  }
};


  const handleCheckout = () => {
    const id = getUsuarioIdFromStorage();
    if (!id) return;

    fetch(`http://localhost:8081/api/carrito/vaciar/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    })
      .then(() => {
        alert("¡Gracias por tu compra! Tu pedido ha sido realizado con éxito.");
        setCartItems([]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Router>
      <AppRoutes
        cartItems={cartItems}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleUpdateQuantity={handleUpdateQuantity}
        handleCheckout={handleCheckout}
      />
    </Router>
  );
}

export default App;
