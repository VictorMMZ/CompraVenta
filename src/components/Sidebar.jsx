//import { CartSummary } from "./CartSummary";
import "../assets/css/sidebar.css";
import { NavLink } from 'react-router-dom'
import {logout} from "../services/authApi";

export function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Operaciones</h2>
      <ul>
        <button><NavLink to="/formsale" className="sidebar-link">Venta</NavLink></button>
        <button><NavLink to="/formpurchase" className="sidebar-link">Compra</NavLink></button>
      </ul>

      <h2>Administración</h2>
      <ul>
        <button><NavLink to="/users" className="sidebar-link">Usuarios</NavLink></button>
        <button><NavLink to="/charts" className="sidebar-link">Graficas</NavLink></button>
      </ul>

      <button className="logout-button"><NavLink to="/" className="sidebar-link" onClick={logout}>Cerrar Sesion</NavLink></button>
      
    </div>
  );
}