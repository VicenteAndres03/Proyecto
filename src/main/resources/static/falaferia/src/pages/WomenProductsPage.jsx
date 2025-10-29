// src/pages/WomenProductsPage.jsx
import React from "react";
import ProductCard from "../components/product/ProductCard"; // Importa el componente reutilizable

// --- DATOS DE EJEMPLO PARA MUJER ---
// En una aplicación real, estos datos vendrían de tu API (backend)
// ¡Verifica que las rutas de las imágenes sean correctas!
const womenProducts = [
  {
    id: "M-POLERON-01", // ID único para el producto
    name: "Poleron Mujer talla M",
    brand: "FALAFERIA",
    price: 5300,
    images: [
      // Array de rutas a las imágenes
      // Asegúrate que estas rutas funcionen desde tu proyecto React
      "/src/assets/Ropa/Poleron Mujer/Poleron1M.webp",
      "/src/assets/Ropa/Poleron Mujer/Poleron2M.webp",
      "/src/assets/Ropa/Poleron Mujer/Poleron3M.webp",
      "/src/assets/Ropa/Poleron Mujer/Poleron4M.webp",
    ],
    freeShipping: true, // Si aplica envío gratis
    seller: "FalaFeria", // Vendedor
  },
  {
    id: "M-POLERA-01",
    name: "Polera Mujer talla M",
    brand: "FalaFeria",
    price: 3800,
    images: [
      "/src/assets/Ropa/Polera Mujer/Polera1M.webp",
      "/src/assets/Ropa/Polera Mujer/Polera2M.webp",
      "/src/assets/Ropa/Polera Mujer/Polera3M.webp",
      "/src/assets/Ropa/Polera Mujer/Polera4M.webp",
    ],
    freeShipping: true,
    seller: "FalaFeria",
  },
  {
    id: "M-PANTALON-01",
    // Corregido nombre basado en contexto, HTML original decía "Pantalos Hombre"
    name: "Pantalon Mujer talla M",
    brand: "FalaFeria",
    price: 4300,
    images: [
      "/src/assets/Ropa/Pantalon Mujer/Pantalon1M.webp",
      "/src/assets/Ropa/Pantalon Mujer/Pantalon2M.webp",
      "/src/assets/Ropa/Pantalon Mujer/Pantalon3M.webp",
      "/src/assets/Ropa/Pantalon Mujer/Pantalon4M.webp",
      // Nota: El HTML original tenía 5 indicadores pero solo 4 imágenes. Usamos 4.
    ],
    freeShipping: true,
    seller: "FalaFeria",
  },
  // Puedes añadir más productos aquí si los tienes
];
// --- FIN DATOS DE EJEMPLO ---

function WomenProductsPage({ onAddToCart }) {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Ropa Mujer</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {womenProducts && womenProducts.length > 0 ? (
          womenProducts.map((product) => (
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

export default WomenProductsPage;
