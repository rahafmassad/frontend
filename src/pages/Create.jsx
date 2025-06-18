import { FaUserCircle, FaArrowLeft} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import Sidebar from '../components/Sidebar';

import '../style/Create.css';
import '../style/Profile.css';

function Create({ user, handleSignout }) {

const [formData, setFormData] = useState({ image: null, title: "", desc: "" });

const handleSubmit = async (e) => {
  e.preventDefault();

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result;

    const data = {
      user_id: user.user_id || user.id, //fallback in case one is undefined
      title: formData.title,
      description: formData.desc,
      type: "image",
      image: base64Image,
    };

    const res = await fetch("http://localhost:5000/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("Content saved", result);
  };

  if (formData.image) {
    reader.readAsDataURL(formData.image);
  }
};

  return (
    <div className="components"> 
      <Sidebar handleSignout={handleSignout}/>
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
