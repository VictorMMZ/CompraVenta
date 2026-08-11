import { useState, useEffect } from "react";
import "../assets/css/formpurchase.css";
import { getProducts } from "../services/productsApi.js";
import { createPurchase } from "../services/purchasesApi.js";
import { createProduct } from "../services/productsApi.js";
import { getSellers } from "../services/sellerApi.js";

export function FormPurchase() {
  const [purchaseForm, setPurchaseForm] = useState({
    user_id: "",
    document_id: "",
    total: 0,
    payment_method: "",
    purchase_date: new Date().toISOString().split("T")[0],
  });
  const [products, setProducts] = useState([]); 
  const [sellers, setSellers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingSellers, setIsLoadingSellers] = useState(false);
  const [productsError, setProductsError] = useState("");
  const [sellersError, setSellersError] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    model: "",
    serial_number: "",
    description: "",
    purchase_price: "",
    sale_price: "",
    price: "",
    category_id: "",
  });

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingProducts(true);
      setProductsError("");
      try {
        const data = await getProducts();
        const normalizedProducts = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];
        setProducts(normalizedProducts);
      } catch (error) {
        setProducts([]);
        setProductsError("No se pudieron cargar los productos.");
        console.error(error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const loadSellers = async () => {
      setIsLoadingSellers(true);
      setSellersError("");
      try {
        const data = await getSellers();
        const normalizedSellers = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];
        setSellers(normalizedSellers);
      } catch (error) {
        setSellers([]);
        setSellersError("No se pudieron cargar los vendedores.");
        console.error(error);
      } finally {
        setIsLoadingSellers(false);
      }
    };

    loadSellers();
  }, []);

  const handleProductSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    (product?.name || "")
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase()),
  );
  // Añadir producto existente al carrito
  const handleSelectProduct = (product) => {
    const exists = selectedProducts.find((p) => p.id === product.id);
    if (exists) {
      setSelectedProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        ),
      );
    } else {
      setSelectedProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    const newTotal = parseFloat(
      (purchaseForm.total + parseFloat(product.purchase_price)).toFixed(2),
    );
    setPurchaseForm((prev) => ({ ...prev, total: newTotal }));

    setSearchTerm("");
  };

  // Eliminar producto del carrito
  const handleRemoveProduct = (id) => {
    const product = selectedProducts.find((p) => p.id === id);
    const newTotal = parseFloat(
      (
        purchaseForm.total -
        parseFloat(product.purchase_price) * product.quantity
      ).toFixed(2),
    );
    setPurchaseForm((prev) => ({ ...prev, total: newTotal }));
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePurchaseChange = (e) => {
    const { name, value } = e.target;
    setPurchaseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Añadir producto nuevo al carrito
  const handleAddNewProduct = () => {
    if (newProduct.name && newProduct.purchase_price) {
      const product = {
        ...newProduct,
        id: Date.now(),
        quantity: 1,
        isNewProduct: true,
      };
      setSelectedProducts((prev) => [...prev, product]);
      const newTotal = parseFloat(
        (purchaseForm.total + parseFloat(newProduct.purchase_price)).toFixed(2),
      );
      setPurchaseForm((prev) => ({ ...prev, total: newTotal }));
      setNewProduct({
        name: "",
        brand: "",
        model: "",
        serial_number: "",
        description: "",
        purchase_price: "",
        sale_price: "",
        price: "",
        category_id: "",
      });
      setShowProductForm(false);
    }
  };

  const handleSubmitPurchase = async (e) => {
    e.preventDefault();
    try {
      const resolvedProducts = await Promise.all(
        selectedProducts.map(async (product) => {
          if (!product.isNewProduct) {
            return product;
          }

          const productPayload = {
            name: product.name,
            brand: product.brand || null,
            model: product.model || null,
            serial_number: product.serial_number || null,
            description: product.description || null,
            purchase_price: Number(product.purchase_price),
            sale_price: Number(
              product.sale_price || product.price || product.purchase_price,
            ),
            price: Number(
              product.price || product.sale_price || product.purchase_price,
            ),
            category_id: Number(product.category_id),
            stock: 0,
          };

          const createdProduct = await createProduct(productPayload);
          return { ...createdProduct, quantity: product.quantity };
        }),
      );

      const purchaseDetails = resolvedProducts.map((product) => {
        const quantity = Number(product.quantity);
        const productPrice = Number(product.purchase_price);
        const productSubtotal = Number((productPrice * quantity).toFixed(2));

        return {
          product_id: product.id,
          product_name: product.name,
          quantity,
          product_price: Number(productPrice.toFixed(2)),
          unit_price: Number(productPrice.toFixed(2)),
          product_subtotal: productSubtotal,
          subtotal: productSubtotal,
        };
      });

      const payload = {
        ...purchaseForm,
        document_id: purchaseForm.document_id.trim().toUpperCase(),
        total: parseFloat(purchaseForm.total.toFixed(2)),
        purchaseDetails,
      };

      const createdPurchase = await createPurchase(payload);
      console.log("Compra creada correctamente:", createdPurchase);

      setSelectedProducts([]);
      setSearchTerm("");
    } catch (error) {
      console.error("No se pudo crear la compra:", error.message);
    }
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
            <select
              id="document_id"
              name="document_id"
              value={purchaseForm.document_id}
              onChange={handlePurchaseChange}
              required
            >
              <option value="">Seleccionar vendedor</option>
              {sellers.map((seller) => (
                <option key={seller.id} value={seller.document_id}>
                  {seller.document_id} - {seller.name}
                </option>
              ))}
            </select>
            {isLoadingSellers && <small>Cargando vendedores...</small>}
            {!isLoadingSellers && sellersError && <small>{sellersError}</small>}
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
        </div>

        <div className="products-section">
          <h2>Productos</h2>

          {/* Buscador */}
          <div className="product-search">
            <input
              type="text"
              value={searchTerm}
              onChange={handleProductSearch}
              placeholder="Buscar producto..."
            />

            {searchTerm.trim() !== "" && (
              <ul className="search-results">
                {isLoadingProducts && <li>Cargando productos...</li>}
                {!isLoadingProducts && productsError && (
                  <li>{productsError}</li>
                )}
                {!isLoadingProducts &&
                  !productsError &&
                  filteredProducts.length === 0 && (
                    <li>No se encontraron productos.</li>
                  )}
                {!isLoadingProducts &&
                  !productsError &&
                  filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => {
                        handleSelectProduct(product);
                        setSearchTerm("");
                      }}
                    >
                      {product.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Carrito */}
          {selectedProducts.length > 0 && (
            <div className="products-list">
              <h3>Productos Agregados:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>

                    <th>Cantidad</th>
                    <th>Precio Compra</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{parseFloat(product.purchase_price).toFixed(2)} €</td>
                      <td>
                        {(product.purchase_price * product.quantity).toFixed(2)}{" "}
                        €
                      </td>
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
              <div className="total-section">
                <h3>Total: {purchaseForm.total.toFixed(2)} €</h3>
              </div>
            </div>
          )}

          {!showProductForm && (
            <button
              type="button"
              onClick={() => setShowProductForm(true)}
              className="btn-add-product"
            >
              Crear Nuevo Producto
            </button>
          )}

          {showProductForm && (
            <div className="product-form-section">
              <h3>Crear Nuevo Producto</h3>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Marca:</label>
                <input
                  type="text"
                  name="brand"
                  value={newProduct.brand}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group">
                <label>Modelo:</label>
                <input
                  type="text"
                  name="model"
                  value={newProduct.model}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group">
                <label>Número de Serie:</label>
                <input
                  type="text"
                  name="serial_number"
                  value={newProduct.serial_number}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group">
                <label>Precio de Compra:</label>
                <input
                  type="number"
                  name="purchase_price"
                  step="0.01"
                  value={newProduct.purchase_price}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio de Venta:</label>
                <input
                  type="number"
                  name="sale_price"
                  step="0.01"
                  value={newProduct.sale_price}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group">
                <label>Precio:</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={newProduct.price}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categoría:</label>
                <input
                  type="number"
                  name="category_id"
                  value={newProduct.category_id}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div className="form-buttons">
                <button
                  type="button"
                  onClick={handleAddNewProduct}
                  className="btn-confirm"
                >
                  Agregar
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
