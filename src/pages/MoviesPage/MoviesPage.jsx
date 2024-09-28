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
  const [isResultEmpty, setIsResultEmpty] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    const getMovies = async () => {
      try {
        setIsResultEmpty(false);
        setIsLoading(true);
        const data = await fetchMovieByQuery(query);
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
  }, [query]);

  const setSearchQuery = (value) => {
    if (!value) {
      return;
    }
    searchParams.set("query", value);
    setSearchParams(searchParams);
  };

  return (
    <div className={s.wrapper}>
      <SearchForm onSubmit={setSearchQuery} />
      {isLoading && <Loader />}
      {isResultEmpty && (
        <h3 className={s.notify}>
          There are no results by your query. Please try another one
        </h3>
      )}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
