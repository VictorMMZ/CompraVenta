import { NavLink } from 'react-router-dom';
import '../assets/css/Navbar.css';
import logo from '../assets/images/quickshop_lettering.svg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
            <img src={logo} alt="Logo" className="navbar-logo-text" />
        </div>

              <div className="user-info">
    <p>Usuario: {JSON.parse(sessionStorage.getItem('user')).name}</p>
</div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink to="/dashboard" className="navbar-link">Dashboard</NavLink>
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


    </nav>
  );
};

export default Navbar;
