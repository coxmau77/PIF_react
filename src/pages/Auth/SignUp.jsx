// src/pages/Auth/SignUp.jsx
import { useState } from 'react';
import { useAuth } from '../../components/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    try {
      signUp(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} autoComplete="on">
        <label htmlFor="signup-username">Usuario
          <input id="signup-username" name="username" value={form.username} onChange={handleChange} required autoComplete="username" />
        </label>
        <label htmlFor="signup-password">Contraseña
          <input id="signup-password" name="password" type="password" value={form.password} onChange={handleChange} required autoComplete="new-password" />
        </label>
        <label htmlFor="signup-role">Rol
          <select id="signup-role" name="role" value={form.role} onChange={handleChange} required>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">Registrarse</button>
          <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
}
