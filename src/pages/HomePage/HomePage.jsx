import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { fetchTrendingToday } from "../../services/api";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTrendingToday();
        if (data.length === 0) {
          return <h3>Nothing to show</h3>;
        }
        setMovies(data);
      } catch (error) {
        return alert("Something went wrong. Please try again");
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h2 className={s.title}>Trending Today</h2>
      {isLoading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
