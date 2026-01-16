import { useState } from "react";
import "../../styles/AdminAddUser.css";
import BackButton from "../../components/BackButton";

function AdminAddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const createUser = async () => {
  try {
    const res = await fetch(
      "https://campus-hall-backend.onrender.com/api/auth/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          department,
          position
        })
      }
    );

    const data = await res.json();
    setMessage(data.message);
  } catch (error) {
    console.error("Create user error:", error);
    setMessage("Server error. Try again.");
  }
};

  return (
    <div className="add-user-wrapper">

      <BackButton label="Manage Users" />

      <div className="add-user-card">

        <h2>Add New User</h2>
        <p className="subtitle">Create student, faculty or admin account</p>

        <div className="form-group">
          <label>Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {role === "student" && (
          <>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Position</label>
              <select onChange={(e) => setPosition(e.target.value)}>
                <option value="">Select Position</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
              </select>
            </div>
          </>
        )}

        <button className="primary-btn" onClick={createUser}>
          Create User
        </button>

        {message && <p className="success-text">{message}</p>}
      </div>
    </div>
  );
}

export default AdminAddUser;
