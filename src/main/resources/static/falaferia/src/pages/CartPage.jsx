// src/pages/CartPage.jsx
import React from 'react';

function CartPage({ cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout }) {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('es-CL');
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Mi Carrito</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Tu carrito está vacío.
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cartItems.map(item => (
              <div key={item.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={item.images[0]} alt={item.name} className="img-fluid rounded-start" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Precio: ${item.price.toLocaleString('es-CL')}</p>
                      <div className="d-flex align-items-center mb-2">
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => onRemoveFromCart(item.id)} className="btn btn-danger btn-sm">Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Resumen del Pedido</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Subtotal
                    <span>${getTotalPrice()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                    Total
                    <span>${getTotalPrice()}</span>
                  </li>
                </ul>
                <button className="btn btn-primary w-100 mt-3" onClick={onCheckout}>Proceder al Pago</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
