import React, { useState } from "react";
import MovieFetcher from "./MovieFetcher";
import "/src/css/Ranking/MovieRanking.css";

const MovieRanking = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFetchMovies = (fetchedMovies) => {
    setMovies(fetchedMovies);
    setLoading(false);
  };

  return (
    <div className="ranking_container">
      <h1 id="h1-ranking">Ranking dos 100 Melhores Filmes</h1>
      <MovieFetcher onFetchMovies={handleFetchMovies} />
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ul className="movies-list">
          {movies.slice(0, 100).map((movie, index) => (
            <li key={movie.id} className="movie-item">
              <div className="ranking-number">{index + 1}</div>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-content">
                <div className="movie-info">
                  <h2 className="movie-title">{movie.title}</h2>
                  <p className="movie-rating">Nota: {movie.vote_average}</p>
                </div>
                <div className="movie-divider"></div>
                <p className="movie-summary">
                  {movie.overview || "Resumo indisponível."}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieRanking;
