import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import image from '../assets/makeup.avif';

import Content from '../components/Content';
import UserSearch from '../components/UserSearch';
import Sidebar from '../components/Sidebar';

import '../style/Home.css';
import '../style/Profile.css';
import '../style/Search.css';

const Home = ({ handleSignout }) => {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="components">
      <Sidebar handleSignout={handleSignout} />
      <UserSearch onResults={setSearchResults} />
      <Link to="/Profile" className="profile-icon"><FaUserCircle size={32} /></Link>

      <div className="home-container">
        <img src={image} alt="makeup" className="banner-image" />
        <Content overrideContent={searchResults?.content} user={JSON.parse(localStorage.getItem("user"))} />
      </div>
    </div>
  );
};

export default Home;
