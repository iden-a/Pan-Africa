import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <>
      <div>
        <p className="text-4xl font-bold underline"> Welcome to Pan-Africa! </p>
        <button onClick={handleGetStarted}> Get Start </button>
      </div>
    </>
  );
}
