// src/pages/MenProductsPage.jsx
import React from "react";
import ProductCard from "../components/product/ProductCard";

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

function MenProductsPage({ onAddToCart }) {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Ropa Hombre</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {menProducts && menProducts.length > 0 ? (
          menProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        ) : (
          <div className="col">
            <p className="text-center">No hay productos disponibles en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenProductsPage;
