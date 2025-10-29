// src/pages/CartPage.jsx
import React from 'react';
import './CartPage.css';

function CartPage({ cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout }) {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('es-CL');
  };

  return (
    <div className="cart-page">
      <h2>Mi Carrito</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.images[0]} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price.toLocaleString('es-CL')}</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => onRemoveFromCart(item.id)} className="cart-item-remove">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Resumen del Pedido</h3>
            <p>Total: ${getTotalPrice()}</p>
            <button className="checkout-button" onClick={onCheckout}>Proceder al Pago</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
