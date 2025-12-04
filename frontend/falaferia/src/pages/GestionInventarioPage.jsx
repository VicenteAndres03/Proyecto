import React, { useState, useEffect } from "react";
import AdminHeader from "../components/layout/AdminHeader";
import Footer from "../components/layout/Footer";
import { API_URL } from "../services/api";


// 👇 importamos las funciones desde api.js
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProductoApi,
} from "../services/api";

function GestionInventarioPage() {
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagenUrl: "/Ropa/Logo.png",
    categoriaId: "1",
    marcaId: "1",
    envioGratis: false,
    condicion: "Nuevo",
  });

  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    setError("");
    getProductos()
      .then((data) => {
        setProductos(data);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setError("No se pudieron cargar los productos.");
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // --- FUNCIÓN PARA CARGAR DATOS AL FORMULARIO (EDITAR) ---
  const cargarParaEditar = (producto) => {
    setEditandoId(producto.id);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagenUrl: producto.imagenUrl,
      categoriaId: producto.categoria ? producto.categoria.id.toString() : "1",
      marcaId: producto.marca ? producto.marca.id.toString() : "1",
      envioGratis: producto.envioGratis,
      condicion: producto.condicion || "Nuevo",
    });
    window.scrollTo(0, 0);
  };

  // --- CANCELAR EDICIÓN ---
  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      imagenUrl: "/Ropa/Logo.png",
      categoriaId: "1",
      marcaId: "1",
      envioGratis: false,
      condicion: "Nuevo",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const productoParaEnviar = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseInt(formData.precio),
      imagenUrl: formData.imagenUrl,
      categoria: { id: parseInt(formData.categoriaId) },
      marca: { id: parseInt(formData.marcaId) },
      envioGratis: formData.envioGratis,
      condicion: formData.condicion,
    };

    try {
      if (editandoId) {
        await actualizarProducto(editandoId, productoParaEnviar);
        alert("Producto actualizado!");
      } else {
        await crearProducto(productoParaEnviar);
        alert("Producto creado!");
      }
      cargarProductos();
      cancelarEdicion();
    } catch (err) {
      console.error("Error al guardar producto:", err);
      alert("Error al guardar el producto: " + err.message);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este producto?")) return;

    try {
      await eliminarProductoApi(id);
      cargarProductos();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("Error al eliminar el producto: " + err.message);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AdminHeader />

      <main className="container my-5" style={{ flex: 1 }}>
        <h1 className="mb-4">Gestión de Inventario</h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* FORMULARIO */}
        <div
          className={`card p-4 mb-4 shadow-sm ${
            editandoId ? "border-primary" : "bg-light"
          }`}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className={editandoId ? "text-primary" : ""}>
              {editandoId ? "Editando Producto" : "Añadir Nuevo Producto"}
            </h4>
            {editandoId && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={cancelarEdicion}
              >
                Cancelar Edición
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Fecha Ingreso</label>
              <input
                type="date"
                className="form-control"
                name="fechaIngreso"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
              >
                <option value="1">Hombre</option>
                <option value="2">Mujer</option>
              </select>
            </div>

            {/* RADIO BUTTONS */}
            <div className="col-md-6">
              <label className="form-label d-block">Condición</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condicion"
                  id="c1"
                  value="Nuevo"
                  checked={formData.condicion === "Nuevo"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="c1">
                  Nuevo
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condicion"
                  id="c2"
                  value="Usado"
                  checked={formData.condicion === "Usado"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="c2">
                  Usado
                </label>
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-center">
              <div className="form-check form-switch fs-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="envioGratis"
                  id="env"
                  checked={formData.envioGratis}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="env">
                  Envío Gratis
                </label>
              </div>
            </div>

            <div className="col-md-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                rows="2"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">URL Imagen</label>
              <input
                type="text"
                className="form-control"
                name="imagenUrl"
                value={formData.imagenUrl}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className={`btn w-100 fw-bold ${
                  editandoId ? "btn-primary" : "btn-success"
                }`}
              >
                {editandoId ? "Actualizar Cambios" : "Guardar Producto"}
              </button>
            </div>
          </form>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Img</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Detalles</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <th>{p.id}</th>
                    <td>
                      <img
                        src={p.imagenUrl}
                        width="40"
                        alt="mini"
                        onError={(e) => (e.target.style.display = "none")}
                        className="rounded"
                      />
                    </td>
                    <td>{p.nombre}</td>
                    <td className="fw-bold">${p.precio}</td>
                    <td>
                      <small>
                        {p.condicion} • {p.envioGratis ? "Gratis" : "Pago"}
                        <br />
                        {p.categoria ? p.categoria.nombre : "-"}
                      </small>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => cargarParaEditar(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminarProducto(p.id)}
                        >
                          Eliminar
                        </button>
                      </div>
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
