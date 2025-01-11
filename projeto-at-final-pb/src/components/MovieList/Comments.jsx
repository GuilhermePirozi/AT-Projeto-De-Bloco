import React, { useState } from "react";
import styles from "/src/css/ListCSS/Comments.module.css";

const Comments = ({ movieId, currentUser }) => {
  const [comments, setComments] = useState(
    () =>
      JSON.parse(localStorage.getItem(`${currentUser}-comments-${movieId}`)) ||
      []
  );
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    const updatedComments = [
      ...comments,
      { text: newComment, user: currentUser },
    ];
    setComments(updatedComments);
    setNewComment("");
    localStorage.setItem(
      `${currentUser}-comments-${movieId}`,
      JSON.stringify(updatedComments)
    );
  };

  return (
    <div className={styles.commentSection}>
      <h3>Comentários</h3>
      <div className={styles.commentInput}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Adicione um comentário..."
        />
        <button onClick={addComment}>Enviar</button>
      </div>
      <ul className={styles.commentList}>
        {comments.map((comment, index) => (
          <li key={index} className={styles.commentItem}>
            <p>
              <strong>{comment.user}</strong>: {comment.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
