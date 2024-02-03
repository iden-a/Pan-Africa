import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <>
      <div className="text-center decoration-black font-serif ">
        <p className="text-5xl mt-72 font-bold"> Welcome to Pan🥘Africa! </p>
        <p className="mt-10 text-2xl "> Finding the best African Restaurants near you. </p>
        <button onClick={handleGetStarted} className="text-3xl mt-10 border-2 px-2 py-2 rounded-lg mb-60 bg-amber-500 hover:bg-amber-300"> Get Start </button>
      </div>
      <Footer/>
    </>
  );
}
