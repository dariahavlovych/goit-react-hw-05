import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchMovieById } from "../../services/api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const basicImgUrl = "https://image.tmdb.org/t/p/w500/";
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieById(movieId);
      setMovieDetails(data);
    };
    getMovieDetails();
  }, [movieId]);

  if (Object.keys(movieDetails).length === 0) {
    return <h2>loading...</h2>;
  }

  return (
    <div>
      <div>
        {" "}
        <img src={basicImgUrl + movieDetails.poster_path} alt="" />
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
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <hr />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
