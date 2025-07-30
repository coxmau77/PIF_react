// src/pages/Admin/Admin.jsx
import ProductForm from '../../components/ProductForm';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h1>Panel de Administración</h1>
      <p>Solo accesible para usuarios con rol <b>admin</b>.</p>
      <nav style={{ margin: '2rem 0' }}>
        <Link to="/admin/productos" style={{ fontWeight: 'bold', color: '#1976d2', textDecoration: 'none' }}>
          Ver listado de productos
        </Link>
      </nav>
      <div style={{ marginTop: 32, textAlign: 'left' }}>
        <ProductForm />
      </div>
    </div>
  );
}
