import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <>
      <div className="text-center decoration-black font-serif font-bold">
        <p className="text-5xl mt-60"> Welcome to Pan-Africa! </p>
        <button onClick={handleGetStarted} className="text-3xl mt-10 underline"> Get Start </button>
      </div>
    </>
  );
}
