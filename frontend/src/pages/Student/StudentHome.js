import "../../styles/StudentHome.css";

function StudentHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="student-home-wrapper">
      <div className="student-home-card">

        <h2 className="student-title">Welcome, {user?.name}</h2>
        <p className="student-subtitle">
          {user?.department} — {user?.position}
        </p>

        <div className="dashboard-buttons">

          <a href="/student/halls">
            <button className="dashboard-btn book-btn">Book a Hall</button>
          </a>

          <a href="/student/bookings">
            <button className="dashboard-btn booking-btn">My Bookings</button>
          </a>

          <a href="/student/profile">
            <button className="dashboard-btn profile-btn">Profile</button>
          </a>
        </div>

        <button onClick={handleLogout} className="dashboard-btn logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentHome;
