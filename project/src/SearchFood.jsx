import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Details from "./Details";
import axios from "axios";
import "./SearchFood.css";

export default function SearchFood() {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(0);
  const [limit, setLimit] = useState(0);
  const [results, setResults] = useState([]);
  const [selectRestaurant, setSelectRestaurant] = useState(null);
  const [alias, setAlias] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const navigateTo = useNavigate();

  const SearchForRestaurant = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/search?location=${location}&radius=${radius}&limit=${limit}`
      );
      const data = await response.json();
      setLoading(true);
      console.log(data);
      const aliases = data.map(({ alias, id }) => ({ alias, id }));
      console.log("Aliases: ", aliases);
      setFormSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      axios
        .get(
          `http://localhost:5000/search?location=${location}&radius=${radius}&limit=${limit}`
        )
        .then((response) => {
          setResults(response.data);
          console.log(response.data);
          setLoading(false);
          setFormSubmitted(false);
          setShowResults(true);
          // Store results in sessionStorage
          sessionStorage.setItem("searchResults", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
          setError(
            "Something went wrong with the form submission, please try again."
          );
          setLoading(false);
        });
    } else {
      // Retrieve results from sessionStorage
      const storedResults = sessionStorage.getItem("searchResults");
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      }
    }
  }, [formSubmitted]);

  const clearSearch = async (e) => {
    e.preventDefault();
    setLocation("");
    setRadius(0);
    setLimit(0);
    setShowResults(false);
    // Clear sessionStorage when clearing search
    sessionStorage.removeItem("searchResults");
  };

  const navigateToDetails = (alias) => {
    try {
      const result = results.find((result) => result.alias === alias);
      if (result) {
        setSelectRestaurant(result);
        navigateTo(`/details/${alias}`);
      } else {
        setError("Restaurant details not found.");
      }
    } catch {
      setError("Something went wrong connecting");
    }
  };

  return (
    <>
      <div className="search-form">
        <form onSubmit={SearchForRestaurant}>
          <div>
            <label>
              Location *:
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </label>
          </div>

          <div>
            <div className="input-form">
              <label>
                Radius *:
                <input
                  type="number"
                  name="radius"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="Enter Limit"
                  min="5"
                  max="25"
                  step="5"
                />
              </label>
            </div>
          </div>

          <div>
            <label>
              Limit *:
              <input
                type="number"
                name="limit"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="Enter Limit"
                min={1}
                max={20}
              />
            </label>
          </div>

          <button type="submit">Search</button>
        </form>
        <button onClick={clearSearch}> Clear </button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {showResults && (
        <div className="results">
          {results.map((result) => (
            <div
              key={result.id}
              className="result"
              onClick={() => navigateToDetails(result.alias)}
            >
              <p> Alias: {result.alias}</p>
              <p> Address: {result.address}</p>
              <p> Category: {result.category}</p>
              <p> Name: {result.name}</p>
              <p> Phone: {result.phone}</p>
              <p> Price Range: {result.price}</p>
              <p> Rating: {result.rating}</p>
              <img src={result.image} alt="..." />
            </div>
          ))}
        </div>
      )}

      {selectRestaurant && <Details result={selectRestaurant}/>}
    </>
  );
}
