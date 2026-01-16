import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/AdminEditUser.css";
import BackButton from "../../components/BackButton";

const BASE_URL = "https://campus-hall-backend.onrender.com/api";

function AdminEditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/auth/all`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => {
        const found = data.find(u => u._id === id);
        setUser(found);
      });
  }, [id, token]);

  const updateUser = async () => {
    const res = await fetch(`${BASE_URL}/auth/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(user)
    });

    const data = await res.json();
    setMessage(data.message);

    setTimeout(() => {
      navigate("/admin/users");
    }, 1200);
  };

  if (!user) return <p className="loading-text">Loading...</p>;

  return (
    <div className="edit-wrapper">

      <BackButton label="Manage Users" to="/admin/users" />

      <div className="edit-card">

        <h2 className="edit-title">Edit User</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            value={user.role}
            onChange={(e) =>
              setUser({ ...user, role: e.target.value })
            }
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {user.role === "student" && (
          <>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                value={user.department || ""}
                onChange={(e) =>
                  setUser({ ...user, department: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Position</label>
              <select
                value={user.position || ""}
                onChange={(e) =>
                  setUser({ ...user, position: e.target.value })
                }
              >
                <option value="">Select Position</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
              </select>
            </div>
          </>
        )}

        <button className="save-btn" onClick={updateUser}>
          Save Changes
        </button>

        {message && <p className="success-text">{message}</p>}

      </div>
    </div>
  );
}

export default AdminEditUser;
