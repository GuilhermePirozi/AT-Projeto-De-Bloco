import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser") || null
  );
  const [avatar, setAvatar] = useState(
    localStorage.getItem(`${currentUser}_avatar`) ||
      "/src/assets/default-avatar.png"
  );
  const [displayName, setDisplayName] = useState(
    localStorage.getItem(`${currentUser}_displayName`) || currentUser
  );
  const [score, setScore] = useState(
    parseInt(localStorage.getItem(`${currentUser}_score`)) || 0
  );
  const [gamesPlayed, setGamesPlayed] = useState(
    parseInt(localStorage.getItem(`${currentUser}_gamesPlayed`)) || 0
  ); // Nova variável

  const login = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAvatar("/src/assets/default-avatar.png");
    setDisplayName(null);
    setScore(0);
    setGamesPlayed(0); // Resetando jogos jogados
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem(`${currentUser}_score`);
    localStorage.removeItem(`${currentUser}_gamesPlayed`);
  };

  const updateScore = (newScore) => {
    setScore(newScore);
    localStorage.setItem(`${currentUser}_score`, newScore);
  };

  const updateGamesPlayed = () => {
    const newGamesPlayed = gamesPlayed + 1; // Incrementando os jogos jogados
    setGamesPlayed(newGamesPlayed);
    localStorage.setItem(`${currentUser}_gamesPlayed`, newGamesPlayed);
  };

  const updateProfile = (newAvatar, newDisplayName) => {
    setAvatar(newAvatar);
    setDisplayName(newDisplayName);
    localStorage.setItem(`${currentUser}_avatar`, newAvatar);
    localStorage.setItem(`${currentUser}_displayName`, newDisplayName);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        avatar,
        displayName,
        score,
        gamesPlayed, // Passando gamesPlayed para os componentes
        login,
        logout,
        updateScore,
        updateGamesPlayed, // Passando a função para atualizar jogos jogados
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
