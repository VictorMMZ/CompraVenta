import "../assets/css/dashboard.css";
import { InfoCard } from "../components/InfoCard";
import { getDashboardData } from "../services/dashboardApi";
import { useEffect, useState } from "react";

export function Dashboard() {

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    getDashboardData()
      .then((data) => {
        setDashboardData(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos del dashboard:", error);
      });
  }, []); // <-- Add this line to close the useEffect hook
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel de Control</h1>
      </div>
      <div className="dashboard-content">
        {/* Métricas rápidas */}
        <div className="dashboard-cards">
          <InfoCard title="Ventas hoy" value={dashboardData?.totalSalesToday ?? "Cargando..."} icon="📊" />
          <InfoCard title="Compras hoy" value={dashboardData?.totalPurchasesToday ?? "Cargando..."} icon="🛒" />
          <InfoCard title="Beneficio" value={dashboardData?.totalProfitToday ?? "Cargando..."} icon="💰" />
          <InfoCard title="Stock bajo" value={dashboardData?.productsWithLowStock?.length ?? "Cargando..."} icon="⚠️" />
        </div>

        {/* Fila de tablas */}
        <div className="dashboard-tables">
          <div className="dashboard-table-container">
            <h2>Últimas Operaciones</h2>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Metodo de Pago</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.lastoperations?.map((operation) => (
                  <tr key={operation.id}>
                    <td>{operation.type === 'sale' ? 'Venta' : 'Compra'}</td>
                    <td>{operation.payment_method ?? ''}</td>
                    <td>{operation.total ?? '0 €'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertas */}
        <div className="dashboard-alerts">
          <h2>⚠️ Productos sin stock</h2>
          <ul>
            <li>Producto A</li>
            <li>Producto B</li>
            <li>Producto C</li>
          </ul>
        </div>

        <div className="register-space">
          <div className="seller-register-space">
            <h3>Registrar Vendedor</h3>
            <button>Registrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
