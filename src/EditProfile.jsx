import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import Search from './components/Search';
import Sidebar from './components/Sidebar';

import './style/Create.css';
import './style/Profile.css';

function EditProfile({ user, handleSignout }) {
  const [formData, setFormData] = useState({
    profile_picture: null,
    full_name: user?.full_name || "",
    email: user?.email || "",
    username: user?.username || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert("User not found. Please sign in again.");
      return;
    } //hi
    const dataToSend = new FormData();

    dataToSend.append("email", formData.email);
    dataToSend.append("username", formData.username);
    dataToSend.append("full_name", formData.full_name);
    if (formData.profile_picture) {
      dataToSend.append("profile_picture", formData.profile_picture);
    }

    fetch(`http://localhost:5000/api/users/${user.id}`, {
      method: "PUT",
      body: dataToSend,
    })
      .then((res) => res.json())
      .then((updated) => {
        localStorage.setItem("user", JSON.stringify(updated.user));
        alert("Profile updated!");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Update failed.");
      });
  };

  return (
    <div className="components"> 
      <Sidebar handleSignout={handleSignout} />
      <Search />
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
