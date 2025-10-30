import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import Footer from "../components/layout/Footer";

function GestionInventarioPage() {
  // Mock data for inventory
  const inventory = [
    {
      id: 1,
      name: "Polera Hombre",
      category: "Poleras",
      stock: 120,
      price: 3800,
    },
    {
      id: 2,
      name: "Poleron Mujer",
      category: "Polerones",
      stock: 80,
      price: 5300,
    },
    {
      id: 3,
      name: "Pantalon Hombre",
      category: "Pantalones",
      stock: 150,
      price: 4300,
    },
    {
      id: 4,
      name: "Polera Mujer",
      category: "Poleras",
      stock: 110,
      price: 3800,
    },
    {
      id: 5,
      name: "Pantalon Mujer",
      category: "Pantalones",
      stock: 90,
      price: 4300,
    },
    {
      id: 6,
      name: "Poleron Hombre",
      category: "Polerones",
      stock: 98,
      price: 5700,
    },
  ];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AdminHeader />
      <main className="container my-5" style={{ flex: 1 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Gestión de Inventario</h1>
          <button className="btn btn-primary">Añadir Producto</button>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.stock}</td>
                    <td>${item.price.toLocaleString("es-CL")}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        Editar
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        Eliminar
                      </button>
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

export default GestionInventarioPage;
