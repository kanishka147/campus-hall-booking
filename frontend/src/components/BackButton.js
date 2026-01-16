import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton({ label = "Back", to = null }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="back-button" onClick={handleBack}>
      ← {label}
    </button>
  );
}

export default BackButton;
