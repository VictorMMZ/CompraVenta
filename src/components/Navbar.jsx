import { NavLink } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
            <img src="./src/assets/quickshop_logo.svg" alt="Logo" className="navbar-logo-image" />
            <img src="./src/assets/quickshop_lettering.svg" alt="Logo" className="navbar-logo-text" />
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink to="/" className="navbar-link">Dashboard</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/purchase" className="navbar-link">Purchases</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/sale" className="navbar-link">Sales</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/stock" className="navbar-link">Stock</NavLink>
          </li>
        </ul>
      </div>

      <div className="user-info">
    <p>Usuario: Victor</p>
</div>
    </nav>
  );
};

export default Navbar;
