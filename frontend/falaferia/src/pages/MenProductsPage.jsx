import React, { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import { getProductosByCategoria } from "../services/api"; 

function MenProductsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProductosByCategoria("hombre")
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error cargando ropa de hombre:", err);
        setError("No se pudo cargar la ropa de hombre.");
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Ropa Hombre</h2>

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
              Cargando ropa de hombre...
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MenProductsPage;
