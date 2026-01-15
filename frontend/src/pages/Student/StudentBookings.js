import { useEffect, useState } from "react";
import "../../styles/StudentBookings.css";
import BackButton from "../../components/BackButton";

function StudentBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/bookings/my", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="bookings-wrapper">
      <div className="bookings-container">

        <BackButton label="Dashboard" />

        <h2 className="bookings-title">My Bookings</h2>

        {bookings.length === 0 && (
          <p className="empty-text">No bookings yet.</p>
        )}

        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <div className="booking-header">
                <div className="hall-name">{b.hallName}</div>
                <span className={
                  b.status === "approved"
                    ? "status-badge status-approved"
                    : b.status === "pending"
                    ? "status-badge status-pending"
                    : "status-badge status-rejected"
                }>
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </div>

              <div className="booking-time">
                {b.date} • {b.startTime} – {b.endTime}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default StudentBookings;
