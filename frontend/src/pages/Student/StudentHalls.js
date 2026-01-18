import { useEffect, useState } from "react";
import "../../styles/StudentHalls.css";
import BackButton from "../../components/BackButton";

const API_BASE = "https://campus-hall-backend.onrender.com/api";

function StudentHalls() {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/halls`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Halls fetched:", data);
        setHalls(data);
      })
      .catch((err) => {
        console.error("Error fetching halls:", err);
      });
  }, []);

  return (
    <div className="halls-wrapper">

      <BackButton label="Dashboard" />

      <h2 className="halls-title">Select a Hall</h2>

      {halls.length === 0 ? (
        <p style={{ textAlign: "center" }}>No halls available</p>
      ) : (
        <div className="halls-grid">
          {halls.map((hall) => (
            <div key={hall._id} className="hall-card">
              <div className="hall-icon">🏛️</div>
              <div className="hall-name">{hall.name}</div>

              <a href={`/student/halls/${hall._id}/calendar`}>
                <button className="hall-btn">View Calendar</button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentHalls;
