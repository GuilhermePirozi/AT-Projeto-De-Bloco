import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import styles from "/src/css/loginPageCSS/loginPage.module.css";
import logo from "/src/assets/logo-desktop.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (isSignUp) {
      if (users[username]) {
        setError("Username already exists. Please choose a different one.");
      } else {
        users[username] = { password, email };
        localStorage.setItem("users", JSON.stringify(users));
        setError("");
        alert("Account created successfully!");
        setIsSignUp(false);
      }
    } else {
      if (users[username] && users[username].password === password) {
        login(username);
        navigate("/home");
      } else {
        setError("Invalid username or password.");
      }
    }
  };

  return (
    <div className={styles.loginPage_container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Site Logo" className={styles.logoImage} />
        </div>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <input
          type="text"
          placeholder="Usuário"
          className={styles.inputField}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {isSignUp && (
          <input
            type="email"
            placeholder="E-mail"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Senha"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p onClick={() => setIsSignUp(!isSignUp)} className={styles.switchMode}>
          {isSignUp
            ? "Já tem uma conta? Sign In"
            : "Não tem uma conta? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
