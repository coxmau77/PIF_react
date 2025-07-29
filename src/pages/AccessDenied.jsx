// src/pages/AccessDenied.jsx
import MainLayoutRoute from '../components/MainLayoutRoute';
import { useAuth } from '../components/Auth/AuthContext';

export default function AccessDenied() {
  const { role } = useAuth();
  // Links permitidos para admin
  const adminLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/admin', label: 'Panel de Administración' },
    { to: '/about', label: 'Acerca de' },
    { to: '/products', label: 'Productos' },
    { to: '/contact', label: 'Contacto' },
  ];
  return (
    <MainLayoutRoute element={
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1>Acceso denegado</h1>
        <p>
          No tienes permisos para visualizar la sección solicitada.<br />
          Esto puede deberse a que tu cuenta no tiene el rol necesario.<br />
          Si crees que deberías tener acceso, por favor contacta al desarrollador para solicitar un cambio de nivel de rol.
        </p>
        <div style={{ margin: '2rem 0' }}>
          <h3>Secciones disponibles para tu rol:</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'inline-block', textAlign: 'left' }}>
            {role === 'admin' && adminLinks.map(link => (
              <li key={link.to}>
                <a href={link.to} style={{ color: '#007bff', textDecoration: 'underline' }}>{link.label}</a>
              </li>
            ))}
            {role !== 'admin' && (
              <li><a href="/" style={{ color: '#007bff', textDecoration: 'underline' }}>Inicio</a></li>
            )}
          </ul>
        </div>
      </div>
    } />
  );
}
