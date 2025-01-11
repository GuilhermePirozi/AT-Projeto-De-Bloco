import React from "react";
import styles from "/src/css/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.socialMedia}>
        <div className={styles.left}>
          <span>Siga-nos em todas as redes sociais:</span>
        </div>
        <div className={styles.right}>
          <a href="#" className={styles.icon}>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className={styles.icon}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className={styles.icon}>
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a href="#" className={styles.icon}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className={styles.icon}>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="#" className={styles.icon}>
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </section>

      <section className={styles.links}>
        <div className={styles.container}>
          <div className={styles.column}>
            <h6>CINEQUIZ</h6>
            <div className={styles.underline}></div>
            <p>
              Teste seus conhecimentos com o CineQuiz! Descubra se você é um
              expert em filmes, desafie amigos e divirta-se com perguntas de
              todos os gêneros e épocas do cinema!
            </p>
          </div>
          <div className={styles.column}>
            <h6>LINKS ÚTEIS</h6>
            <div className={styles.underline}></div>
            <p>
              <a href="#!">Sua Conta</a>
            </p>
            <p>
              <a href="#!">Ajuda</a>
            </p>
          </div>
          <div className={styles.column}>
            <h6>CONTATO</h6>
            <div className={styles.underline}></div>
            <p>
              <FontAwesomeIcon icon={faHome} /> R. São José, 90 - Centro, Rio de
              Janeiro - RJ, 20010-020
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> contato.cinequiz@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> +55 (21) 4002-8922
            </p>
          </div>
        </div>
      </section>

      <div className={styles.copyright}>
        © 2024 Copyright: <a href="#!">CineQuiz.com</a>
      </div>
    </footer>
  );
}

export default Footer;
