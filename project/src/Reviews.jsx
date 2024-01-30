import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";


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
    <div className="font-serif">
      <div className="text-center font-serif font-bold text-3xl">
        <h1 className="mt-36">Top Reviews</h1>
      </div>

      <div className="reviews flex flex-row mt-20 mb-48 mx-24 space-x-10">
        {reviews.map((review) => (
          <div key={review.id} className="review text-xl">
            <p> Name: {review.user.name}</p>
            <p> Rating: {review.rating}/5 </p>
            <p> Time Created: {review.time_created}</p>
            <br />
            <p className="underline"> Review</p>
            <p> {review.text}</p>
            <a href={review.url} className="underline"> Read More!</a>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
