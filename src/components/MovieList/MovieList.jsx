import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
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
