import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Reviews.css";


export default function Reviews() {
  const { alias } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    (e) => {
      const fetchReviews = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/businesses/${alias}/reviews`
          );
          const data = await response.json();
          console.log(data);
          setLoading(true);
          setReviews(data);
          console.log(loading);
          console.log("Reviews: ", reviews);
        } catch (error) {
          console.log(error);
        }
      };
      fetchReviews();
    },
    [alias]
  );

  return (
    <>
      <div>
        <h1>Top Reviews</h1>
      </div>

      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <p> Name: {review.user.name}</p>
            <p> Rating: {review.rating}</p>
            <p> Time Created: {review.time_created}</p>
            <p> Text: {review.text}</p>
            <a href={review.url}> Read More!</a>
            
          </div>
        ))}
      </div>
    </>
  );
}
