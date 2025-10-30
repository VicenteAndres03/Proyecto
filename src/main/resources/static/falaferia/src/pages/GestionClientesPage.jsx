import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import Footer from "../components/layout/Footer";

function GestionClientesPage() {
  // Mock data for customers
  const customers = [
    {
      id: 1,
      name: "Juan Perez",
      email: "juan.perez@gmail.com",
      registrationDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@gmail.com",
      registrationDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Pedro Rodriguez",
      email: "pedro.rodriguez@gmail.com",
      registrationDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Ana Martinez",
      email: "ana.martinez@gmail.com",
      registrationDate: "2023-04-05",
    },
  ];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AdminHeader />
      <main className="container my-5" style={{ flex: 1 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Gestión de Clientes</h1>
          <button className="btn btn-primary">Añadir Cliente</button>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Fecha de Registro</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <th scope="row">{customer.id}</th>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.registrationDate}</td>
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

export default GestionClientesPage;
