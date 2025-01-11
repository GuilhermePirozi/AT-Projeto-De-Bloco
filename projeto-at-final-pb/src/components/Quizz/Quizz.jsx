import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import "/src/css/QuizzCSS/Quizz.css";
import LoadingScreen from "./LoadingScreen";
import desktopIMG from "/src/assets/logo-desktop.png";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();
  const { updateScore, updateGamesPlayed, currentUser, gamesPlayed } =
    useAuth();

  const apiKey = "f024c47f63aa01f439f0f7fc51d6d0d8";

  const isAsianName = (name) => {
    const asianRegex = /[\uAC00-\uD7AF\u4E00-\u9FFF\u3040-\u30FF\uFF66-\uFF9F]/;
    return asianRegex.test(name);
  };

  const isExcludedMovie = (originalLanguage) => {
    const allowedLanguages = ["pt", "en", "fr", "es", "it", "de"];
    return !allowedLanguages.includes(originalLanguage);
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const fetchQuestions = async () => {
    try {
      let movies = [];
      for (let i = 1; i <= 3; i++) {
        const randomPage = Math.floor(Math.random() * 500) + 1;
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${randomPage}`
        );
        const movieData = await movieResponse.json();

        movies = [
          ...movies,
          ...movieData.results.filter(
            (movie) => !isExcludedMovie(movie.original_language)
          ),
        ];
      }

      const shuffledMovies = shuffleArray(movies).slice(0, 10);

      const questionsData = await Promise.all(
        shuffledMovies.map(async (movie) => {
          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=pt-BR`
          );
          const detailsData = await detailsResponse.json();

          const creditsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}&language=pt-BR`
          );
          const creditsData = await creditsResponse.json();

          const randomPeopleResponse = await fetch(
            `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=pt-BR&page=1`
          );
          const randomPeopleData = await randomPeopleResponse.json();

          const randomPeople = randomPeopleData.results
            .map((person) => person.name)
            .filter((name) => !isAsianName(name));

          const director = creditsData.crew.find(
            (person) => person.job === "Director" && !isAsianName(person.name)
          )?.name;
          const cast = creditsData.cast.slice(0, 4).map((actor) => actor.name);
          const genres = detailsData.genres.map((genre) => genre.name);

          const questionTypes = [
            {
              question: `Qual o diretor do filme \"${movie.title}\"?`,
              correctAnswer: director || "Desconhecido",
              incorrectAnswers: shuffleArray(
                randomPeople.filter((name) => name !== director).slice(0, 3)
              ),
            },
            {
              question: `Qual o gênero principal do filme \"${movie.title}\"?`,
              correctAnswer: genres[0] || "Desconhecido",
              incorrectAnswers: shuffleArray(
                ["Ação", "Romance", "Terror"].filter((g) => g !== genres[0])
              ),
            },
            {
              question: `Qual destes atores atuou no filme \"${movie.title}\"?`,
              correctAnswer: cast[0] || "Desconhecido",
              incorrectAnswers: shuffleArray(
                randomPeople.filter((name) => !cast.includes(name)).slice(0, 3)
              ),
            },
            {
              question: `Em que ano o filme \"${movie.title}\" foi lançado?`,
              correctAnswer: String(
                detailsData.release_date?.split("-")[0] || "Desconhecido"
              ),
              incorrectAnswers: shuffleArray([
                String(
                  parseInt(detailsData.release_date?.split("-")[0]) - 1 ||
                    "1999"
                ),
                String(
                  parseInt(detailsData.release_date?.split("-")[0]) - 2 ||
                    "2000"
                ),
                String(
                  parseInt(detailsData.release_date?.split("-")[0]) + 1 ||
                    "2021"
                ),
              ]),
            },
          ];

          const selectedQuestion =
            questionTypes[Math.floor(Math.random() * questionTypes.length)];
          selectedQuestion.options = shuffleArray([
            ...selectedQuestion.incorrectAnswers,
            selectedQuestion.correctAnswer,
          ]);

          return selectedQuestion;
        })
      );

      setQuestions(questionsData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar as perguntas:", error);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswered(true);

    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer: selectedAnswer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setAnswered(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleViewRanking = () => {
    navigate("/playersranking");
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      updateScore(score);
      if (gamesPlayed === 0) {
        updateGamesPlayed();
      }
    }
  }, [
    currentQuestionIndex,
    score,
    updateScore,
    updateGamesPlayed,
    gamesPlayed,
  ]);

  if (loading) {
    return <LoadingScreen imageSrc={desktopIMG} />;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="quiz-summary">
        <h1>Resumo do Quiz</h1>
        <h2>
          Sua pontuação final foi: {score}/{questions.length}
        </h2>
        <div className="summary-container">
          {questions.map((question, index) => (
            <div key={index} className="summary-question">
              <h3>Pergunta {index + 1}:</h3>
              <p className="question-text">{question.question}</p>
              <p>
                <strong>Resposta correta:</strong> {question.correctAnswer}
              </p>
              <p>
                <strong>Sua resposta:</strong> {userAnswers[index]?.userAnswer}
              </p>
              <p
                className={`answer-status ${
                  userAnswers[index]?.isCorrect ? "correct" : "incorrect"
                }`}
              >
                {userAnswers[index]?.isCorrect ? "Certo!" : "Errado"}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="restart-quiz"
        >
          Reiniciar Quiz
        </button>
        <button onClick={handleViewRanking} className="view-ranking">
          Ver Ranking
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h1>Quiz de Filmes</h1>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          className={
            answered
              ? option === currentQuestion.correctAnswer
                ? "correct"
                : option === userAnswers[currentQuestionIndex]?.userAnswer
                ? "incorrect"
                : ""
              : ""
          }
        >
          {option}
        </button>
      ))}
      <p>
        Pergunta {currentQuestionIndex + 1} de {questions.length}
      </p>
      {answered && (
        <button onClick={nextQuestion} className="next-question">
          Próxima pergunta
        </button>
      )}
    </div>
  );
};

export default Quiz;
