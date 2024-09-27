import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjE5NWQ4ODkwMGYzZWQ2MWQ3MDVhMzc5NGE3ZDVmNiIsIm5iZiI6MTcyNzI5MzIxMC42MDUxMTcsInN1YiI6IjY2ZjQzMzUyNGZkNGViZTIyNDBkZjQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F-WheXKz6C4A5ft9LbRMJDpDiBFvn1LH-cEhFi75UqE",
  },
};

export const fetchTrendingToday = async () => {
  const { data } = await axios.get("trending/movie/day", options);
  return data.results;
};

export const fetchMovieByQuery = async (query) => {
  const { data } = await axios.get(`search/movie?query=${query}`, options);
  return data.results;
};

export const fetchMovieById = async (movie_id) => {
  const { data } = await axios.get(`movie/${movie_id}`, options);
  return data;
};

export const fetchCastByMovieId = async (movie_id) => {
  const { data } = await axios.get(`movie/${movie_id}/credits`, options);
  return data.cast;
};

export const fetchReviewsByMovieId = async (movie_id) => {
  const { data } = await axios.get(`movie/${movie_id}/reviews`, options);
  return data.results;
};
