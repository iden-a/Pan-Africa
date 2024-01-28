import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <h1 className="logo"> Pan-Africa!</h1>
        <nav>
          <ul className="nav">
            <li>
              <Link to="/"> Home </Link>
            </li>

            <li>
              <Link to="/search"> Explore </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
