import { useState } from "react";
import { useAuth } from "../../../../Context/AuthContext";
import styles from "/src/css/SettingsCSS/accountPage.module.css";
import defaultAvatar from "/src/assets/profile.png";

export default function AccountPage() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(
    localStorage.getItem(`${currentUser}_displayName`) || currentUser
  );
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem(`${currentUser}_avatar`) || defaultAvatar
  );
  const [bio, setBio] = useState(
    localStorage.getItem(`${currentUser}_bio`) || ""
  );

  const handleSave = () => {
    localStorage.setItem(`${currentUser}_displayName`, displayName);
    localStorage.setItem(`${currentUser}_avatar`, avatarUrl);
    localStorage.setItem(`${currentUser}_bio`, bio);
    alert("Informações salvas com sucesso!");
  };

  return (
    <div className={styles.accountPage}>
      <div className={styles.profileSection}>
        <img
          src={avatarUrl || defaultAvatar}
          alt="Avatar do usuário"
          className={styles.avatar}
        />
        <h2>{displayName}</h2>
      </div>
      <div className={styles.form}>
        <label>
          Nome de exibição:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          URL do avatar:
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </label>
        <label>
          Biografia:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Escreva algo sobre você..."
            rows="5"
          />
        </label>
        <button onClick={handleSave} className={styles.saveButton}>
          Salvar
        </button>
      </div>
    </div>
  );
}
