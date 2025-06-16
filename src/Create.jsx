import { FaUserCircle, FaArrowLeft} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import { v4 as uuidv4 } from 'uuid'; //remove in backend

import Search from './components/Search';
import Sidebar from './components/Sidebar';

import './style/Create.css';
import './style/Profile.css';

function Create({ onAdd, user, handleSignout }) {

  const [formData, setFormData] = useState({ image: null, title: "", desc: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.image) {
    onAdd({ id: uuidv4(), image: formData.image, title: formData.title, desc: formData.desc, creator: user.username});
    setFormData({ image: null, title: "", desc: "" });
    e.target.reset();
    }
  };

  return (
    <div className="components"> 
      <Sidebar handleSignout={handleSignout}/>
      <Search />
      <Link to="/Profile" className="profile-icon"><FaUserCircle size={32} /></Link>
    <div className="create-page">
      <FaArrowLeft className="back-arrow" onClick={() => window.history.back()} />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Content</label>
            <input type="file" className="form-control file-input" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} required />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" placeholder="Enter title..." value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required/>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input type="text" className="form-control" placeholder="Enter description..." value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} required/>
          </div>

          <button type="submit" className="submit-button">CREATE</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Create;
