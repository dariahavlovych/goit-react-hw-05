import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastByMovieId } from "../../services/api";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCastByMovieId(movieId);
        if (data.length === 0) {
          return <h3>Nothing to show</h3>;
        }
        setCast(data);
      } catch (error) {
        return alert("Something went wrong. Please try again");
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
