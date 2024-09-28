import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";
import { fetchReviewsByMovieId } from "../../services/api";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultEmpty, setIsResultEmpty] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsResultEmpty(false);
        setIsLoading(true);
        const data = await fetchReviewsByMovieId(movieId);
        if (data.length === 0) {
          setIsResultEmpty(true);
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
      {isResultEmpty && <h3>There are no reviews for this movie</h3>}
      <ul>
        {reviews.map((review) => (
          <li className={s.item} key={review.id}>
            <p className={s.author}>{review.author}</p>
            <p className={s.text}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
