import { useState } from 'react';
import "../assets/css/formpurchase.css";
import { getProducts } from '../services/productsApi.js';
import { useEffect } from 'react';
import { getSellers } from '../services/sellerApi.js';

export function FormPurchase() {
   const [purchaseForm, setPurchaseForm] = useState({
        user_id: '',
        document_id: '',
        total: '',
        payment_method: ''
    });

    const [products, setProducts] = useState([]);
    const [productSearch, setProductSearch] = useState('');
    const [showProductForm, setShowProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        brand: '',
        model: '',
        serial_number: '',
        description: '',
        purchase_price: '',
        sale_price: '',
        price: '',
        category_id: ''
    });

    const handlePurchaseChange = (e) => {
        const { name, value } = e.target;
        setPurchaseForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price) {
            setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
            setNewProduct({
                name: '',
                brand: '',
                model: '',
                serial_number: '',
                description: '',
                purchase_price: '',
                sale_price: '',
                price: '',
                category_id: ''
            });
            setShowProductForm(false);
        }
    };

    const handleRemoveProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const handleSubmitPurchase = (e) => {
        e.preventDefault();
        console.log('Compra:', purchaseForm);
        console.log('Productos:', products);
    };

    return (
        <div className="form-purchase-container">
            <h1>Formulario de Compra</h1>

            <form onSubmit={handleSubmitPurchase}>
                <div className="purchase-form-section">
                    <h2>Datos de Compra</h2>
                    
                    <div className="form-group">
                        <label htmlFor="user_id">Usuario ID:</label>
                        <input
                            type="number"
                            id="user_id"
                            name="user_id"
                            value={purchaseForm.user_id}
                            onChange={handlePurchaseChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="document_id">Documento del Vendedor:</label>
                        <input
                            type="number"
                            id="document_id"
                            name="document_id"
                            value={purchaseForm.document_id}
                            onChange={handlePurchaseChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="payment_method">Método de Pago:</label>
                        <select
                            id="payment_method"
                            name="payment_method"
                            value={purchaseForm.payment_method}
                            onChange={handlePurchaseChange}
                            required
                        >
                            <option value="">Seleccionar método</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                            <option value="transferencia">Transferencia</option>
                            <option value="cheque">Cheque</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="total">Total:</label>
                        <input
                            type="number"
                            id="total"
                            name="total"
                            step="0.01"
                            value={purchaseForm.total}
                            onChange={handlePurchaseChange}
                            required
                        />
                    </div>
                </div>

                <div className="products-section">
                    <h2>Productos</h2>

                    <div className="product-search">
                        <input
                            type="text"
                            placeholder="Buscar producto existente..."
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                        />
                    </div>

                    {products.length > 0 && (
                        <div className="products-list">
                            <h3>Productos Agregados:</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Precio</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.brand}</td>
                                            <td>{product.model}</td>
                                            <td>${product.price}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveProduct(product.id)}
                                                    className="btn-remove"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!showProductForm && (
                        <button
                            type="button"
                            onClick={() => setShowProductForm(true)}
                            className="btn-add-product"
                        >
                            Agregar Producto
                        </button>
                    )}

                    {showProductForm && (
                        <div className="product-form-section">
                            <h3>Crear Nuevo Producto</h3>

                            <div className="form-group">
                                <label htmlFor="name">Nombre:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleProductChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="brand">Marca:</label>
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    value={newProduct.brand}
                                    onChange={handleProductChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="model">Modelo:</label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={newProduct.model}
                                    onChange={handleProductChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="serial_number">Número de Serie:</label>
                                <input
                                    type="text"
                                    id="serial_number"
                                    name="serial_number"
                                    value={newProduct.serial_number}
                                    onChange={handleProductChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Descripción:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleProductChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="purchase_price">Precio de Compra:</label>
                                <input
                                    type="number"
                                    id="purchase_price"
                                    name="purchase_price"
                                    step="0.01"
                                    value={newProduct.purchase_price}
                                    onChange={handleProductChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sale_price">Precio de Venta:</label>
                                <input
                                    type="number"
                                    id="sale_price"
                                    name="sale_price"
                                    step="0.01"
                                    value={newProduct.sale_price}
                                    onChange={handleProductChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Precio:</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    step="0.01"
                                    value={newProduct.price}
                                    onChange={handleProductChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_id">Categoría:</label>
                                <input
                                    type="number"
                                    id="category_id"
                                    name="category_id"
                                    value={newProduct.category_id}
                                    onChange={handleProductChange}
                                    required
                                />
                            </div>

                            <div className="form-buttons">
                                <button
                                    type="button"
                                    onClick={handleAddProduct}
                                    className="btn-confirm"
                                >
                                    Agregar Producto
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowProductForm(false)}
                                    className="btn-cancel"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn-submit">
                        Registrar Compra
                    </button>
                </div>
            </form>
        </div>
    );
}