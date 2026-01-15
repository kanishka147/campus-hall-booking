import "../../styles/StudentProfile.css";
import BackButton from "../../components/BackButton";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <BackButton label="Dashboard" />

        <div className="avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="profile-name">{user?.name}</h2>
        <p className="profile-role">
          {user?.department} • {user?.position}
        </p>

        <div className="profile-info">
          <div className="info-row">
            <span className="label">Email</span>
            <span className="value">{user?.email}</span>
          </div>

          <div className="info-row">
            <span className="label">Department</span>
            <span className="value">{user?.department}</span>
          </div>

          <div className="info-row">
            <span className="label">Position</span>
            <span className="value">{user?.position}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentProfile;
