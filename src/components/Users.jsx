import { useEffect, useState } from "react";
import '../style/Content.css';

function Users({ overrideUsers, onUserSelect }) {
  const [users, setUsers] = useState([]);

  const usersToRender = overrideUsers ?? users;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/all_users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="content-container">
      <div className="user-list">
        {Array.isArray(usersToRender) && usersToRender.length > 0 ? (
          usersToRender
            .filter(user => user.role !== "admin")
            .map(user => (
              <div
                className="user-item"
                key={user.id}
                onClick={() => {
                  console.log("Clicked user:", user);
                  onUserSelect && onUserSelect(user);
                }}
              >
                <div className="user-avatar" />
                <div className="user-details">
                  <div className="user-email">{user.email}</div>
                  <div className="user-subtitle">{user.full_name}</div>
                </div>
              </div>
          ))
        ) : (
          <p className="no-chats">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Users;
