import { Link } from "react-router-dom";
import { FaArrowLeft, FaUserCircle, FaEdit } from 'react-icons/fa'; 

import Search from './components/Search'; //*
import Sidebar from './components/Sidebar'; //*

import './style/Profile.css';

function Profile({ handleSignout }) {
  return (
    <div className="profile-page">
      <Sidebar handleSignout={handleSignout}/>
      <Search />
      <FaArrowLeft className="back-arrow" onClick={() => window.history.back()} />
      <div className="profile-info">
        <div className="profile-avatar-container">
          <FaUserCircle size={100} className="profile-avatar" />
          <Link to="/EditProfile">
          <button className="edit-avatar-btn" title="Edit Profile">
            <FaEdit className="edit-avatar-btn-icon"/>
          </button>
          </Link>
        </div>
        <h3>Full Name</h3>
        <p>Username</p>
        <p>0 Following</p>
      </div>
      <div className="tabs">
        <span className="active-tab">Created</span>
        <span>Saved</span>
      </div>
    </div>
  );
}

export default Profile;
