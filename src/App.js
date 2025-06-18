import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react"; 

import Home from './pages/Home';
import Create from './pages/Create';
import Chat from './pages/Chat';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import AdminContent from './pages/AdminContent';
import AdminUsers from './pages/AdminUsers';

import Content from './components/Content';

function App() {

  const [user, setUser] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);

        fetch(`http://localhost:5000/api/users/content/${userData.email}`)
          .then((res) => res.json())
          .then((data) => setContent(data));
      }
    } catch (err) {
      console.error("Failed to load user from localStorage:", err.message);
      localStorage.removeItem("user"); 
      setUser(null);
    }
  }, []);

  const handleSignin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    fetch(`http://localhost:5000/api/users/content/${userData.email}`)
      .then((res) => res.json())
      .then((data) => setContent(data));
  };

  const handleSignout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setContent([]);
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <><Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={ user ? <Home handleSignout={handleSignout} /> : <Navigate to="/Welcome" />}/>
          <Route path="/Create" element={<Create onAdd={(newContent) => setContent((prev) => [...prev, newContent])} user={user} handleSignout={handleSignout}/>}/>
          <Route path="/Chat" element={<Chat user={user} handleSignout={handleSignout}/>} />
          <Route path="/EditProfile" element={<EditProfile user={user} handleSignout={handleSignout} onUpdate={handleUserUpdate} />} />
          <Route path="/Profile" element={<Profile user={user} handleSignout={handleSignout}/>} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/Signup" element={<Signup onSignin={handleSignin} />} />
          <Route path="/Signin" element={<Signin onSignin={handleSignin} />} />
          <Route path="/Content" element={<Content />} />
          <Route path="/AdminUsers" element={<AdminUsers handleSignout={handleSignout}/>} />
          <Route path="/AdminContent" element={<AdminContent handleSignout={handleSignout}/>} />
        </Routes>
      </div>
    </Router></>
  );
}

export default App;
