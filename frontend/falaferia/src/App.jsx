import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
// Páginas
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

// 👇 IMPORTAMOS LAS FUNCIONES NUEVAS DEL API
import { 
  getCarrito, 
  agregarAlCarrito, 
  restarDelCarrito, 
  eliminarItemCarrito, 
  vaciarCarritoApi 
} from "./services/api";

const getUsuarioIdFromStorage = () => {
  // Lógica existente para recuperar ID
  let raw = localStorage.getItem("usuarioId") || localStorage.getItem("idUsuario");
  if (raw) return raw;
  return null;
};

// ... (Componente AppRoutes se mantiene igual) ...
const AppRoutes = ({ cartItems, handleAddToCart, handleRemoveFromCart, handleUpdateQuantity, handleCheckout }) => {
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
          <Route path="/hombre" element={<MenProductsPage onAddToCart={handleAddToCart} />} />
          <Route path="/mujer" element={<WomenProductsPage onAddToCart={handleAddToCart} />} />
          <Route path="/carrito" element={
              <CartPage cartItems={safeCartItems} onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity} onCheckout={handleCheckout} />
            }
          />
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

const getProductoIdFromCartItem = (item) => {
  if (item.productoId) return item.productoId;
  if (item.idProducto) return item.idProducto;
  // Si viene el objeto completo producto
  if (item.producto && item.producto.id) return item.producto.id;
  return item.id; // Fallback extremo
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const id = getUsuarioIdFromStorage();
    if (id) setUsuarioId(id);
  }, []);

  useEffect(() => {
    if (usuarioId) fetchCart(usuarioId);
    else setCartItems([]);
  }, [usuarioId]);

  const fetchCart = (idUsuario) => {
    getCarrito(idUsuario)
      .then((data) => setCartItems(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error cargando carrito:", err);
        setCartItems([]);
      });
  };

  const handleAddToCart = (product) => {
    const id = getUsuarioIdFromStorage();
    if (!id) {
      alert("⚠️ Debes iniciar sesión para comprar.");
      return;
    }

    agregarAlCarrito(parseInt(id), product.id, 1)
      .then(() => {
        alert(`✅ "${product.nombre || product.name}" añadido.`);
        if (!usuarioId) setUsuarioId(id);
        fetchCart(id);
      })
      .catch((err) => {
        if (err.message === "403") alert("⛔ Tu sesión ha caducado.");
        else console.error(err);
      });
  };

  const handleRemoveFromCart = (itemId) => {
    if (!usuarioId) return;
    eliminarItemCarrito(itemId)
      .then(() => fetchCart(usuarioId))
      .catch(console.error);
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (!usuarioId) return;
    const productoId = getProductoIdFromCartItem(item);

    if (newQuantity > item.cantidad) {
      agregarAlCarrito(parseInt(usuarioId), productoId, 1).then(() => fetchCart(usuarioId));
    } else if (newQuantity < item.cantidad) {
      restarDelCarrito(parseInt(usuarioId), productoId).then(() => fetchCart(usuarioId));
    }
  };

  const handleCheckout = () => {
    if (!usuarioId) return;
    vaciarCarritoApi(usuarioId)
      .then(() => {
        alert("¡Gracias por tu compra! Tu pedido ha sido realizado con éxito.");
        setCartItems([]);
      })
      .catch(console.error);
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