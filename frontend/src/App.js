import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* LOGIN */
import StudentLogin from "./pages/Student/StudentLogin";
import FacultyLogin from "./pages/Faculty/FacultyLogin";
import AdminLogin from "./pages/Admin/AdminLogin";

/* STUDENT */
import StudentHome from "./pages/Student/StudentHome";
import StudentHalls from "./pages/Student/StudentHalls";
import HallCalendar from "./pages/Student/HallCalendar";
import StudentBookings from "./pages/Student/StudentBookings";
import StudentProfile from "./pages/Student/StudentProfile";

/* FACULTY */
import FacultyHome from "./pages/Faculty/FacultyHome";
import FacultyPending from "./pages/Faculty/FacultyPending";
import FacultyBookingDetails from "./pages/Faculty/FacultyBookingDetails";

/* ADMIN */
import AdminHome from "./pages/Admin/AdminHome";
import AdminHalls from "./pages/Admin/AdminHalls";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminAddUser from "./pages/Admin/AdminAddUser";
import AdminEditUser from "./pages/Admin/AdminEditUser";
import AdminBookings from "./pages/Admin/AdminBookings";

/* PROTECTED ROUTES */
import StudentProtected from "./components/StudentProtected";
import FacultyProtected from "./components/FacultyProtected";
import AdminProtected from "./components/AdminProtected";

/* STYLES */
import "./styles/Landing.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* LANDING */}
        <Route path="/" element={<Landing />} />

        {/* LOGIN */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* STUDENT ROUTES */}
        <Route
          path="/student/home"
          element={
            <StudentProtected>
              <StudentHome />
            </StudentProtected>
          }
        />

        <Route
          path="/student/halls"
          element={
            <StudentProtected>
              <StudentHalls />
            </StudentProtected>
          }
        />

        <Route
          path="/student/halls/:hallId/calendar"
          element={
            <StudentProtected>
              <HallCalendar />
            </StudentProtected>
          }
        />

        <Route
          path="/student/bookings"
          element={
            <StudentProtected>
              <StudentBookings />
            </StudentProtected>
          }
        />

        <Route
          path="/student/profile"
          element={
            <StudentProtected>
              <StudentProfile />
            </StudentProtected>
          }
        />

        {/* FACULTY ROUTES */}
        <Route
          path="/faculty/home"
          element={
            <FacultyProtected>
              <FacultyHome />
            </FacultyProtected>
          }
        />

        <Route
          path="/faculty/pending"
          element={
            <FacultyProtected>
              <FacultyPending />
            </FacultyProtected>
          }
        />

        <Route
          path="/faculty/booking/:id"
          element={
            <FacultyProtected>
              <FacultyBookingDetails />
            </FacultyProtected>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/home"
          element={
            <AdminProtected>
              <AdminHome />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/halls"
          element={
            <AdminProtected>
              <AdminHalls />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtected>
              <AdminUsers />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/users/add"
          element={
            <AdminProtected>
              <AdminAddUser />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/users/edit/:id"
          element={
            <AdminProtected>
              <AdminEditUser />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminProtected>
              <AdminBookings />
            </AdminProtected>
          }
        />

      </Routes>
    </Router>
  );
}

/* LANDING COMPONENT */
function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-card">

        <h1 className="landing-title">Campus Hall Booking</h1>
        <p className="landing-subtitle">Choose your login portal</p>

        <a href="/student-login">
          <button className="login-button login-student">
            Student Login
          </button>
        </a>

        <a href="/faculty-login">
          <button className="login-button login-faculty">
            Faculty Login
          </button>
        </a>

        <a href="/admin-login">
          <button className="login-button login-admin">
            Admin Login
          </button>
        </a>

      </div>
    </div>
  );
}

export default App;
