import { Link, Outlet } from "react-router-dom";
import styles from "/src/css/SettingsCSS/settingsPage.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.settingsPage}>
      <aside className={styles.sidebar}>
        <ul>
          <li>
            <Link to="account" className={styles.link}>
              Sua conta
            </Link>
          </li>
          <li>
            <Link to="configurations" className={styles.link}>
              Configurações
            </Link>
          </li>
        </ul>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
