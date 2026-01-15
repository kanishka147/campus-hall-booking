import { Navigate } from "react-router-dom";

function StudentProtected({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "student") {
    return <Navigate to="/student-login" />;
  }

  return children;
}

export default StudentProtected;
