import Header from "./Header";
import HomePage from "./HomePage";
import SearchFood from "./SearchFood";
import Details from "./Details";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchFood />} />
            <Route path="/details/:alias" element={<Details />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
