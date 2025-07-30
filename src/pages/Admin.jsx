// src/pages/Admin.jsx
import ProductForm from '../components/ProductForm';

export default function Admin() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h1>Panel de Administración</h1>
      <p>Solo accesible para usuarios con rol <b>admin</b>.</p>
      <div style={{ marginTop: 32, textAlign: 'left' }}>
        <ProductForm />
      </div>
    </div>
  );
}
