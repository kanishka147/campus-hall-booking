import { useEffect, useState } from "react";
import "../../styles/StudentHalls.css";
import BackButton from "../../components/BackButton";

function StudentHalls() {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/halls")
      .then((res) => res.json())
      .then((data) => setHalls(data));
  }, []);

  return (
    <div className="halls-wrapper">

      <BackButton label="Dashboard" />

      <h2 className="halls-title">Select a Hall</h2>

      <div className="halls-grid">
        {halls.map((hall) => (
          <div key={hall._id} className="hall-card">
            <div className="hall-icon">🏛️</div>
            <div className="hall-name">{hall.name}</div>

            <a href={`/student/halls/${hall._id}/calendar`}>
              <button className="hall-btn">View Calendar</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentHalls;
