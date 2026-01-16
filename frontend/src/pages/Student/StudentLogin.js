import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";
import "../../styles/StudentLogin.css";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await loginUser("student", email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/student/home"); // ✅ FIX
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Student Login</h2>
        <p className="login-subtitle">
          Only Presidents & Vice Presidents can login
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default StudentLogin;
