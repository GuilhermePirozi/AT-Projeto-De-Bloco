import { useState } from "react";

const useMovies = (apiKey) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const addMovie = (movie) => {
    setMovies((prevMovies) => [...prevMovies, movie]);
    setSuggestions([]);
  };

  const removeMovie = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  const searchMovies = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        setError("");
        setSuggestions(data.results);
      } else {
        setSuggestions([]);
        setError("Nenhum filme encontrado.");
      }
    } catch (err) {
      setError("Erro ao buscar filmes.");
    }
  };

  return {
    movies,
    suggestions,
    error,
    searchMovies,
    removeMovie,
    addMovie,
  };
};

export default useMovies;
