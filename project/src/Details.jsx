import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Details() {
  const { alias } = useParams();
  const navigateTo = useNavigate();
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    (e) => {
      const fetchDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/businesses/${alias}`
          );
          const data = await response.json();
          console.log(data);
          setIsLoading(true);
          console.log(isLoading);
          setDetails(data);
        } catch (error) {
          setError(
            "The server ran into an error getting the events, please try again!"
          );
        }
      };
      // Check if alias is not null or undefined before fetching data
      // if (alias) {
      fetchDetails();
      // }
    },
    [alias]
  );

  return (
    <>
      <div>

        {isLoading ? (
          <>
            <h1>{details.name}</h1>
            <img src={details.image} alt="..." />
            <p> {details.address}</p>
            <a href={details.url}> {details.name} Yelp Profile </a>
            <p> Phone: {details.phone}</p>
            <p> Tags: {details.categories} </p>
            <p> Transaction Types: {details.transactions}</p>
            
            <p> ---------------------------------- </p>
            <div>
              <h3> Most Popular Reviews </h3>
              {/* <img src={details.photos[1]} alt="" />
              <img src={details.photos[2]} alt="" />
              <img src={details.photos[0]} alt="" /> */}
            </div>
          </>
        ) : (
          <p> Loading </p>
        )}
      </div>
    </>
  );
}
