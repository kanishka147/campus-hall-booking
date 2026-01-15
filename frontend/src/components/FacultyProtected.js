import { Navigate } from "react-router-dom";

function FacultyProtected({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "faculty") {
    return <Navigate to="/faculty-login" />;
  }

  return children;
}

export default FacultyProtected;
