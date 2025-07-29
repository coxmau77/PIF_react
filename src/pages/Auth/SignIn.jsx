// src/pages/Auth/SignIn.jsx
import { useState } from 'react';
import { useAuth } from '../../components/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    try {
      signIn(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} autoComplete="on">
        <label htmlFor="signin-username">Usuario
          <input id="signin-username" name="username" value={form.username} onChange={handleChange} required autoComplete="username" />
        </label>
        <label htmlFor="signin-password">Contraseña
          <input id="signin-password" name="password" type="password" value={form.password} onChange={handleChange} required autoComplete="current-password" />
        </label>
        <button type="submit">Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
}
