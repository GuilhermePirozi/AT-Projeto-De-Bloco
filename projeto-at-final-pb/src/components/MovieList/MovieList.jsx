import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import styles from "/src/css/ListCSS/MovieList.module.css";

const MovieList = () => {
  const apiKey = "f024c47f63aa01f439f0f7fc51d6d0d8";
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [movies, setMovies] = useState(
    () => JSON.parse(localStorage.getItem(`${currentUser}-movies`)) || []
  );
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ratings, setRatings] = useState(
    () => JSON.parse(localStorage.getItem(`${currentUser}-ratings`)) || {}
  );
  const [randomMovies, setRandomMovies] = useState([]);

  const fetchRandomMovies = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredMovies = data.results.filter(
          (movie) => !movies.some((m) => m.id === movie.id)
        );
        setRandomMovies(filteredMovies.slice(0, 12));
      })
      .catch((error) =>
        console.error("Erro ao buscar filmes populares:", error)
      );
  };

  useEffect(() => {
    fetchRandomMovies();
  }, [movies]);

  const searchMovies = (query) => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      )
        .then((response) => response.json())
        .then((data) => setSuggestions(data.results))
        .catch((error) => console.error("Erro ao buscar filmes:", error));
    } else {
      setSuggestions([]);
    }
  };

  const handleAddMovie = (movie) => {
    if (!movies.some((m) => m.id === movie.id)) {
      const updatedMovies = [...movies, movie];
      setMovies(updatedMovies);
      localStorage.setItem(
        `${currentUser}-movies`,
        JSON.stringify(updatedMovies)
      );
    }
    setRandomMovies((prevMovies) =>
      prevMovies.filter((randomMovie) => randomMovie.id !== movie.id)
    );
  };

  const removeMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem(
      `${currentUser}-movies`,
      JSON.stringify(updatedMovies)
    );
  };

  const setMovieRating = (id, rating) => {
    const updatedRatings = { ...ratings, [id]: rating };
    setRatings(updatedRatings);
    localStorage.setItem(
      `${currentUser}-ratings`,
      JSON.stringify(updatedRatings)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <span className={styles.titleMain}>Minha Lista de Filmes</span>
      </div>

      <input
        type="text"
        className={styles.searchInput}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searchMovies(e.target.value);
        }}
        placeholder="Buscar filmes..."
      />

      {query && (
        <div className={styles.movieGrid}>
          {suggestions.map((movie) => (
            <div
              key={movie.id}
              className={styles.movieItem}
              onClick={() => handleAddMovie(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className={styles.moviePoster}
              />
              <span className={styles.movieTitle}>{movie.title}</span>
              <p>Ano: {new Date(movie.release_date).getFullYear()}</p>
              <p>Nota: {movie.vote_average}</p>
            </div>
          ))}
        </div>
      )}

      {movies.length > 0 && (
        <>
          <div className={styles.sectionTitle}>
            <span className={styles.titleSecondary}>Filmes Adicionados</span>
          </div>

          <div className={styles.movieGrid}>
            {movies.map((movie) => (
              <div key={movie.id} className={styles.movieItem}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.moviePoster}
                />
                <span className={styles.movieTitle}>{movie.title}</span>
                <p>Ano: {new Date(movie.release_date).getFullYear()}</p>
                <p>Nota: {movie.vote_average}</p>
                <div className={styles.starRating}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < (ratings[movie.id] || 0)
                          ? styles.filledStar
                          : styles.emptyStar
                      }
                      onClick={() => setMovieRating(movie.id, i + 1)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <button
                  className={styles.detailButton}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  Ver detalhes
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => removeMovie(movie.id)}
                >
                  Remover da lista
                </button>
              </div>
            ))}
          </div>
          <hr className={styles.divider} />
        </>
      )}

      <div className={styles.sectionTitle}>
        <span className={styles.titleSecondary}>Filmes Aleatórios</span>
      </div>
      <div className={styles.movieGrid}>
        {randomMovies.map((movie) => (
          <div
            key={movie.id}
            className={styles.movieItem}
            onClick={() => handleAddMovie(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <span className={styles.movieTitle}>{movie.title}</span>
            <p>Ano: {new Date(movie.release_date).getFullYear()}</p>
            <p>Nota: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
