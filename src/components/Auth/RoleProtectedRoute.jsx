// src/components/Auth/RoleProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AccessDenied from '../../pages/AccessDenied';

/**
 * Envuelve rutas que requieren autenticación y un rol específico.
 * @param {ReactNode} children - Elemento a renderizar si autorizado
 * @param {string|string[]} allowedRoles - Rol o array de roles permitidos
 */
export default function RoleProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (Array.isArray(allowedRoles)) {
    if (!allowedRoles.includes(role)) return <AccessDenied />;
  } else {
    if (role !== allowedRoles) return <AccessDenied />;
  }
  return children;
}
