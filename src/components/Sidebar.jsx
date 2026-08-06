//import { CartSummary } from "./CartSummary";
import "../assets/css/sidebar.css";
import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Operaciones</h2>
      <ul>
        <button><NavLink to="/formsale" className="navbar-link">Venta</NavLink></button>
         
        <button><NavLink to="/formpurchase" className="navbar-link">Compra</NavLink></button>
        
      </ul>

      <h2>Administración</h2>
      <ul>
        <button>Usuarios</button>
        <button>Graficas</button>
      </ul>

  
      
    </div>
  );
}