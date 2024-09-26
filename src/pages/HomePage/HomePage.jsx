import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { fetchTrendingToday } from "../../services/api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchTrendingToday();
      setMovies(data);
    };
    getMovies();
  }, []);

  return (
    <div>
      <h2 className={s.title}>Trending Today</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
