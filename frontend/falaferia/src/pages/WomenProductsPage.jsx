import React, { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import { getProductosByCategoria } from "../services/api"; // 👈 usamos api.js

function WomenProductsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProductosByCategoria("mujer")
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error cargando ropa de mujer:", err);
        setError("No se pudo cargar la ropa de mujer.");
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Ropa Mujer</h2>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.nombre,
                price: product.precio,
                images: [product.imagenUrl],
                brand: product.marca ? product.marca.nombre : "FalaFeria",
              }}
              onAddToCart={onAddToCart}
            />
          ))
        ) : !error ? (
          <div className="col w-100">
            <p className="text-center alert alert-info">
              Cargando ropa de mujer...
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WomenProductsPage;
