import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import "/src/css/UsersRankingCSS/UserRanking.css";

const UsersRanking = () => {
  const { currentUser, avatar } = useAuth();
  const [userScore, setUserScore] = useState(
    parseInt(localStorage.getItem(`${currentUser}_score`)) || 0
  );
  const [userGamesPlayed, setUserGamesPlayed] = useState(
    parseInt(localStorage.getItem(`${currentUser}_gamesPlayed`)) || 0
  );
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const ghostUsers = Array.from({ length: 9 }, (_, i) => ({
      name: `Bot${i + 1}`,
      score: Math.floor(Math.random() * 500),
      gamesPlayed: Math.floor(Math.random() * 20),
      correctAnswers: Math.floor(Math.random() * 100),
    }));

    const currentUserData = {
      name: currentUser,
      score: userScore,
      gamesPlayed: userGamesPlayed,
      correctAnswers: userScore,
      avatar,
    };

    const allUsers = [currentUserData, ...ghostUsers];
    allUsers.sort((a, b) => b.score - a.score);
    setRanking(allUsers);
  }, [userScore, userGamesPlayed, currentUser, avatar]);

  useEffect(() => {
    const currentGamesPlayed =
      parseInt(localStorage.getItem(`${currentUser}_gamesPlayed`)) || 0;
    if (currentGamesPlayed === userGamesPlayed) {
      const newGamesPlayed = currentGamesPlayed + 1;
      localStorage.setItem(`${currentUser}_gamesPlayed`, newGamesPlayed);
      setUserGamesPlayed(newGamesPlayed);
    }
  }, []);

  return (
    <div className="ranking-container">
      <h1>🇧🇷 TOP PLAYERS</h1>
      <h2 className="user-subtitle">
        Sua posição:{" "}
        {ranking.findIndex((user) => user.name === currentUser) + 1} | Jogos
        jogados:{" "}
        {ranking.find((user) => user.name === currentUser)?.gamesPlayed} |
        Acertos:{" "}
        {ranking.find((user) => user.name === currentUser)?.correctAnswers}
      </h2>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontuação</th>
            <th>Jogos Jogados</th>
            <th>Acertos</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((user, index) => (
            <tr
              key={index}
              className={user.name === currentUser ? "highlight" : ""}
            >
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
              <td>{user.gamesPlayed}</td>
              <td>{user.correctAnswers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersRanking;
