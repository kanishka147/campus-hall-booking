import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton({ label = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      className="floating-back-btn"
      onClick={() => navigate(-1)}
    >
      ← {label}
    </button>
  );
}

export default BackButton;
