import React, { useEffect, useState } from "react";
import AdminHeader from "../components/layout/AdminHeader";
import Footer from "../components/layout/Footer";
import { getUsuarios, eliminarUsuario } from "../services/api";

function GestionClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarClientes = () => {
    setCargando(true);
    setError("");

    getUsuarios()
      .then((data) => {
        setClientes(data);
      })
      .catch((err) => {
        console.error("Error al cargar clientes:", err);
        setError("No se pudieron cargar los clientes.");
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este cliente?")) return;

    try {
      await eliminarUsuario(id);
      cargarClientes();
    } catch (err) {
      console.error("Error al eliminar cliente:", err);
      alert("Error al eliminar cliente: " + err.message);
    }
  };

  const handleEditar = (cliente) => {
    // Por ahora solo mostramos un alert.
    // Más adelante podrías abrir un modal o un formulario de edición.
    alert(`Aquí podrías editar al cliente: ${cliente.nombre || cliente.name}`);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AdminHeader />
      <main className="container my-5" style={{ flex: 1 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Gestión de Clientes</h1>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => alert("Funcionalidad de añadir cliente (opcional).")}
          >
            Añadir Cliente
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="card shadow-sm">
          <div className="card-body">
            {cargando ? (
              <p className="text-center">Cargando clientes...</p>
            ) : clientes.length === 0 ? (
              <p className="text-center">No hay clientes registrados.</p>
            ) : (
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
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <th scope="row">{cliente.id}</th>
                      <td>{cliente.nombre || cliente.name}</td>
                      <td>{cliente.email}</td>
                      <td>
                        {cliente.fechaRegistro ||
                          cliente.fechaCreacion ||
                          "-"}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEditar(cliente)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleEliminar(cliente.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default GestionClientesPage;
