import { FaUserCircle, FaPaperPlane } from 'react-icons/fa';

import Sidebar from './components/Sidebar';

import './style/Chat.css';
import './style/Profile.css';

const Chat = ({ handleSignout }) => {
  return (
    <div className="components"> 
      <Sidebar handleSignout={handleSignout}/>

      <div className="chat-container">
        <div className="chat-main">
          <div className="chat-sidebar">
            <input type="text" placeholder="Search..." className="search-bar" />
            <div className="user-list">
              <div className="user">
                <FaUserCircle size={30} />
                <span>Full Name</span>
              </div>
              <div className="user">
                <FaUserCircle size={30} />
                <span>Full Name</span>
              </div>
              <p className="no-chats">no chats yet...</p>
            </div>
          </div>

          <div className="chat-window">
            <div className="chat-header">
              <FaUserCircle size={30} />
              <span>Full Name</span>
            </div>

            <div className="chat-messages">
              <div className="message message-left">Text</div>
              <div className="message message-right">Text</div>
            </div>

            <div className="chat-input">
              <input type="text" placeholder="Enter message" />
              <button className="send-button"><FaPaperPlane /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
