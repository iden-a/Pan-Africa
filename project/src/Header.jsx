import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="header font-serif text-sm mt-10">
        <h1 className="logo ml-20"> Pan-Africa!</h1>
        <nav>
          <ul className="nav mr-20">
            <li className="">
              <Link to="/"> Home </Link>
            </li>

            <li className="">
              <Link to="/search"> Explore </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
