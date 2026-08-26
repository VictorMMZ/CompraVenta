import { getProducts } from "../services/productsApi.js";
import { useState, useEffect } from "react";
import "../assets/css/Stock.css";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productsApi.js";
import { Button } from "../components/Button.jsx";
import { stockRegex, commonRegex, validateByRegex } from "../utils/regexp.js";
import { LoadingState } from "../components/LoadingState.jsx";


export function Stock() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editShowModal, setEditShowModal] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [createShowModal, setCreateShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    model: "",
    serial_number: "",
    purchase_price: 0,
    sale_price: 0,
    category_id: "",
  });

  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    stock: "",
    price: "",
    description: "",
  });

  const validateCreateStockForm = (data) => {
    if (!validateByRegex(stockRegex.nombre, data.name)) {
      return "El nombre del producto no es valido.";
    }

    if (!validateByRegex(stockRegex.descripcion, data.description)) {
      return "La descripcion debe tener como maximo 300 caracteres.";
    }

    if (!validateByRegex(stockRegex.precio, data.price)) {
      return "El precio debe ser un numero valido con hasta 2 decimales.";
    }

    if (!validateByRegex(stockRegex.cantidad, data.stock)) {
      return "El stock debe ser un numero entero positivo.";
    }

    if (!validateByRegex(stockRegex.nombre, data.brand)) {
      return "La marca no es valida.";
    }

    if (!validateByRegex(stockRegex.nombre, data.model)) {
      return "El modelo no es valido.";
    }

    if (!validateByRegex(stockRegex.codigo, data.serial_number)) {
      return "El numero de serie no es valido.";
    }

    if (!validateByRegex(stockRegex.costo, data.purchase_price)) {
      return "El precio de compra no es valido.";
    }

    if (!validateByRegex(stockRegex.precio, data.sale_price)) {
      return "El precio de venta no es valido.";
    }

    if (!validateByRegex(commonRegex.id, data.category_id)) {
      return "La categoria debe ser un ID numerico valido.";
    }

    return null;
  };

  const validateUpdateStockForm = (data) => {
    if (!validateByRegex(stockRegex.nombre, data.name)) {
      return "El nombre del producto no es valido.";
    }

    if (!validateByRegex(stockRegex.cantidad, data.stock)) {
      return "El stock debe ser un numero entero positivo.";
    }

    if (!validateByRegex(stockRegex.precio, data.price)) {
      return "El precio debe ser un numero valido con hasta 2 decimales.";
    }

    if (!validateByRegex(stockRegex.descripcion, data.description)) {
      return "La descripcion debe tener como maximo 300 caracteres.";
    }

    return null;
  };
  

  const reloadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setProducts([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingState message="Cargando stock..." />;
  }

  return (
    <div className="stock">
      <div className="stock-header">
        <h1>Stock</h1>
      </div>
      <div className="stock-content">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="stock-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button style="stock-add-button" onClick={() => setCreateShowModal(true)}>
          Agregar producto
        </Button>

        {createShowModal && (
          <div className="popup-overlay">
            <div className="popup-modal popup-modal-create">
              <div className="popup-header">
                <h3>Agregar Producto</h3>
                <Button
                  style="popup-close"
                  onClick={() => setCreateShowModal(false)}
                >
                  ×
                </Button>
              </div>
              
              <div className="popup-body">
                <form>
                  <div className="field">
                    <label>Nombre Producto</label>
                    <input
                      type="text"
                      name="name"
                      value={createFormData.name}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Descripción</label>
                    <input
                      type="text"
                      name="description"
                      value={createFormData.description}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Precio</label>
                    <input
                      type="number"
                      name="price"
                      value={createFormData.price}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={createFormData.stock}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          stock: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Marca</label>
                    <input
                      type="text"
                      name="brand"
                      value={createFormData.brand}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          brand: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Modelo</label>
                    <input
                      type="text"
                      name="model"
                      value={createFormData.model}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          model: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Número de Serie</label>
                    <input
                      type="text"
                      name="serial_number"
                      value={createFormData.serial_number}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          serial_number: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Precio de Compra</label>
                    <input
                      type="number"
                      name="purchase_price"
                      value={createFormData.purchase_price}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          purchase_price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Precio de Venta</label>
                    <input
                      type="number"
                      name="sale_price"
                      value={createFormData.sale_price}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          sale_price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Categoría</label>
                    <input
                      type="text"
                      name="category_id"
                      value={createFormData.category_id}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          category_id: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
                <div id="modal-error" className="modal-error"></div>
              </div>

              <div className="popup-footer">
                <Button
                  style="close"
                  onClick={() => setCreateShowModal(false)}
                >
                  Cerrar
                </Button>
                <Button
                  style="save"
                  onClick={() => {
                    const validationError = validateCreateStockForm(createFormData);
                    if (validationError) {
                      document.getElementById("modal-error").innerHTML = validationError;
                      return;
                    }

                    createProduct(createFormData).then(() => {
                      setCreateShowModal(false);
                      reloadProducts();
                    });
                  }}
                >
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        )}
        {deleteShowModal && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <div className="popup-header">
                <h3>{selectedProduct?.name}</h3>

                <button
                  className="popup-close"
                  onClick={() => setDeleteShowModal(false)}
                >
                  x
                </button>
              </div>

              <div className="popup-body">
                <p>¿Estás seguro de que deseas eliminar este producto?</p>
                <Button
                  style="delete"
                  onClick={() =>
                    deleteProduct(selectedProduct.id).then(() => {
                      setDeleteShowModal(false);
                      reloadProducts();
                    })
                  }
                >
                  Si
                </Button>
                <Button style="close" onClick={() => setDeleteShowModal(false)}>No</Button>
              </div>
            </div>
          </div>
        )}

        {editShowModal && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <div className="popup-header">
                <h3>{selectedProduct?.name}</h3>
                <Button
                  style="popup-close"
                  onClick={() => setEditShowModal(false)}
                >
                  ×
                </Button>
              </div>

              <div className="popup-body">
                <form>
                  <label htmlFor="Name">Nombre Producto</label>
                  <input
                    type="text"
                    placeholder={selectedProduct?.name}
                    value={updateFormData.name}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        name: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="Stock">Stock del Producto</label>
                  <input
                    type="number"
                    placeholder={selectedProduct?.stock}
                    value={updateFormData.stock}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        stock: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="Price">Precio del Producto</label>
                  <input
                    type="number"
                    placeholder={selectedProduct?.price}
                    value={updateFormData.price}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        price: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="description">Descripción</label>
                  <input
                    type="text"
                    placeholder={selectedProduct?.description}
                    value={updateFormData.description}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        description: e.target.value,
                      })
                    }
                  />
                </form>
                    <div id="modal-error" className="modal-error"></div>
              </div>

              <div className="popup-footer">
                <Button
                  style="delete"
                  onClick={() => {
                    setDeleteShowModal(true);
                    setEditShowModal(false);
                  }}
                >
                  Eliminar
                </Button>
                <Button
                  style="close"
                  onClick={() => setEditShowModal(false)}
                >
                  Cerrar
                </Button>
                <Button
                  style="save"
                  onClick={() => {
                    const validationError = validateUpdateStockForm(updateFormData);
                    if (validationError) {
                      document.getElementById("modal-error").innerHTML = validationError;
                      return;
                    }

                    updateProduct(selectedProduct.id, updateFormData).then(() => {
                      setEditShowModal(false);
                      reloadProducts();
                    });
                  }}
                >
                  Guardar cambios
                </Button>
              </div>
            </div>
          </div>
        )}


        {}

        <table className="stock-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>ID</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.id}</td>
                  <td>{product.stock}</td>
                  <td>{product.price}€</td>
                  <td>{product.description}</td>
                  <td>
                    <Button
                      style="stock-edit-button"
                      onClick={() => {
                        setSelectedProduct(product);
                        setEditShowModal(true);
                        setUpdateFormData(product);
                      }}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
