import { useState } from 'react';
import { dateFormatter } from "../utils/dateformatter.js";

export function SaleCard({ sale }) {
    const [showModal, setShowModal] = useState(false);

    return (
        
        <div className="sales-card">
         <div className="card-inner">
            <h3>Venta: {sale.id}</h3>
            <p>Fecha: {dateFormatter(sale.sale_date)}</p>
            <p>Total: {sale.total} €</p>
            <p>Método de pago: {sale.payment_method}</p>
            <button onClick={() => setShowModal(true)}>Ver detalles</button>
            </div>

            
            
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        
                        <h2>Productos</h2>
                        <ul>
                            {sale.sale_details && sale.sale_details.map((detail, index) => (
                                <li key={index}>ID: {detail.product_id} Nombre : {detail.product?.name} - {detail.unit_price} € - Cantidad: {detail.quantity} - Subtotal: {detail.subtotal} €</li>
                            ))}
                        </ul>
                        <button className="close" onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                  
                </div>
            )}
        </div>
    );
}