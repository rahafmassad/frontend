import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../style/Signin.css";
import logo from "../assets/MMM.png";

const Signin = ({ onSignin }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signin = async (e) => {

    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      onSignin(data.user);

      if (data.user.role === "admin") {
        navigate("/AdminUsers");
      } else {
        navigate("/");
      }

    } else {
      alert(data.message);
    }
  };

  return (
    <div className="signin-page">
      <img src={logo} alt="Makeup Muse Logo" className="signin-logo" />
      
      <div className="signin-form-container">
        <h2 className="signin-title">Sign In</h2>

        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="text" placeholder="Enter email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="signin-button" onClick={signin}>Sign In</button>
        </form>

        <p className="redirect-text">
          DON'T HAVE AN ACCOUNT? <br />
          <Link to="/Signup" className="signup-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
