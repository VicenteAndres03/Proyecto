// src/App.jsx
import React, { useState } from "react";
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
import "./index.css";

const AppRoutes = ({ cartItems, handleAddToCart, handleRemoveFromCart, handleUpdateQuantity, handleCheckout }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />}
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
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onCheckout={handleCheckout}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Alias en español: soportar /registro además de /register */}
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/clientes" element={<GestionClientesPage />} />
          <Route path="/admin/inventario" element={<GestionInventarioPage />} />
          <Route path="/admin/pedidos" element={<GestionPedidosPage />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    alert(`"${product.name}" se ha añadido al carrito.`);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleCheckout = () => {
    alert("¡Gracias por tu compra! Tu pedido ha sido realizado con éxito.");
    setCartItems([]);
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
