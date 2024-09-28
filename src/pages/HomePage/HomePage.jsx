import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { fetchTrendingToday } from "../../services/api";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultEmpty, setIsResultEmpty] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsResultEmpty(false);
        setIsLoading(true);
        const data = await fetchTrendingToday();
        if (data.length === 0) {
          setIsResultEmpty(true);
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
      {isResultEmpty && <h3>No trends for today</h3>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
