import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingToday } from "../../services/api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchTrendingToday();
      setMovies(data);
    };
    getMovies();
  }, []);

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id.toString()}`}>
            <p>{movie.original_title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
