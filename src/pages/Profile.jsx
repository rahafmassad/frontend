import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaUserCircle, FaEdit } from 'react-icons/fa'; 

import Sidebar from '../components/Sidebar';

import '../style/Profile.css';

function Profile({ user, handleSignout }) {

const [activeTab, setActiveTab] = useState("created");
const [savedContent, setSavedContent] = useState([]);
const [createdContent, setCreatedContent] = useState([]);

useEffect(() => {
  const userId = user?.user_id || user?.id;
  if (!userId) return;

  const fetchCreated = async () => {
    try {
      console.log("Fetching created content for user_id:", userId);

      const res = await fetch(`http://localhost:5000/api/content/created/${userId}`);
      const data = await res.json();

      setCreatedContent(data);
    } catch (err) {
      console.error("Error fetching created content:", err);
    }
  };

  fetchCreated();
}, [user]);

useEffect(() => {
  const userId = user?.user_id || user?.id;
  if (activeTab !== "saved" || !userId) return;

  const fetchSaved = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/content/saved/${userId}`);
      const data = await res.json();

      setSavedContent(data);
    } catch (err) {
      console.error("Error fetching saved content:", err);
    }
  };

  fetchSaved();
}, [activeTab, user]);

const handleSaveContent = async (contentId) => {
  try {
    const userId = user?.user_id || user?.id;
    const res = await fetch(`http://localhost:5000/api/content/save/${contentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    });

    const result = await res.json();

  } catch (err) {
    console.error("Save content failed:", err);
  }
};

  return (
    <div className="profile-page">
      {console.log("User object:", user)}
      
      <Sidebar handleSignout={handleSignout} />
      <FaArrowLeft className="back-arrow" onClick={() => window.history.back()} />
      
      <div className="profile-info">
        <div className="profile-avatar-container">
          {
            user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="profile"
                className="profile-avatar"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            ) : (
              <FaUserCircle size={100} className="profile-avatar" />
            )
          }
          <Link to="/EditProfile">
            <button className="edit-avatar-btn" title="Edit Profile">
              <FaEdit className="edit-avatar-btn-icon" />
            </button>
          </Link>
        </div>
        <h3>{user?.full_name || "Full Name"}</h3>
        <p>{user?.username || "Username"}</p>
      </div>

        <div className="tabs">
          <span
            className={activeTab === "created" ? "active-tab" : ""}
            onClick={() => setActiveTab("created")}
          >
            Created
          </span>
          <span
            className={activeTab === "saved" ? "active-tab" : ""}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </span>
        </div>

      <div className="content-grid">
        {(activeTab === "created" ? createdContent : savedContent).length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No {activeTab} content yet.
          </p>
        ) : (
          (activeTab === "created" ? createdContent : savedContent).map((item) => (
            <div key={item.content_id} className="content-card" style={{ position: "relative" }}>
              <img src={item.image} alt={item.title} />
              {activeTab === "created" && (
                <button
                  className="heart-button"
                  onClick={() => handleSaveContent(item.content_id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "pink"
                  }}
                >
                  ♥
                </button>
              )}
              <p>{item.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
