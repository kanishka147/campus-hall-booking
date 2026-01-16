import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";
import "../../styles/FacultyLogin.css";

function FacultyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await loginUser("faculty", email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/faculty/home"); // ✅ FIX
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="faculty-login-wrapper">
      <div className="faculty-login-card">
        <h2 className="faculty-title">Faculty Login</h2>
        <p className="faculty-subtext">Access pending requests & dashboards</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            className="faculty-input"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="faculty-input"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="faculty-btn">
            Login
          </button>
        </form>

        {message && <p className="faculty-msg">{message}</p>}
      </div>
    </div>
  );
}

export default FacultyLogin;
