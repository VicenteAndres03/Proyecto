import React, { useState } from "react";
import "./ProductCard.css"; // Estilos específicos para la tarjeta

// El componente recibe 'product' como prop (propiedad),
// que es un objeto con toda la información del producto.
function ProductCard({ product }) {
  // Estado para guardar el índice de la imagen actual del carrusel.
  // Empieza en 0 (la primera imagen).
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Verificamos si el producto y sus imágenes existen antes de usarlos.
  // Si no hay imágenes, usamos un array vacío para evitar errores.
  const images = product?.images || [];
  const totalImages = images.length;

  // --- Funciones para manejar el carrusel ---
  const nextImage = (e) => {
    e.stopPropagation(); // Evita que otros clicks (como el de la tarjeta) se activen
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages); // Va a la siguiente, vuelve a 0 al final
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
    ); // Va a la anterior, va a la última desde 0
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index); // Va a una imagen específica (usado por los puntos indicadores)
  };

  // --- Función para añadir al carrito (simulada por ahora) ---
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita que el click active la navegación si la tarjeta fuera un link
    console.log(`Añadiendo ${product.name} al carrito`);
    alert(`"${product.name}" añadido al carrito (simulación)`);
    // Aquí conectarías con tu lógica de estado global o contexto del carrito
  };

  // Si no recibimos un producto válido, no mostramos nada.
  if (!product) {
    return null;
  }

  // --- Renderizado del componente ---
  return (
    // Div principal de la tarjeta
    <div className="product-card-item">
      {/* Sección del carrusel */}
      <div className="product-carousel-item">
        <div className="images-container-item">
          {/* Si no hay imágenes, muestra un placeholder */}
          {images.length === 0 ? (
            <div className="image-product-item active">
              {/* Puedes poner una imagen placeholder aquí */}
              <span>Imagen no disponible</span>
            </div>
          ) : (
            // Si hay imágenes, las mapeamos
            images.map((imgSrc, index) => (
              <div
                key={index}
                // Añade la clase 'active' solo a la imagen actual
                className={`image-product-item ${
                  index === currentImageIndex ? "active" : ""
                }`}
              >
                {/* Mostramos la imagen */}
                <img
                  src={imgSrc}
                  alt={`${product.name} ${index + 1}`}
                  loading="lazy"
                />
                {/* Muestra etiqueta de envío gratis si existe en los datos del producto */}
                {product.freeShipping && (
                  <div className="envio-gratis-item">Envío gratis</div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Botones y puntos del carrusel (solo si hay más de 1 imagen) */}
        {totalImages > 1 && (
          <>
            <button
              className="carousel-btn-item prev"
              onClick={prevImage}
              aria-label="Imagen anterior"
            >
              ❮
            </button>
            <button
              className="carousel-btn-item next"
              onClick={nextImage}
              aria-label="Siguiente imagen"
            >
              ❯
            </button>
            <div className="indicadores-product-item">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`indicador-item ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={(e) => goToImage(index, e)}
                  aria-label={`Ir a imagen ${index + 1}`}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Sección de información del producto */}
      <div className="product-info-item">
        {/* Muestra la marca si existe, si no, usa 'FalaFeria' */}
        <div className="marca-item">{product.brand || "FalaFeria"}</div>
        {/* Nombre del producto */}
        <h3>{product.name}</h3>
        {/* Vendedor (si existe) */}
        {product.seller && (
          <div className="por-falaferia-item">
            Por {product.seller} <span className="icon">🏷️</span>
          </div>
        )}
        {/* Precio */}
        <div className="precio-item">
          <span className="precio-actual-item">{`$${product.price.toLocaleString(
            "es-CL"
          )}`}</span>{" "}
          {/* Formato chileno */}
          {/* Muestra el descuento si existe */}
          {product.discount && (
            <span className="descuento-item">{product.discount}</span>
          )}
        </div>
        {/* Botón para añadir al carrito */}
        <button className="btn-agregar-carrito-item" onClick={handleAddToCart}>
          🛒 Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
