import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id.toString()}`} state={location}>
            <p>{movie.original_title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
