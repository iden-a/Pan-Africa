import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Details from "./Details";

export default function SearchFood() {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(0);
  const [limit, setLimit] = useState(0);
  const [results, setResults] = useState([]);
  const [selectRestaurant, setSelectRestaurant] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(true);
  const [showResults, setShowResults] = useState(true);

  const navigateTo = useNavigate();

  const SearchForRestaurant = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowResults(false);
    try {
      const response = await fetch(
        `http://localhost:5000/search?location=${location}&radius=${radius}&limit=${limit}`
      );
      const data = await response.json();
      console.log(data);
      const aliases = data.map(({ alias, id }) => ({ alias, id }));
      console.log("Aliases: ", aliases);
      setResults(data);
      setLoading(false);
      setShowResults(true);
      setFormSubmitted(false);
      sessionStorage.setItem("searchResults", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      setError(
        "Something went wrong with the form submission, please try again."
      );
      setLoading(false);
    }
  };

  useEffect(
    (e) => {
      // Retrieve results from sessionStorage
      const storedResults = sessionStorage.getItem("searchResults");
      if (storedResults && formSubmitted) {
        setResults(JSON.parse(storedResults));
        setShowResults(true);
        setFormSubmitted(true);
      } else if (!formSubmitted) {
        SearchForRestaurant(e);
        setFormSubmitted(false);
      }
    },
    [formSubmitted]
  );

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
      <div className="search-form mt-20 font-serif text-xl">
        <form onSubmit={SearchForRestaurant}>
          <div className="location flex justify-center">
            <label>
              Location:
              <input
                className="rounded-lg w-96 border-2 border-slate-500 ml-2 p-1"
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="  Enter location..."
              />
            </label>
          </div>

          <div className="radius-limit flex justify-center space-x-4 mt-5 mb-5">
            <div className="radius ">
              <label>
                Radius:
                <input
                  className="border rounded-lg ml-2 text-center"
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

            <div className="limit">
              <label>
                Limit:
                <input
                  className="border rounded-lg ml-2 text-center"
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
          </div>

          <div className="flex justify-center space-x-12">
            <button
              type="submit"
              className="border-2 px-2 py-2 rounded-lg bg-amber-500 hover:bg-amber-300"
            >
              Search
            </button>
            <br />
            <button
              onClick={clearSearch}
              className="border-2 px-2 py-2 rounded-lg bg-amber-500 hover:bg-amber-300"
            >
              {" "}
              Clear{" "}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <>
          {" "}
          <p className="text-center mt-60 font-serif text-4xl animate-spin">
            {" "}
            🥘
          </p>{" "}
          <p className="text-center mt-10 font-serif text-2xl">
            Loading Restaurants...
          </p>{" "}
        </>
      )}

      {error && (
        <>
          {" "}
          <p className="text-center mt-60 font-serif text-2xl">
            {" "}
            Trouble Finding Restauants :({" "}
          </p>{" "}
          <p className="text-center mt-5 font-serif text-4xl animate-spin">
            {" "}
            🥘{" "}
          </p>{" "}
          <p className="text-center mt-5 font-serif text-2xl">
            {" "}
            Please try again!{" "}
          </p>{" "}
        </>
      )}

      {showResults && (
        <div className="results flex flex-wrap flex-row font-serif text-lg justify-center mb-24">
          {results.map((result) => (
            <div
              key={result.id}
              className="result mt-20 px-20 cursor-pointer"
              onClick={() => navigateToDetails(result.alias)}
            >
              <div className="text-center pb-5">
                <p className="underline"> {result.name}</p>
                <p> {result.address}</p>
              </div>

              <div className="flex justify-center items-center">
                <img
                  src={result.image}
                  alt={result.alt}
                  className="size-96 content-center"
                />
              </div>
              <div className="p-5">
                <p> Phone: {result.phone}</p>
                <p> Price Range: {result.price}</p>
                <p> Rating: {result.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectRestaurant && <Details result={selectRestaurant} />}
    </>
  );
}
