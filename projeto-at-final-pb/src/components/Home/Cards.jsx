import React from "react";
import { Link } from "react-router-dom";
import styles from "/src/css/HomeCSS/Cards.module.css";
import ListaDeFilmesIMG from "/src/assets/ListaDeFilmsIMG.png";
import RankingIMG from "/src/assets/RankingIMG.png";
import QuizIMG from "/src/assets/QuizIMG.jpg";
import BackgroundIMG from "/src/assets/backgroundHome.jpg";

const Cards = () => {
  return (
    <div
      className={styles.backgroundContainer}
      style={{ backgroundImage: `url(${BackgroundIMG})` }}
    >
      <div className={styles.cardContainer}>
        <Link
          to="/movielist"
          className={`${styles.card} ${styles.linkContainer}`}
        >
          <h2 className={`${styles.cardTitle} ${styles.cardTitleList}`}>
            MINHA LISTA
          </h2>
          <img
            src={ListaDeFilmesIMG}
            alt="Imagem Lista"
            className={styles.cardsIMG}
          />
          <div className={styles.cardDescription}>
            <span>Veja sua lista personalizada de filmes.</span>
            <p>
              Faça sua própria lista personalizada de seus filmes favoritos,
              avalie de acordo com estrelas e adicione comentários!
            </p>
          </div>
        </Link>

        <Link to="/quiz" className={`${styles.card} ${styles.linkContainer}`}>
          <h2 className={`${styles.cardTitle} ${styles.cardTitleQuiz}`}>
            JOGAR QUIZ
          </h2>
          <img src={QuizIMG} alt="Imagem Quiz" className={styles.cardsIMG} />
          <div className={styles.cardDescription}>
            <span>Teste seus conhecimentos sobre filmes.</span>
            <p>
              Responda perguntas e veja como está seu nível de conhecimento
              sobre o mundo do cinema!
            </p>
          </div>
        </Link>

        <Link
          to="/ranking"
          className={`${styles.card} ${styles.linkContainer}`}
        >
          <h2 className={`${styles.cardTitle} ${styles.cardTitleRanking}`}>
            RANKING DE FILMES
          </h2>
          <img
            src={RankingIMG}
            alt="Imagem Ranking"
            className={styles.cardsIMG}
          />
          <div className={styles.cardDescription}>
            <span>Confira os filmes mais bem avaliados.</span>
            <p>
              Explore e descubra os filmes mais populares e melhor avaliados por
              outros usuários.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
