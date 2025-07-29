// src/layout/Nav/UserMenu.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthContext';
import styles from './Nav.module.css';

export default function UserMenu() {
  const { user, isAuthenticated, signOut, role } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSignOut = () => {
    signOut();
    setOpen(false);
    navigate('/');
  };

  return (
    <div className={styles.userMenuWrapper} ref={menuRef}>
      <button className={styles.userMenuBtn} onClick={() => setOpen(o => !o)}>
        {isAuthenticated ? user.username : 'Cuenta'} ▼
      </button>
      {open && (
        <ul className={styles.userMenuDropdown}>
          {!isAuthenticated && <li><Link to="/login" onClick={() => setOpen(false)}>Iniciar sesión</Link></li>}
          {!isAuthenticated && <li><Link to="/signup" onClick={() => setOpen(false)}>Registrarse</Link></li>}
          {isAuthenticated && <li><Link to="/perfil" onClick={() => setOpen(false)}>Mi perfil</Link></li>}
          {isAuthenticated && role === 'admin' && <li><Link to="/admin" onClick={() => setOpen(false)}>Admin</Link></li>}
          {isAuthenticated && <li><button onClick={handleSignOut}>Cerrar sesión</button></li>}
        </ul>
      )}
    </div>
  );
}
