import { SaleCard } from "../components/SaleCard.jsx";
import "../assets/css/sales.css";
import { useState, useEffect } from "react";
import { getSales} from "../services/salesApi.js";
import { dateFormatter } from "../utils/dateformatter.js";
import { Button } from "../components/Button.jsx";
import { LoadingState } from "../components/LoadingState.jsx";


export function Sales() {


 const today = new Date().toISOString().split("T")[0];
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activesearchTerm, setActiveSearchTerm] = useState(today);
  const [showModal, setShowModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

 
  useEffect(() => {
    getSales()
      .then((data) => {
        setSales(data);
      })
      .catch((error) => {
        console.error("Error al obtener las ventas:", error);
        setSales([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingState message="Cargando ventas..." />;
  }

 
  return (
   <div className="sales">
    <div className="sales-header">
        <h1>Últimas ventas</h1>
    </div>

    <div className="purchase-cards-container">
        {sales.slice(0, 6).map((sale) => (
            <SaleCard key={sale.id} sale={sale} />
        ))}
    </div>

     

      <div className="sales-content ">
         <label htmlFor="search">Filtrar por Fecha:</label>
          <input className="search-input"
            type="date"
            id="search"
            value={activesearchTerm}
            placeholder="Buscar por fecha"
            onChange={(e) => setActiveSearchTerm(e.target.value)}
          />
          <button onClick={() => setActiveSearchTerm(activesearchTerm)}>Buscar</button>
<table className="sales-table">
 
          
          
          <thead>
            <tr>
              <th>Venta</th>
              <th>Total Venta</th>
              <th>Método de Pago</th>
              <th>Fecha de Venta</th>
              <th>Detalles</th>
              {/* rectificacion( hacer un + - producto y actualizar total) */}
            </tr>
          </thead>
          <tbody>
            {sales
             .filter((sale) =>
        activesearchTerm === "" || sale.sale_date.includes(activesearchTerm)
    )
              .map((sales) => (
                <tr key={sales.id}>
                  <td>{sales.id}</td>
                  <td>{sales.total} €</td>
                  <td>{sales.payment_method}</td>
                  <td>{dateFormatter(sales.sale_date)}</td>
                  <td>
                    <button onClick={() => { setSelectedSale(sales); setShowModal(true); }}>Ver Detalles</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

 {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        
                        <h2>Productos</h2>
                        <ul>
                            {selectedSale.sale_details && selectedSale.sale_details.map((detail, index) => (
                                <li key={index}>ID: {detail.product_id} Nombre : {detail.product?.name} - {detail.unit_price} € - Cantidad: {detail.quantity} - Subtotal: {detail.subtotal} €</li>
                            ))}
                        </ul>
                        <Button style="close" onClick={() => setShowModal(false)}>Cerrar</Button>
                    </div>
                  
                </div>
            )}
      </div>
    </div>


  );
}
