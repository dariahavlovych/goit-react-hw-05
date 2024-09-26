import { IoSearchOutline } from "react-icons/io5";
import s from "./MoviesPage.module.css";
import { useState } from "react";
import { fetchMovieByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    if (!query) {
      return alert("Please enter your search query");
    }
    const data = await fetchMovieByQuery(query);
    setMovies(data);
    console.log(movies);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={s.searchBtn}>
          <IoSearchOutline className={s.icon} />
        </button>
      </form>
      <hr />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
