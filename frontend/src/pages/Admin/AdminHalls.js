import { useEffect, useState } from "react";
import "../../styles/AdminHalls.css";
import BackButton from "../../components/BackButton";

const BASE_URL = "https://campus-hall-backend.onrender.com/api";

function AdminHalls() {
  const [halls, setHalls] = useState([]);
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${BASE_URL}/halls`)
      .then((res) => res.json())
      .then((data) => setHalls(data));
  }, []);

  const addHall = async () => {
    if (!name.trim()) return;

    const res = await fetch(`${BASE_URL}/halls/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ name })
    });

    const data = await res.json();
    alert(data.message);
    window.location.reload();
  };

  const deleteHall = async (id) => {
    const res = await fetch(`${BASE_URL}/halls/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();
    alert(data.message);
    window.location.reload();
  };

  return (
    <div className="admin-halls-wrapper">
      <div className="admin-halls-container">

        <BackButton label="Admin Dashboard" to="/admin/home" />

        <h2 className="admin-halls-title">Manage Halls</h2>

        <div className="add-hall-box">
          <input
            type="text"
            placeholder="Enter hall name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="hall-input"
          />
          <button className="add-btn" onClick={addHall}>
            Add Hall
          </button>
        </div>

        <h3 className="section-title">Existing Halls</h3>

        <div className="halls-list">
          {halls.map((hall) => (
            <div key={hall._id} className="hall-card">
              <span className="hall-name">{hall.name}</span>

              <button
                className="delete-btn"
                onClick={() => deleteHall(hall._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminHalls;
