// src/pages/MenProductsPage.jsx
import React from "react";
// ¡ASEGÚRATE DE IMPORTAR ProductCard!
import ProductCard from "../components/product/ProductCard";
import "./MenProductsPage.css";

// --- DATOS DE EJEMPLO PARA HOMBRE (los mismos de antes) ---
const menProducts = [
  {
    id: "H-POLERON-01",
    name: "Poleron Hombre talla XL",
    brand: "FALAFERIA",
    price: 5700,
    discount: "-30%",
    images: [
      "/src/assets/Ropa/Poleron Hombre/Poleron1h.webp",
      "/src/assets/Ropa/Poleron Hombre/Poleron2h.webp",
      "/src/assets/Ropa/Poleron Hombre/Poleron3h.webp",
      "/src/assets/Ropa/Poleron Hombre/Poleron4h.webp",
      "/src/assets/Ropa/Poleron Hombre/Poleron5h.webp",
    ],
    freeShipping: true,
    seller: "FalaFeria",
  },
  {
    id: "H-POLERA-01",
    name: "Polera Hombre talla XL",
    brand: "FalaFeria",
    price: 3800,
    images: [
      "/src/assets/Ropa/Polera Hombre/Polera1H.webp",
      "/src/assets/Ropa/Polera Hombre/Polera2H.webp",
      "/src/assets/Ropa/Polera Hombre/Polera3H.webp",
      "/src/assets/Ropa/Polera Hombre/Polera4H.webp",
    ],
    freeShipping: true,
    seller: "FalaFeria",
  },
  {
    id: "H-PANTALON-01",
    name: "Pantalon Hombre talla M",
    brand: "FalaFeria",
    price: 4300,
    images: [
      "/src/assets/Ropa/Pantalon Hombre/Pantalon1H.webp",
      "/src/assets/Ropa/Pantalon Hombre/Pantalon2H.webp",
      "/src/assets/Ropa/Pantalon Hombre/Pantalon3H.webp",
      "/src/assets/Ropa/Pantalon Hombre/Pantalon4H.webp",
    ],
    freeShipping: true,
    seller: "FalaFeria",
  },
];
// --- FIN DATOS DE EJEMPLO ---

function MenProductsPage() {
  return (
    <section className="productos-destacados-menpage">
      <h2>Ropa Hombre</h2>
      <div className="productos-grid-menpage">
        {/* Verifica si hay productos antes de mapear */}
        {menProducts && menProducts.length > 0 ? (
          menProducts.map((product) => (
            // Renderiza ProductCard para cada producto
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          // Mensaje si no hay productos (o si están cargando)
          <p>No hay productos disponibles en este momento.</p>
        )}
      </div>
    </section>
  );
}

export default MenProductsPage;
