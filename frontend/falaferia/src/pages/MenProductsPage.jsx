import React, { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard";

function MenProductsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Petición al backend para traer solo ropa de hombre
    fetch("http://localhost:8080/api/productos/filtro/hombre")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Ropa Hombre</h2>
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
                // AQUÍ ESTÁ LA CORRECCIÓN SEGURA:
                brand: product.marca ? product.marca.nombre : "FalaFeria"
              }}
              onAddToCart={onAddToCart}
            />
          ))
        ) : (
          <div className="col w-100">
            <p className="text-center alert alert-info">Cargando ropa de hombre...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenProductsPage;