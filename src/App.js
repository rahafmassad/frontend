import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react"; //*

import Home from './Home';
import Create from './Create';
import Chat from './Chat';
import EditProfile from './EditProfile';
import Profile from './Profile';
import Welcome from './Welcome';
import Signup from './Signup';
import Signin from './Signin';
import AdminContent from './AdminContent';
import AdminUsers from './AdminUsers';

import UserContent from './components/UserContent';
import Content from './components/Content';
import ContentDisplay from "./ContentDisplay";

function App() {

  const [user, setUser] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetch(`http://localhost:5000/api/users/content/${userData.email}`)
        .then((res) => res.json())
        .then((data) => setContent(data));
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

  return (
    <><Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home handleSignout={handleSignout}/>} />
          <Route path="/Create" element={<Create onAdd={(newContent) => setContent((prev) => [...prev, newContent])} user={user} handleSignout={handleSignout}/>}/>
          <Route path="/Chat" element={<Chat handleSignout={handleSignout}/>} />
 page/editprofile
          <Route path="/EditProfile" element={<EditProfile handleSignout={handleSignout}/>} />

          <Route path="/EditProfile" element={<EditProfile user={user} handleSignout={handleSignout}/>} />
 main
          <Route path="/Profile" element={<Profile user={user} handleSignout={handleSignout}/>} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/Signup" element={<Signup onSignin={handleSignin} />} />
          <Route path="/Signin" element={<Signin onSignin={handleSignin} />} />
          <Route path="/Content" element={<Content />} />
          <Route path="/MyContent" element={<UserContent content={content} />} />
          <Route path="/content/:id" element={<ContentDisplay content={content} />} />
          <Route path="/AdminUsers" element={<AdminUsers handleSignout={handleSignout}/>} />
          <Route path="/AdminContent" element={<AdminContent handleSignout={handleSignout}/>} />
        </Routes>

      </div>
    </Router></>
  );
}

export default App;
