import { useState, useEffect } from "react";
import { getPurchases } from "../services/purchasesApi.js";
import { dateFormatter } from "../utils/dateformatter.js";
import { PurchaseCard } from "../components/PurchaseCard.jsx";
import "../assets/css/purchases.css";
import { Button } from "../components/Button.jsx";

export function Purchase() {
  const today = new Date().toISOString().split("T")[0];
  const [purchases, setPurchases] = useState([]);
  const [activesearchTerm, setActiveSearchTerm] = useState(today);
  const [showModal, setShowModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);


  useEffect(() => {
    getPurchases()
      .then((data) => {
        setPurchases(data);
      });
  }, []);


  
  
 
  return (
   <div className="purchases">
    <div className="purchases-header">
        <h1>Últimas compras</h1>
    </div>

    <div className="purchase-cards-container">
        {purchases.slice(0, 6).map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
        ))}
    </div>

     

      <div className="purchases-content ">
         <label htmlFor="search">Filtrar por Fecha:</label>
          <input className="search-input"
            type="date"
            id="search"
            value={activesearchTerm}
            placeholder="Buscar por fecha"
            onChange={(e) => setActiveSearchTerm(e.target.value)}
          />
          <button onClick={() => setActiveSearchTerm(activesearchTerm)}>Buscar</button>
<table className="purchases-table">
 
          
          
          <thead>
            <tr>
              <th>Compra</th>
              <th>Total Compra</th>
              <th>Método de Pago</th>
              <th>Fecha de Compra</th>
              <th>Detalles</th>
              {/* rectificacion( hacer un + - producto y actualizar total) */}
            </tr>
          </thead>
          <tbody>
            {purchases
              .filter((purchase) =>
                activesearchTerm === "" || purchase.purchase_date.includes(activesearchTerm)
              )
              .map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.id}</td>
                  <td>{purchase.total} €</td>
                  <td>{purchase.payment_method}</td>
                  <td>{dateFormatter(purchase.purchase_date)}</td>
                  <td>
                    <button onClick={() => { setSelectedPurchase(purchase); setShowModal(true); }}>Ver Detalles</button>
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
                          <h3>Vendedor: {selectedPurchase.document_id}</h3>
                            {selectedPurchase.purchase_details && selectedPurchase.purchase_details.map((detail, index) => (
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
