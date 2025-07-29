// src/components/Auth/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function getStoredUser() {
  const data = localStorage.getItem('authUser');
  return data ? JSON.parse(data) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  // signUp: guarda usuario en localStorage (simulación)
  const signUp = ({ username, password, role }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
      throw new Error('El usuario ya existe');
    }
    const newUser = { username, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser({ username, role });
  };

  // signIn: verifica credenciales
  const signIn = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) throw new Error('Credenciales incorrectas');
    setUser({ username: found.username, role: found.role });
  };

  // signOut: elimina sesión
  const signOut = () => setUser(null);

  const isAuthenticated = !!user;
  const role = user?.role || null;

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
