import "../../styles/AdminHome.css";

function AdminHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="admin-home-wrapper">
      <div className="admin-home-card">

        <h2 className="admin-home-title">Welcome, Admin</h2>
        <p className="admin-home-name">{user?.name}</p>

        <div className="admin-actions">
          <a href="/admin/halls" className="admin-action-btn btn-halls">
            Manage Halls
          </a>

          <a href="/admin/users" className="admin-action-btn btn-users">
            Manage Users
          </a>

          <a href="/admin/bookings" className="admin-action-btn btn-bookings">
            View All Bookings
          </a>

          <button
            className="admin-action-btn btn-logout"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminHome;
