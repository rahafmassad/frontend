import "../style/Welcome.css";
import logoImage from "../assets/makeupmuse.png";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <img src={logoImage} alt="Makeup Muse Logo" className="logo-img" />

      <div className="button-group">
        <Link to="/Signup" className="custom-btn">Sign Up</Link>
        <Link to="/Signin" className="custom-btn">Sign In</Link>
      </div>

      <footer className="footer-text">
        © 2025 Makeup Muse. All rights reserved.<br />
        Unauthorized use and/or duplication of this material without express and written permission
        from Makeup Muse is strictly prohibited.
      </footer>
    </div>
  );
};

export default WelcomePage;
