// frontend/falaferia/src/components/Footer.jsx
import { useEffect, useState } from "react";
import { getIndicadores } from "../services/api";

export default function Footer() {
  const [indicadores, setIndicadores] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelado = false;

    const cargar = async () => {
      try {
        const data = await getIndicadores(); // mindicador.cl
        if (!cancelado) setIndicadores(data);
      } catch (e) {
        if (!cancelado) setError("No se pudieron cargar los indicadores.");
        console.error(e);
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargar();
    return () => {
      cancelado = true;
    };
  }, []);

  const formatCL = (n) =>
    typeof n === "number"
      ? n.toLocaleString("es-CL", { minimumFractionDigits: 2 })
      : "-";

  const fecha = indicadores?.fecha ? new Date(indicadores.fecha) : null;

  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
          <div>
            <h6 className="mb-2">Indicadores Económicos</h6>

            {cargando && <small className="text-muted">Cargando…</small>}

            {error && (
              <small className="text-danger d-block">{error}</small>
            )}

            {!cargando && !error && indicadores && (
              <ul className="list-unstyled mb-0">
                <li>
                  <strong>UF:</strong>{" "}
                  {formatCL(indicadores.uf?.valor)}
                </li>
                <li>
                  <strong>Dólar:</strong>{" "}
                  {formatCL(indicadores.dolar?.valor)}
                </li>
                {fecha && (
                  <li className="text-muted">
                    <small>
                      Actualizado:&nbsp;
                      {fecha.toLocaleDateString("es-CL")}
                    </small>
                  </li>
                )}
              </ul>
            )}
          </div>

          <div className="text-md-end">
            <h6 className="mb-2">FalaFeria</h6>
            <small className="d-block">© {new Date().getFullYear()} FalaFeria</small>
            <small className="d-block">Todos los derechos reservados</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
