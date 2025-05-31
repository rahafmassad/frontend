import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaComment, FaCog } from "react-icons/fa"; //*
import '../style/Sidebar.css';
import logo from '../assets/logo.png';

function Sidebar() {
  return (
      <div className="sidebar">
        <img src={logo} alt="logo" className="logo"/>
        <div className="divider" />
        <nav className="nav-links">
          <Link to="/" className="icon-link"><FaHome /></Link>
          <Link to="/create" className="icon-link"><FaPlus /></Link>
          <Link to="/chat" className="icon-link"><FaComment /></Link>
          <Link to="/settings" className="icon-link"><FaCog /></Link>
        </nav>
      </div>
  );
}

export default Sidebar;
