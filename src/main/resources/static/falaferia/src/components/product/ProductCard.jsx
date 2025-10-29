import React, { useEffect, useRef } from "react";
import { Carousel } from 'bootstrap';

function ProductCard({ product, onAddToCart }) {
  if (!product) {
    return null;
  }

  const { id, name, brand, price, discount, images, freeShipping, seller } = product;
  const carouselId = `carousel-${id}`;
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = new Carousel(carouselRef.current, {
        interval: 3000, // Optional: set interval
        ride: 'carousel'
      });
    }
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="col mb-4">
      <div className="card h-100">
        {images && images.length > 0 ? (
          <div id={carouselId} ref={carouselRef} className="carousel slide">
            <div className="carousel-inner">
              {images.map((imgSrc, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img src={imgSrc} className="d-block w-100" alt={`${name} ${index + 1}`} />
                  {freeShipping && <div className="badge bg-success position-absolute top-0 end-0 m-2">Envío gratis</div>}
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <>
                <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
            <span>Imagen no disponible</span>
          </div>
        )}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{brand || "FalaFeria"}</p>
          {seller && <p className="card-text"><small className="text-muted">Vendido por {seller}</small></p>}
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text fs-5 fw-bold mb-0">{`${price.toLocaleString("es-CL")}`}</p>
            {discount && <span className="badge bg-danger">{discount}</span>}
          </div>
        </div>
        <div className="card-footer bg-transparent border-top-0">
          <button className="btn btn-primary w-100" onClick={handleAddToCart}>
            🛒 Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
