import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import Search from './components/Search';
import Sidebar from './components/Sidebar';

import './style/Create.css';
import './style/Profile.css';

function EditProfile({ user, handleUpdate, handleSignout }) {
  const [formData, setFormData] = useState({
    image: null,
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
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
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name..."
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
