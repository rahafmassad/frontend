import { Link } from "react-router-dom";
import { FaUsers, FaFolderOpen, FaSignOutAlt } from "react-icons/fa";
import '../style/Sidebar.css';
import logo from '../assets/logo.png';

function AdminSidebar({ handleSignout }) {

    const signout = () => {
      handleSignout();       
      window.location.href = "/Welcome";
    };

  return (
    <div className="sidebar">
      <img src={logo} alt="logo" className="logo"/>
      <div className="divider" />

      <nav className="nav-links">
        <Link to="/AdminUsers" className="icon-link" title="Users"><FaUsers /></Link>
        <Link to="/AdminContent" className="icon-link" title="Content"><FaFolderOpen /></Link>
        <button className="icon-link logout-btn" onClick={signout} title="Signout">
          <FaSignOutAlt />
        </button>
      </nav>
    </div>
  );
}

export default AdminSidebar;
