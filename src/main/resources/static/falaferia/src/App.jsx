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
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AppRoutes = ({ cartItems, handleAddToCart, handleRemoveFromCart, handleUpdateQuantity, handleCheckout }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Calculamos cantidad total de items
  const cartCount = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

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
          
          {/* Aquí pasamos la función de actualizar cantidad */}
          <Route path="/carrito" element={
            <CartPage 
              cartItems={cartItems} 
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

  useEffect(() => {
    if (usuarioId) fetchCart();
  }, [usuarioId]);

  const fetchCart = () => {
    fetch(`http://localhost:8080/api/carrito/usuario/${usuarioId}`)
      .then(res => res.json())
      .then(data => setCartItems(data || []))
      .catch(err => console.error("Error cargando carrito:", err));
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    })
    .then(res => {
      if(res.ok) {
        alert(`✅ "${product.name}" añadido.`);
        fetchCart();
      }
    });
  };

  const handleRemoveFromCart = (itemId) => {
    fetch(`http://localhost:8080/api/carrito/eliminar/${itemId}`, { method: "DELETE" })
      .then(() => fetchCart());
  };

  // --- AQUÍ ESTÁ LA CORRECCIÓN: LÓGICA DE SUMAR/RESTAR ---
  const handleUpdateQuantity = (item, newQuantity) => {
    if (!usuarioId) return;

    if (newQuantity > item.cantidad) {
      // Si la nueva cantidad es mayor, llamamos a AGREGAR (suma 1)
      fetch("http://localhost:8080/api/carrito/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: parseInt(usuarioId),
          productoId: item.producto.id,
          cantidad: 1
        })
      }).then(() => fetchCart());

    } else if (newQuantity < item.cantidad) {
      // Si la nueva cantidad es menor, llamamos a RESTAR (resta 1)
      fetch("http://localhost:8080/api/carrito/restar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: parseInt(usuarioId),
          productoId: item.producto.id
        })
      }).then(() => fetchCart());
    }
  };

  const handleCheckout = () => {
    if (!usuarioId) return;
    fetch(`http://localhost:8080/api/carrito/vaciar/${usuarioId}`, { method: "DELETE" })
      .then(() => {
        alert("¡Gracias por tu compra! Tu pedido ha sido realizado con éxito.");
        setCartItems([]);
      });
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