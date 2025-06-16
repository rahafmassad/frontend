import { FaUserCircle } from "react-icons/fa"; //*
import { Link } from "react-router-dom"; //*

import image from './assets/makeup.avif';

import Content from './components/Content';
import Search from './components/Search'; //*
import Sidebar from './components/Sidebar'; //*

import './style/Home.css';
import './style/Profile.css'; //*

const Home = ({ handleSignout }) => {
  return (
    <div className="components"> 
      <Sidebar handleSignout={handleSignout}/>
      <Search />
      <Link to="/Profile" className="profile-icon"><FaUserCircle size={32} /></Link>
      <div className="home-container">
        <img src={image} alt="makeup" className="banner-image" />
        <Content />
      </div>
    </div>
  );
};


export default Home;