import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "/Context/AuthContext";
import { FaTrophy } from "react-icons/fa";
import styles from "/src/css/Header.module.css";
import desktopIMG from "/src/assets/logo-desktop.png";
import defaultProfile from "/src/assets/profile.png";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const avatar =
    localStorage.getItem(`${currentUser}_avatar`) || defaultProfile;

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.headerPai}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link to="/home">
            <img src={desktopIMG} alt="Logo do site" className={styles.logo} />
          </Link>
        </div>

        <div className={styles.profileContainer}>
          <Link to="/playersranking" className={styles.trophyLink}>
            <FaTrophy className={styles.trophyIcon} />
          </Link>

          <img
            src={avatar}
            alt="Avatar do usuário"
            className={styles.profilePic}
            onClick={toggleDropdown}
          />

          {dropdownOpen && (
            <ul ref={dropdownRef} className={styles.dropdown}>
              <li>
                <Link to="/settings/account/" className={styles.dropdownLink}>
                  Sua conta
                </Link>
              </li>
              <li>
                <Link
                  to="/settings/configurations/"
                  className={styles.dropdownLink}
                >
                  Configurações
                </Link>
              </li>
              <li>
                <button
                  className={`${styles.dropdownLink} ${styles.logoutButton}`}
                  onClick={handleLogout}
                >
                  Deslogar
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
