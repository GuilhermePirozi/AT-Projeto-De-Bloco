import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import styles from "/src/css/ListCSS/MovieDetails.module.css";

const MovieDetails = () => {
  const { id } = useParams();
  const { avatar, displayName } = useAuth();
  const apiKey = "f024c47f63aa01f439f0f7fc51d6d0d8";
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem(`comments-${id}`)) || []
  );
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) =>
        console.error("Erro ao buscar detalhes do filme:", error)
      );
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const updatedComments = [
      ...comments,
      {
        text: newComment,
        user: displayName || "Usuário Anônimo",
        avatar: avatar || "/src/assets/default-avatar.png",
      },
    ];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.movieInfo}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.moviePoster}
        />
        <div className={styles.infoText}>
          <h1>{movie.title}</h1>
          <p>
            <strong>Data de Lançamento:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Sinopse:</strong> {movie.overview}
          </p>
          <p>
            <strong>País:</strong>{" "}
            {movie.production_countries.map((c) => c.name).join(", ")}
          </p>
          <p>
            <strong>Duração:</strong> {movie.runtime} minutos
          </p>
          <p>
            <strong>Elenco:</strong>
            {movie.credits?.cast
              ?.slice(0, 5)
              .map((actor) => actor.name)
              .join(", ") || "Indisponível"}
          </p>
        </div>
      </div>
      <div className={styles.commentsSection}>
        <h2>Comentários</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escreva um comentário..."
          className={styles.commentInput}
        />
        <button onClick={handleAddComment} className={styles.commentButton}>
          Adicionar Comentário
        </button>
        <div className={styles.commentsList}>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className={styles.avatar}
                />
                <div className={styles.commentContent}>
                  <p className={styles.commentUser}>{comment.user}</p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noComments}>Nenhum comentário ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
