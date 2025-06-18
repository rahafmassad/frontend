import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import Sidebar from '../components/Sidebar';

import '../style/Create.css';
import '../style/Profile.css';

function EditProfile({ user, handleSignout, onUpdate }) {

  const [formData, setFormData] = useState({
    email: user?.email || "",
    username: user?.username || "",
    full_name: user?.full_name || "",
    profile_picture: null
  });

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!user || !user.id) {
      alert("User not found. Please sign in again.");
      return;
    } 

    const dataToSend = {
      email: formData.email,
      username: formData.username,
      full_name: formData.full_name,
      profile_picture: formData.profile_picture
    };

    fetch(`http://localhost:5000/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
      
    })

    .then(async (res) => {
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Update failed.");
      }
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
        onUpdate(result.user);
        alert("Profile updated!");
      } else {
        throw new Error("No user returned.");
      }
    })
    
    .catch((err) => {
      console.error("Update failed:", err);
      alert("Update failed.");
    });
  };

  return (
    <div className="components"> 
      <Sidebar handleSignout={handleSignout} />
      <Link to="/Profile" className="profile-icon"><FaUserCircle size={32} /></Link>

      <div className="create-page">
        <FaArrowLeft className="back-arrow" onClick={() => window.history.back()} />
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Profile Image</label>
              <input
                type="file"
                className="form-control file-input"
                onChange={(e) => setFormData({ ...formData, profile_picture: e.target.files[0] })}
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name..."
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email..."
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username..."
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="submit-button">UPDATE</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
