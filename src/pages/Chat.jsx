import { useEffect, useState } from "react";
import { FaUserCircle, FaPaperPlane } from 'react-icons/fa';

import Sidebar from '../components/Sidebar';
import UserSearch from '../components/UserSearch';
import Users from '../components/Users';

import '../style/Chat.css';
import '../style/Profile.css';

const Chat = ({ handleSignout }) => {

  const [searchResults, setSearchResults] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const user = JSON.parse(saved);

      setCurrentUser({
        ...user,
        user_id: user.user_id || user.id
      });
    }
  }, []);

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    fetch(`http://localhost:5000/api/chat/${currentUser.user_id}/${selectedUser.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Initial messages loaded:", data.messages);
        setMessages(data.messages || []);
      })
      .catch(err => console.error("Failed to fetch messages:", err));
  }, [currentUser, selectedUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!currentUser || !selectedUser) return;

      fetch(`http://localhost:5000/api/chat/${currentUser.user_id}/${selectedUser.id}`)
        .then(res => res.json())
        .then(data => setMessages(data.messages || []));
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentUser, selectedUser]);

  const handleSend = async () => {
    if (!newMessage.trim() || !currentUser || !selectedUser) return;

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: currentUser.user_id,
          receiver_id: selectedUser.id,
          message: newMessage
        })
      });

      const result = await res.json();
      setMessages(prev => [...prev, result.chat]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="components">
      
      <Sidebar handleSignout={handleSignout} />
      <div className="chat-container">
        <div className="chat-main">
          <div className="chat-sidebar">
            <UserSearch onResults={setSearchResults} className="search-bar"/>
            
            <Users
              overrideUsers={searchResults?.users}
              onUserSelect={setSelectedUser}
            />
          </div>

          <div className="chat-window">
            <div className="chat-header">
              <FaUserCircle size={30} />
              <span>{selectedUser?.full_name || selectedUser?.username || "Select a user"}</span>
            </div>

            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.sender_id === currentUser?.user_id ? "message-right" : "message-left"}`}
                >
                  {msg.message}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Enter message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button className="send-button" onClick={handleSend}><FaPaperPlane /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
