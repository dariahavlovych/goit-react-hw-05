import s from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieByQuery } from "../../services/api";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setSearchQuery = (value) => {
    searchParams.set("query", value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieByQuery(query);
        if (data.length === 0) {
          return alert("Nothing to show");
        }
        setMovies(data);
      } catch (error) {
        return alert("Something went wrong. Please try again");
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [query]);

  return (
    <div>
      <SearchForm onSubmit={setSearchQuery} />
      <hr />
      {isLoading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
