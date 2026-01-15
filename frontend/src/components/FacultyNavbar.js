import { Link } from "react-router-dom";
import "./FacultyNavbar.css";

function FacultyNavbar() {
  return (
    <div className="faculty-nav">
      <h3>Campus Hall Booking</h3>

      <div className="nav-links">
        <Link to="/faculty/home">Home</Link>
        <Link to="/faculty/pending">Pending</Link>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default FacultyNavbar;
