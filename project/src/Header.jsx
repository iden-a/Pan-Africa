import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigateTo = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigateTo("/");
  };
  
  return (
    <>
      <div className="header font-serif text-sm mt-10">
        <h1 className="logo ml-20 cursor-pointer" onClick={handleGetStarted}> <span id="pan-title">Pan</span><span>🥘</span>Africa!</h1>
        <nav>
          <ul className="nav mr-20">
            <li className="home hover:bg-amber-300">
              <Link to="/"> Home </Link>
            </li>

            <li className="explore hover:bg-amber-300">
              <Link to="/search"> Explore </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
