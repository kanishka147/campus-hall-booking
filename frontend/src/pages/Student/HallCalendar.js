import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/HallCalendar.css";
import BackButton from "../../components/BackButton";

const API_BASE = "https://campus-hall-backend.onrender.com/api";

function HallCalendar() {
  const { hallId } = useParams();
  const [hall, setHall] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [bookingUpdated, setBookingUpdated] = useState(false);

  // ✅ Fetch hall details
  useEffect(() => {
    fetch(`${API_BASE}/halls`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((h) => h._id === hallId);
        setHall(found);
      })
      .catch((err) => console.error("Hall fetch error:", err));
  }, [hallId]);

  // ✅ Fetch bookings for this hall
  useEffect(() => {
    fetch(`${API_BASE}/bookings/hall/${hallId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Bookings fetch error:", err));
  }, [hallId, bookingUpdated]);

  // ✅ Create booking
  const sendRequest = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE}/bookings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        hallId,
        date,
        startTime,
        endTime,
        reason,
        notes,
      }),
    });

    const data = await response.json();
    setMessage(data.message);
    setBookingUpdated(!bookingUpdated);
  };

  return (
    <div className="hall-wrapper">
      <div className="hall-container">

        <BackButton label="Halls" />

        <h2 className="hall-title">{hall?.name}</h2>

        <h3 className="section-title">Select Date & Time</h3>

        <div className="form-grid">
          <input type="date" className="form-input" onChange={(e) => setDate(e.target.value)} />
          <input type="time" className="form-input" onChange={(e) => setStartTime(e.target.value)} />
          <input type="time" className="form-input" onChange={(e) => setEndTime(e.target.value)} />
          <input
            type="text"
            placeholder="Reason for booking"
            className="form-input"
            onChange={(e) => setReason(e.target.value)}
          />
          <textarea
            placeholder="Additional notes (optional)"
            className="form-textarea"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <button className="send-btn" onClick={sendRequest}>
          Send Request
        </button>

        {message && (
          <p style={{ marginTop: "15px", color: "red", fontWeight: 600 }}>
            {message}
          </p>
        )}

        <h3 className="section-title">Existing Bookings</h3>

        <div className="bookings-list">
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            bookings.map((b) => (
              <div key={b._id} className="booking-card">
                <span>{b.date} | {b.startTime} - {b.endTime}</span>
                <span
                  className={
                    b.status === "approved"
                      ? "status status-approved"
                      : b.status === "rejected"
                      ? "status status-rejected"
                      : "status status-pending"
                  }
                >
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default HallCalendar;
