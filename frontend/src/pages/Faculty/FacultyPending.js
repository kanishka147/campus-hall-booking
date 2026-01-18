import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/FacultyPending.css";
import BackButton from "../../components/BackButton";

const API_BASE = "https://campus-hall-backend.onrender.com/api";

function FacultyPending() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE}/bookings/pending`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => {
        console.error("Error fetching pending bookings:", err);
        setRequests([]);
      });
  }, []);

  return (
    <div className="pending-wrapper">
      <div className="pending-container">

        <BackButton label="Dashboard" />

        <h2 className="pending-title">Pending Requests</h2>

        {requests.length === 0 && (
          <p className="empty-text">No pending requests 🎉</p>
        )}

        {requests.map((r) => (
          <div key={r._id} className="pending-card">

            <div className="pending-left">
              <div className="student-block">
                <h3 className="student-name">{r.studentName}</h3>
                <span className="student-role">
                  {r.department} • {r.position}
                </span>
              </div>

              <div className="hall-block">
                <div className="hall-name">{r.hallName}</div>
                <div className="hall-time">
                  {r.date} • {r.startTime} – {r.endTime}
                </div>
              </div>
            </div>

            <div className="pending-right">
              <button
                className="view-btn"
                onClick={() => navigate(`/faculty/booking/${r._id}`)}
              >
                View Details →
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyPending;
