import "../assets/css/dashboard.css";
import { InfoCard } from "../components/InfoCard";
import { getDashboardData } from "../services/dashboardApi";
import { useEffect, useState } from "react";
import {createSeller} from "../services/sellerApi.js";
import{Button} from "../components/Button.jsx";
import { LoadingState } from "../components/LoadingState.jsx";

export function Dashboard() {

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [sellerForm, setSellerForm] = useState({
    name: "",
    document_id: "",
    phone: "",
    notes: ""
  });


  function handleSellerFormChange(e) {
    const { name, value } = e.target;
    setSellerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSellerFormSubmit() {
    createSeller(sellerForm)
      .then((response) => {
        console.log("Vendedor creado:", response);
        setShowSellerModal(false);
        setSellerForm({
          name: "",
          document_id: "",
          phone: "",
          notes: ""
        });
      })
      .catch((error) => {
        console.error("Error al crear vendedor:", error);
      });
  }

  useEffect(() => {
    getDashboardData()
      .then((data) => {
        setDashboardData(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos del dashboard:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); 

  if (isLoading) {
    return <LoadingState message="Cargando panel de control..." />;
  }
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel de Control</h1>
      </div>
      <div className="dashboard-content">
        {/* Métricas rápidas */}
        <div className="dashboard-cards">
          <InfoCard title="Ventas hoy" value={`${dashboardData?.totalSalesToday.toFixed(2) ?? "Cargando..."} €`}  icon="📊" />
          <InfoCard title="Compras hoy" value={`${dashboardData?.totalPurchasesToday.toFixed(2) ?? "Cargando..."} €`} icon="🛒" />
          <InfoCard title="Beneficio" value={`${dashboardData?.totalProfitToday.toFixed(2) ?? "Cargando..."} €`} icon="💰" />
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
                    <td>{`${operation.total ?? '0.00'} €`}</td>
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
             {dashboardData?.productsOutOfStock?.map((product) => (
                  <li key={product.id}>
                    {product.name}
                  </li>
                ))}
          </ul>
        </div>


  {showSellerModal && (
    <div className="modal">
     
      <div className="modal-content">
        <div className="modal-header">
          <h2>Registrar Vendedor</h2>
          <Button style="modal-close" onClick={() => setShowSellerModal(false)}>X</Button>
        </div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={sellerForm.name}
          onChange={handleSellerFormChange}
        />
        <label htmlFor="document_id">Documento:</label>
        <input
          type="text"
          id="document_id"
          name="document_id"
          value={sellerForm.document_id}
          onChange={handleSellerFormChange}
        />
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={sellerForm.phone}
          onChange={handleSellerFormChange}
        />
        <label htmlFor="notes">Notas:</label>
        <textarea
          id="notes"
          name="notes"
          value={sellerForm.notes}
          onChange={handleSellerFormChange}
        />

           <Button style="modal-add" onClick={handleSellerFormSubmit}>Añadir</Button>
      </div>
   
    </div>
  )}

        <div className="register-space">
          <div className="seller-register-space">
            <h3>Registrar Vendedor</h3>
            <Button style="modal-add" onClick={() => setShowSellerModal(true)}>Registrar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
