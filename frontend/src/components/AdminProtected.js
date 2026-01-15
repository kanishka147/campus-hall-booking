import { Navigate } from "react-router-dom";

function AdminProtected({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "admin") {
    return <Navigate to="/admin-login" />;
  }

  return children;
}

export default AdminProtected;
