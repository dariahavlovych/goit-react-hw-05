import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastByMovieId } from "../../services/api";

const MovieCast = () => {
  const { movieId } = useParams();
  const basicImgUrl = "https://image.tmdb.org/t/p/w500/";
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      const data = await fetchCastByMovieId(movieId);
      setCast(data);
    };
    getCast();
  }, [movieId]);

  if (cast.length === 0) {
    return <h2>loading...</h2>;
  }

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.cast_id}>
          <img src={basicImgUrl + actor.profile_path} alt="" />
          <p>{actor.name}</p>
          <p>{actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
