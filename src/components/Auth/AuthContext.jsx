// src/components/Auth/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function getStoredAuth() {
  const userData = localStorage.getItem('authUser');
  const token = localStorage.getItem('authToken');
  return userData && token ? { ...JSON.parse(userData), token } : null;
}

function generateFakeToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}


export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth());


  useEffect(() => {
    if (auth) {
      localStorage.setItem('authUser', JSON.stringify({ username: auth.username, role: auth.role }));
      localStorage.setItem('authToken', auth.token);
    } else {
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
    }
  }, [auth]);


  // signUp: guarda usuario en localStorage (simulación)
  const signUp = ({ username, password, role }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
      throw new Error('El usuario ya existe');
    }
    const newUser = { username, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    const token = generateFakeToken();
    setAuth({ username, role, token });
  };


  // signIn: verifica credenciales y genera token
  const signIn = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) throw new Error('Credenciales incorrectas');
    const token = generateFakeToken();
    setAuth({ username: found.username, role: found.role, token });
  };


  // signOut: elimina sesión y token
  const signOut = () => setAuth(null);


  const isAuthenticated = !!auth?.token;
  const role = auth?.role || null;


  return (
    <AuthContext.Provider value={{
      user: auth ? { username: auth.username, role: auth.role } : null,
      token: auth?.token || null,
      role,
      isAuthenticated,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
