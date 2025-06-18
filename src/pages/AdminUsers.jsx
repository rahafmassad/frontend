import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import '../style/AdminUsers.css';

import Search from '../components/AdminSearch';
import AdminSidebar from '../components/AdminSidebar';

const AdminUsers = ({ handleSignout }) => {
  const [users, setUsers] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/api/users/all', {
    headers: { "x-role": "admin" }
  })
    .then(res => res.json())
    .then(data => setUsers(data.users))
    .catch(err => console.error('Failed to fetch users:', err));
}, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {

      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: { "x-role": "admin" }
      });

      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="users-page-container">
      <AdminSidebar handleSignout={handleSignout}/>
      <Search onResults={(data) => {setUsers(data.users);}} />
      <div className="user-list">
        {users
          .filter(user => user.role !== "admin")
          .map(user => (
            <div className="user-item" key={user.id}>
              <div className="user-avatar" />
              <div className="user-details">
                <div className="user-email">{user.email}</div>
                <div className="user-subtitle">Subtitle</div>
              </div>
              <FaTrash className="delete-icon" onClick={() => handleDelete(user.id)} title="Delete User"/>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
