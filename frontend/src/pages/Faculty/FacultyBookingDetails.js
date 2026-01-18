import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/FacultyBookingDetails.css";
import BackButton from "../../components/BackButton";

const API_BASE = "https://campus-hall-backend.onrender.com/api";

function FacultyBookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE}/bookings/${id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => setBooking(data))
      .catch(err => {
        console.error("Error fetching booking:", err);
        setBooking(null);
      });
  }, [id]);

  const handleAction = async (action) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_BASE}/bookings/${id}/${action}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const data = await res.json();
    setMessage(data.message);

    setTimeout(() => {
      navigate("/faculty/pending");
    }, 1200);
  };

  if (!booking) return <p className="loading">Loading…</p>;

  return (
    <div className="details-wrapper">
      <div className="details-container">

        <BackButton label="Pending Requests" />

        <h2 className="details-title">Booking Review</h2>

        <div className="summary-card">
          <div>
            <h3>{booking.studentName}</h3>
            <p>{booking.department} • {booking.position}</p>
          </div>

          <div className="hall-pill">
            {booking.hallName}
          </div>
        </div>

        <div className="time-row">
          <div>
            <span>Date</span>
            <strong>{booking.date}</strong>
          </div>
          <div>
            <span>Time</span>
            <strong>{booking.startTime} – {booking.endTime}</strong>
          </div>
        </div>

        <div className="reason-section">
          <span className="reason-label">Reason</span>
          <blockquote>
            {booking.reason || "No reason provided"}
          </blockquote>
        </div>

        <div className="decision-bar">
          <button
            className="approve-btn"
            onClick={() => handleAction("approve")}
          >
            Approve Booking
          </button>

          <button
            className="reject-btn"
            onClick={() => handleAction("reject")}
          >
            Reject Booking
          </button>
        </div>

        {message && <p className="action-message">{message}</p>}
      </div>
    </div>
  );
}

export default FacultyBookingDetails;
