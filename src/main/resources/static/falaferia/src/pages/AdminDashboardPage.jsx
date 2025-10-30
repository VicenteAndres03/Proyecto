import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import Footer from "../components/layout/Footer";

function AdminDashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader />
      <main className="container my-5" style={{ flex: 1 }}>
        <div className="p-5 text-center bg-light rounded-3">
          <h1 className="text-dark">Bienvenido al Panel de Administración</h1>
          <p className="lead">
            Desde aquí podrás gestionar los productos, pedidos, clientes y el inventario de la tienda.
          </p>
          <p>Selecciona una de las opciones del menú de navegación para comenzar.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboardPage;
