import { useEffect, useState, useCallback } from "react";
import "../../styles/AdminBookings.css";
import BackButton from "../../components/BackButton";

const API_BASE = "https://campus-hall-backend.onrender.com/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [halls, setHalls] = useState([]);

  const [filterHall, setFilterHall] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const token = localStorage.getItem("token");

  // ✅ Fetch halls
  useEffect(() => {
    fetch(`${API_BASE}/halls`)
      .then((res) => res.json())
      .then((data) => setHalls(data))
      .catch(() => setHalls([]));
  }, []);

  // ✅ Fetch bookings with filters
  const fetchBookings = useCallback(() => {
    if (!token) return;

    const query = new URLSearchParams({
      hall: filterHall,
      status: filterStatus,
      date: filterDate,
      sort: sortOrder,
    });

    fetch(`${API_BASE}/bookings?${query.toString()}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch(() => setBookings([]));
  }, [filterHall, filterStatus, filterDate, sortOrder, token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div className="admin-bookings-wrapper">
      <div className="admin-bookings-container">

        {/* BACK BUTTON */}
        <BackButton label="Admin Dashboard" />

        <div className="page-header">
          <h2>All Bookings</h2>
          <p className="subtitle">View and filter all hall reservations</p>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          <select onChange={(e) => setFilterHall(e.target.value)}>
            <option value="">All Halls</option>
            {halls.map((h) => (
              <option key={h._id} value={h.name}>
                {h.name}
              </option>
            ))}
          </select>

          <select onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <input type="date" onChange={(e) => setFilterDate(e.target.value)} />

          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <button className="apply-btn" onClick={fetchBookings}>
            Apply
          </button>
        </div>

        {/* BOOKINGS LIST */}
        {bookings.length === 0 ? (
          <p className="empty-text">No bookings found</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((b) => (
              <div key={b._id} className="booking-row">

                <div className="booking-main">
                  <h4>{b.hallName}</h4>
                  <p className="time">
                    {b.date} • {b.startTime} – {b.endTime}
                  </p>
                  <p className="student">
                    {b.studentName} ({b.department})
                  </p>
                </div>

                <span className={`status-pill ${b.status}`}>
                  {b.status}
                </span>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminBookings;
