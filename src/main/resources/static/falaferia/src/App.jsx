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
// Importación corregida de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AppRoutes = ({ cartItems, handleAddToCart, handleRemoveFromCart, handleUpdateQuantity, handleCheckout }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

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
          <Route path="/hombre" element={<MenProductsPage onAddToCart={handleAddToCart} />} />
          <Route path="/mujer" element={<WomenProductsPage onAddToCart={handleAddToCart} />} />
          
          <Route path="/carrito" element={
            <CartPage 
              cartItems={safeCartItems} 
              onRemoveFromCart={handleRemoveFromCart} 
              onUpdateQuantity={handleUpdateQuantity} 
              onCheckout={handleCheckout} 
            />
          } />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />

          <Route element={<RutaProtegida roleRequired="ADMIN" />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/clientes" element={<GestionClientesPage />} />
            <Route path="/admin/inventario" element={<GestionInventarioPage />} />
            <Route path="/admin/pedidos" element={<GestionPedidosPage />} />
          </Route>
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {

  const [cartItems, setCartItems] = useState([]);
  const usuarioId = localStorage.getItem("usuarioId");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  useEffect(() => {
    if (usuarioId) fetchCart();
  }, [usuarioId]);

  const fetchCart = () => {
    fetch(`http://localhost:8080/api/carrito/usuario/${usuarioId}`, {
      method: "GET",
      headers: getAuthHeaders()
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error servidor: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setCartItems(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Error cargando carrito (Probable error 500 o red):", err);
        setCartItems([]);
      });
  };

  const handleAddToCart = (product) => {
    if (!usuarioId) {
      alert("⚠️ Debes iniciar sesión para comprar.");
      return;
    }
    
    const requestBody = {
      usuarioId: parseInt(usuarioId),
      productoId: product.id,
      cantidad: 1
    };
    
    fetch("http://localhost:8080/api/carrito/agregar", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(requestBody)
    })
    .then(res => {
      if(res.ok) {
        alert(`✅ "${product.nombre || product.name}" añadido.`);
        fetchCart();
      } else if (res.status === 403) {
        alert("⛔ Tu sesión ha caducado o no tienes permisos.");
      } else {
        alert("❌ Error al agregar al carrito.");
      }
    })
    .catch(err => console.error("Error en add to cart:", err));
  };

  const handleRemoveFromCart = (itemId) => {
    fetch(`http://localhost:8080/api/carrito/eliminar/${itemId}`, { 
      method: "DELETE",
      headers: getAuthHeaders()
    })
      .then(() => fetchCart())
      .catch(err => console.error(err));
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (!usuarioId) return;

    const prodId = item.productoId || (item.producto ? item.producto.id : null);

    if (!prodId) {
        console.error("No se pudo obtener ID del producto");
        return;
    }

    if (newQuantity > item.cantidad) {
      // Sumar 1
      fetch("http://localhost:8080/api/carrito/agregar", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          usuarioId: parseInt(usuarioId),
          productoId: prodId,
          cantidad: 1
        })
      }).then(() => fetchCart());

    } else if (newQuantity < item.cantidad) {
      // Restar 1
      fetch("http://localhost:8080/api/carrito/restar", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          usuarioId: parseInt(usuarioId),
          productoId: prodId
        })
      }).then(() => fetchCart());
    }
  };

  const handleCheckout = () => {
    if (!usuarioId) return;
    fetch(`http://localhost:8080/api/carrito/vaciar/${usuarioId}`, { 
      method: "DELETE",
      headers: getAuthHeaders()
    })
      .then(() => {
        alert("¡Gracias por tu compra! Tu pedido ha sido realizado con éxito.");
        setCartItems([]);
      })
      .catch(err => console.error(err));
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