// src/layout/Footer/index.jsx
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer>
      <p className={styles.copyright_text}>&copy; 2025 - Mi Tienda React - Mauricio Cox</p>
      <small className={styles.contact_info}>
        Contacto: mauricio@email.com |
        <a href="https://github.com/mauriciocox" target="_blank" rel="noopener noreferrer">GitHub</a> |
        <a href="https://linkedin.com/in/mauriciocox" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </small>
    </footer>
  );
}