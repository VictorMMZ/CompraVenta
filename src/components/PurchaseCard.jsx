import { useState } from 'react';
import { dateFormatter } from "../utils/dateformatter.js";

export function PurchaseCard({ purchase }) {
    const [showModal, setShowModal] = useState(false);

    return (
        
        <div className="sales-card">
         <div className="card-inner">
            <h3>Compra: {purchase.id}</h3>
            <p>Fecha: {dateFormatter(purchase.purchase_date)}</p>
            <p>Total: {purchase.total} €</p>
            <p>Método de pago: {purchase.payment_method}</p>
            <button onClick={() => setShowModal(true)}>Ver detalles</button>
            </div>

            
            
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Vendedor: {purchase.document_id}</h2>
                        <h2>Productos</h2>
                        <ul>
                            {purchase.purchase_details && purchase.purchase_details.map((detail, index) => (
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