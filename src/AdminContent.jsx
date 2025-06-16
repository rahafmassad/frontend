import React, { useState, useEffect } from 'react';
import './style/AdminContent.css';
import { FaTrashAlt } from 'react-icons/fa';
import Search from './components/Search';
import AdminSidebar from './components/AdminSidebar';

const AdminContent = ({ handleSignout }) => {
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/content/all", {
          headers: {
            "x-role": "admin"
          }
        });
        const data = await res.json();
        setContentList(data || []); 
      } catch (err) {
        console.error("❌ Failed to fetch content:", err);
        setContentList([]);
      }
    };

    fetchContent();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this content?");
    if (confirmed) {
      try {
        await fetch(`http://localhost:5000/api/content/${id}`, {
          method: "DELETE",
          headers: {
            "x-role": "admin"
          }
        });
        setContentList(prev => prev.filter(item => item.content_id !== id));
      } catch (err) {
        console.error("❌ Failed to delete content:", err);
      }
    }
  };

  return (
    <div className="admin-content-page">
      <AdminSidebar handleSignout={handleSignout} />
      <Search onResults={(data) => {
        setContentList(data.content);
      }} />
      <div className="content-grid">
        {Array.isArray(contentList) && contentList.map(item => (
          <div key={item.content_id} className="content-card">
            <img src={item.image} alt={item.title} className="content-image" />
            <div className="content-footer">
              <span className="content-name">{item.title}</span>
              <FaTrashAlt className="content-delete" onClick={() => handleDelete(item.content_id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContent;
