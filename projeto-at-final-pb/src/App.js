import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home/Home";
import SettingsPage from "./components/SettingsPage/settingsPage";
import AccountPage from "./components/SettingsPage/Account/account";
import Configuracoes from "./components/SettingsPage/Configurations/configurations";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieRanking from "./components/Ranking/MovieRanking";
import MovieList from "./components/MovieList/MovieList";
import LoginPage from "./components/LoginPage/LoginPage";
import MovieDetails from "./components/MovieList/MovieDetails";
import Quiz from "./components/Quizz/Quizz";
import UsersRanking from "./components/UsersRanking/UsersRanking";
import Error404 from "./components/Error404";
import { AuthProvider, useAuth } from "../Context/AuthContext";
import { ThemeProvider, useTheme } from "../Context/ThemeContext";
import "./css/App.css";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Router>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </Router>
    </div>
  );
}

function Main() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!localStorage.getItem("firstVisit")) {
      localStorage.setItem("firstVisit", "true");
    }
  }, []);

  if (
    !isLoggedIn &&
    location.pathname !== "/" &&
    localStorage.getItem("firstVisit") === "true"
  ) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<SettingsPage />}>
          <Route path="account" element={<AccountPage />} />
          <Route path="configurations" element={<Configuracoes />} />
        </Route>
        <Route path="/playersranking" element={<UsersRanking />} />
        <Route path="/ranking" element={<MovieRanking />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movielist" element={<MovieList />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
