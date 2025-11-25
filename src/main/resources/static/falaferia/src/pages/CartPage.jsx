import React from 'react';

function CartPage({ cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout }) {
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const precio = item.producto ? item.producto.precio : 0;
      const cantidad = item.cantidad || 0;
      return total + (precio * cantidad);
    }, 0).toLocaleString('es-CL');
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Mi Carrito</h2>
      
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Tu carrito está vacío. Ve a comprar algo.
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cartItems.map(item => {
              const producto = item.producto || {}; 
              
              return (
                <div key={item.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img 
                        src={producto.imagenUrl} 
                        alt={producto.nombre} 
                        className="img-fluid rounded-start" 
                        style={{ height: "150px", objectFit: "contain", padding: "10px" }}
                        onError={(e) => e.target.src = "https://placehold.co/150?text=Sin+Foto"}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="card-text">
                          Precio: ${(producto.precio || 0).toLocaleString('es-CL')}
                        </p>
                        
                        <div className="d-flex align-items-center mb-2">
                          {/* BOTÓN RESTAR (-): Habilitado */}
                          <button 
                            className="btn btn-outline-secondary btn-sm" 
                            onClick={() => onUpdateQuantity(item, item.cantidad - 1)}
                          >
                            -
                          </button>
                          
                          <span className="mx-2 fw-bold">{item.cantidad}</span>
                          
                          {/* BOTÓN SUMAR (+): Habilitado */}
                          <button 
                            className="btn btn-outline-secondary btn-sm" 
                            onClick={() => onUpdateQuantity(item, item.cantidad + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => onRemoveFromCart(item.id)} 
                          className="btn btn-danger btn-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Resumen del Pedido</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center fw-bold fs-5">
                    Total
                    <span>${getTotalPrice()}</span>
                  </li>
                </ul>
                <button className="btn btn-success w-100 mt-3 fw-bold" onClick={onCheckout}>
                  Pagar / Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;