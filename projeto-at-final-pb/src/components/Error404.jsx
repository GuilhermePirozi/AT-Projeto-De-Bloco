// Error404.jsx
import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Página não encontrada</h1>
      <p style={styles.message}>
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link to="/" style={styles.button}>
        Ir para o início
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "3rem",
    color: "#333",
  },
  message: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#46178F",
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
};

export default Error404;
