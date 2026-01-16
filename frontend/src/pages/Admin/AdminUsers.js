import { useEffect, useState } from "react";
import "../../styles/AdminUsers.css";
import BackButton from "../../components/BackButton";

const BASE_URL = "https://campus-hall-backend.onrender.com/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/auth/all`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [token]);

  const deleteUser = async (id) => {
    const res = await fetch(`${BASE_URL}/auth/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();
    setMessage(data.message);
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="admin-page">

      {/* 🔙 BACK BUTTON */}
      <BackButton label="Admin Dashboard" />

      <div className="admin-header">
        <h1>Manage Users</h1>

        <a href="/admin/users/add" className="add-user-btn">
          + Add User
        </a>
      </div>

      {message && <p className="success-text">{message}</p>}

      <div className="users-grid">
        {users.map(u => (
          <div key={u._id} className="user-card">

            <div className="user-top">
              <h3 className="user-name">{u.name}</h3>
              <span className="role-chip">{u.role}</span>
            </div>

            <p className="user-email">{u.email}</p>

            {u.department && (
              <p className="user-meta">
                <strong>Department:</strong> {u.department}
              </p>
            )}

            {u.position && (
              <p className="user-meta">
                <strong>Position:</strong> {u.position}
              </p>
            )}

            <div className="user-actions">
              <a href={`/admin/users/edit/${u._id}`} className="edit-btn">
                Edit
              </a>

              <button
                className="delete-btn"
                onClick={() => deleteUser(u._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
