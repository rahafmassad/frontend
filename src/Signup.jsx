import { Link } from "react-router-dom";
import "./style/Signup.css";
import logo from "./assets/MMM.png";
import { useState } from "react";

const Signup = ({ onSignin }) => {

  const [fullName, setFullName] = useState(""); //check schema
  const [username, setUsername] = useState(""); //check schema
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {

    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      onSignin(data.user); 
      window.location.href = "/";
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <img src={logo} alt="Makeup Muse Logo" className="signup-logo" />
      
      <div className="signup-form-container">
        <h2 className="signup-title">Sign Up</h2>

        <form onSubmit={signup}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter full name..." value={fullName}
          onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter username..." value={username}
          onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email..." value={email}
          onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password..." value={password}
          onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="signup-button" type="submit">Sign Up</button>
        </form>

        <p className="redirect-text">
          ALREADY HAVE AN ACCOUNT? <br />
          <Link to="/Signin" className="signin-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
