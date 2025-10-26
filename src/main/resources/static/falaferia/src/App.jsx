// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage"; // <-- Importa la página de contacto
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactPage />} />{" "}
          {/* <-- Añade la ruta */}
          {/* Aquí añadirás otras rutas después */}
          {/* <Route path="/nosotros" element={<AboutPage />} /> */}
          {/* <Route path="/productos" element={<ProductsPage />} /> */}
          {/* ... */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
