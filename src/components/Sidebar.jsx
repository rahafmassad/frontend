import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaComment, FaSignOutAlt } from "react-icons/fa"; 
import '../style/Sidebar.css';
import logo from '../assets/logo.png';

function Sidebar({ handleSignout }) {

    const signout = () => {
      handleSignout();       
      window.location.href = "/Welcome";
    };

  return (
    <div className="sidebar">

      <img src={logo} alt="logo" className="logo"/>
      <div className="divider" />

      <nav className="nav-links">
        <Link to="/" className="icon-link"><FaHome /></Link>
        <Link to="/create" className="icon-link"><FaPlus /></Link>
        <Link to="/chat" className="icon-link"><FaComment /></Link>
        <button className="icon-link logout-btn" onClick={signout} title="Signout">
          <FaSignOutAlt />
        </button>
      </nav>

    </div>
  );
}

export default Sidebar;
