import {getProducts} from '../services/products.js';
import { useState, useEffect } from 'react';
import '../assets/Stock.css';

export function Stock() {

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  return (
    <div className="stock">
       <div className="stock-header">
        <h1>Stock</h1>
      </div>
      <div className="stock-content">
        <input type="text" placeholder="Buscar producto..." className="stock-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="stock-add-button" >Agregar producto</button>
        <table className="stock-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                    <button className="stock-edit-button">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}