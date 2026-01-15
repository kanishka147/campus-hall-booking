import { useState } from "react";
import { loginUser } from "../../api/api";
import "../../styles/AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await loginUser("admin", email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/admin/home";
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">

        <h2 className="admin-title">Admin Login</h2>
        <p className="admin-subtitle">Authorized access only</p>

        <form onSubmit={handleLogin} className="admin-form">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="admin-input"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
          />

          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>

        {message && <p className="admin-error">{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
