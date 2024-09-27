import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const location = useLocation();
  const goBackLink = useRef(location.state ?? "/movies");
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieById(movieId);
        if (Object.keys(data).length === 0) {
          return <h3>Nothing to show</h3>;
        }
        setMovieDetails(data);
      } catch (error) {
        return alert("Something went wrong. Please try again");
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (Object.keys(movieDetails).length === 0) {
    return <Loader />;
  }

  return (
    <div>
      <Link to={goBackLink.current}>Go Back</Link>
      <div>
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />

        <div>
          <h3>{movieDetails.original_title}</h3>
          <p>User Score: {Math.ceil(movieDetails.vote_average * 10)}%</p>
          <p>Owerview</p>
          <p>{movieDetails.overview}</p>
          <p>Genres</p>
          <div>
            {movieDetails.genres.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <p>Additional information</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <hr />
      <Suspense fallback={<div>Loading details..please wait</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
