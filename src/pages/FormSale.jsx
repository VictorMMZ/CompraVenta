import { useState,useEffect } from "react";

import "../assets/css/formsale.css";
import { getProducts } from '../services/productsApi.js';
import { createSale } from '../services/salesApi.js';
import { Button } from "../components/Button.jsx";
export function FormSale() {
  const [formData, setFormData] = useState({
    customer_id: "",
    user_id: JSON.parse(sessionStorage.getItem("user"))?.id || "",
    total: 0,
    payment_method: "",
    notes: "",
     sale_date: new Date().toISOString().split('T')[0]
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    const newTotal = formData.total + product.price;
    setFormData((prev) => ({
      ...prev,
      total: parseFloat(newTotal.toFixed(2)),
    }));
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      setFormData((prev) => ({
        ...prev,
        total: parseFloat((prev.total - item.price * item.quantity).toFixed(2)),
      }));
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', JSON.stringify({
        ...formData,
        saleDetails: cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price
        }))
    }));
    createSale({
      ...formData,
      saleDetails: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price
      }))
    })
    .then((response) => {
      console.log("Venta creada exitosamente:", response);
      setFormData({
        customer_id: "",
        user_id: JSON.parse(sessionStorage.getItem("user"))?.id || "",
        total: 0,
        payment_method: "",
        notes: "",
        sale_date: new Date().toISOString().split('T')[0],
      });
      setCartItems([]);
    })
    .catch((error) => {
      console.error("Error al crear la venta:", error);
    });
  };

  return (
    <div className="form-sale-container">
      <h1>Formulario de Venta</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Datos de la Venta</h2>

          <div className="form-group">
            <label htmlFor="customer_id">Cliente:</label>
            <input
              type="number"
              id="customer_id"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleInputChange}
              placeholder="ID del Cliente (opcional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="user_id">Usuario:</label>
            <input
              type="number"
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              placeholder="ID del Usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="payment_method">Método de Pago:</label>
            <select
              id="payment_method"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar método de pago</option>
              <option value="cash">Efectivo</option>
              <option value="card">Tarjeta</option>
              <option value="transfer">Transferencia</option>
              <option value="check">Cheque</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notas:</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Notas adicionales (opcional)"
              rows="3"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Buscar y Agregar Productos</h2>

       <div className="search-group">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Buscar producto..."
  />

  {searchTerm.trim() !== "" && (
    <ul className="search-results">
      {products
        .filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(product => (
          <li
            key={product.id}
            onClick={() => {
              addToCart(product);
              setSearchTerm("");
            }}
          >
            {product.name}
          </li>
        ))}
    </ul>
  )}
</div>
        </div>

        <div className="form-section">
          <h2>Carrito</h2>

          <table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="btn-remove"
                      >
                        Eliminar
                      </button>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (item.quantity > 1) {
                            const updatedItem = { ...item, quantity: item.quantity - 1 };
                            setCartItems((prev) =>
                              prev.map((cartItem) =>
                                cartItem.id === item.id ? updatedItem : cartItem
                              )
                            );
                            const newTotal = formData.total - item.price;
                            setFormData((prev) => ({
                              ...prev,
                              total: parseFloat(newTotal.toFixed(2)),
                            }));
                          }
                        }}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-cart">
                    Carrito vacío
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="total-section">
            <h3>Total: ${formData.total.toFixed(2)}</h3>
          </div>
        </div>

        <Button style="btn-submit" onClick={handleSubmit} >
          Completar Venta
        </Button>
      </form>
    </div>
  );
}
