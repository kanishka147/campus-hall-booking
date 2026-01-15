import "../../styles/FacultyHome.css";

function FacultyHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="faculty-wrapper">
      <div className="faculty-container">

        <h2 className="faculty-title">Welcome, {user?.name}</h2>
        <p className="faculty-role">Faculty</p>

        <div className="faculty-actions">

          <a href="/faculty/pending" className="action-btn btn-primary">
            Pending Requests
          </a>

          <button
            className="action-btn btn-danger"
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

export default FacultyHome;
