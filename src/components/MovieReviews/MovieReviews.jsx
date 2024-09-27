import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsByMovieId } from "../../services/api";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReviewsByMovieId(movieId);
        if (data.length === 0) {
          return <h3>Nothing to show</h3>;
        }
        setReviews(data);
      } catch (error) {
        return alert("Something went wrong. Please try again");
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
