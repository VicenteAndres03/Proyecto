import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import Footer from "../components/layout/Footer";

function GestionPedidosPage() {
  // Mock data for orders
  const orders = [
    { id: "ORD-001", customer: "Juan Perez", date: "2024-07-28", total: 45980, status: "Procesando" },
    { id: "ORD-002", customer: "Maria Garcia", date: "2024-07-27", total: 32990, status: "Enviado" },
    { id: "ORD-003", customer: "Pedro Rodriguez", date: "2024-07-26", total: 89970, status: "Entregado" },
    { id: "ORD-004", customer: "Ana Martinez", date: "2024-07-25", total: 17990, status: "Cancelado" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Procesando":
        return "bg-primary";
      case "Enviado":
        return "bg-info text-dark";
      case "Entregado":
        return "bg-success";
      case "Cancelado":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader />
      <main className="container my-5" style={{ flex: 1 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Gestión de Pedidos</h1>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID Pedido</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Total</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toLocaleString('es-CL')}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(order.status)}`}>{order.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">Ver Detalles</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default GestionPedidosPage;
