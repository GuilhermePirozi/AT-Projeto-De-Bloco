import { useEffect } from "react";

const MovieFetcher = ({ onFetchMovies }) => {
  useEffect(() => {
    const fetchMovies = async () => {
      let allMovies = [];
      let page = 1;

      try {
        while (allMovies.length < 100) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=f024c47f63aa01f439f0f7fc51d6d0d8&language=pt-BR&page=${page}`
          );

          if (!response.ok) {
            throw new Error("Erro ao buscar filmes.");
          }

          const data = await response.json();
          allMovies = [...allMovies, ...data.results];

          page += 1;
        }

        onFetchMovies(allMovies.slice(0, 100));
      } catch (err) {
        console.error("Erro:", err);
        onFetchMovies([]);
      }
    };

    fetchMovies();
  }, [onFetchMovies]);

  return null;
};

export default MovieFetcher;
