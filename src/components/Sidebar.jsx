//import { CartSummary } from "./CartSummary";
import "../assets/css/sidebar.css";
import { NavLink } from 'react-router-dom'
import {logout} from "../services/authApi";

export function Sidebar() {
  const sessionUser = sessionStorage.getItem("user");
  let isAdministrator = false;

  try {
    const user = sessionUser ? JSON.parse(sessionUser) : null;
    isAdministrator = user?.role?.toLowerCase() === "administrador";
  } catch {
    isAdministrator = false;
  }

  return (
    <div className="sidebar">
      <h2>Operaciones</h2>
      <ul>
        <button><NavLink to="/formsale" className="sidebar-link">Venta</NavLink></button>
        <button><NavLink to="/formpurchase" className="sidebar-link">Compra</NavLink></button>
      </ul>

      
        {isAdministrator && (
          <>
            <h2>Administración</h2>
            <button><NavLink to="/users" className="sidebar-link">Usuarios</NavLink></button>
          </>
        )}
        
      

      <button className="logout-button"><NavLink to="/" className="sidebar-link" onClick={logout}>Cerrar Sesion</NavLink></button>
      
    </div>
  );
}