// src/pages/Admin/ProductListAdmin.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/Auth/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import menuStyles from './ProductListAdminMenu.module.css';

const MOCKAPI_URL = 'https://68896f424c55d5c739526026.mockapi.io/api/v1/productos';

export default function ProductListAdmin() {
  const location = useLocation();
  const { role } = useAuth();
  const [productos, setProductos] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // CRUD: obtener productos
  const fetchProductos = () => {
    setLoading(true);
    fetch(MOCKAPI_URL)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then(data => setProductos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (role === 'admin') {
      fetchProductos();
    }
    // eslint-disable-next-line
  }, [role]);

  // CRUD: eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    setRemovingId(id);
    setTimeout(async () => {
      try {
        const res = await fetch(`${MOCKAPI_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar producto');
        setProductos(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        setError(err.message);
      } finally {
        setRemovingId(null);
      }
    }, 350); // tiempo de transición
  };

  // CRUD: editar producto (modal simple)
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '', precio: '', descripcion: '', imagen: '', categoria: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  const openEdit = (prod) => {
    setEditId(prod.id);
    setEditForm({
      nombre: prod.nombre || '',
      precio: prod.precio || '',
      descripcion: prod.descripcion || '',
      imagen: prod.imagen || '',
      categoria: prod.categoria || ''
    });
    setEditError('');
  };

  const closeEdit = () => {
    setEditId(null);
    setEditForm({ nombre: '', precio: '', descripcion: '', imagen: '', categoria: '' });
    setEditError('');
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    try {
      const res = await fetch(`${MOCKAPI_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (!res.ok) throw new Error('Error al editar producto');
      closeEdit();
      fetchProductos();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  if (role !== 'admin') return <p>No tienes permisos para ver los productos.</p>;
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Inicio', to: '/' },
    { label: 'Admin', to: '/admin' },
    { label: 'Productos', to: '/admin/productos' }
  ];

  // Admin menu sections
  const adminMenu = [
    { label: 'Panel', to: '/admin' },
    { label: 'Productos', to: '/admin/productos' },
    { label: 'Agregar producto', to: '/admin/productos/nuevo' }
  ];

  // Filtrado de productos
  const productosFiltrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(search.toLowerCase()) ||
    p.descripcion?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      {/* Helmet eliminado temporalmente por incompatibilidad con React 19 */}
      <h2>Listado de productos (admin)</h2>
      {/* Breadcrumb */}
      <nav className={menuStyles.breadcrumb} aria-label="breadcrumb">
        {breadcrumbs.map((bc, i) => (
          <span key={bc.to}>
            <Link to={bc.to}>{bc.label}</Link>
            {i < breadcrumbs.length - 1 && <span className={menuStyles.breadcrumbSep}>/</span>}
          </span>
        ))}
      </nav>
      {/* Admin menu */}
      <nav className={menuStyles.menuAdmin}>
        {adminMenu.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={location.pathname === item.to ? menuStyles.active : ''}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          id="admin-product-search"
          name="admin-product-search"
          type="text"
          className="form-control form-control-lg"
          placeholder="Buscar por nombre, categoría o descripción..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>
      {productosFiltrados.length === 0 ? (
        <p>No hay productos que coincidan con la búsqueda.</p>
      ) : (
        <div className="container">
          <div className="row g-4">
            {productosFiltrados.map(prod => (
              <div key={prod.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-header p-0 border-0 bg-transparent">
                    <img src={prod.imagen} alt={prod.nombre} className="card-img-top" style={{ objectFit: 'contain', height: 220, background: '#f8f9fa' }} />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{prod.nombre}</h5>
                    <span className="fw-bold text-success mb-2">${prod.precio}</span>
                    <div className="mb-2 text-muted small">Categoría: {prod.categoria}</div>
                    <div className="mb-2 card-text">{prod.descripcion}</div>
                    <div className="mt-auto d-flex gap-2">
                      <button onClick={() => openEdit(prod)} className="btn btn-outline-primary btn-sm">Editar</button>
                      <button onClick={() => handleDelete(prod.id)} className="btn btn-outline-danger btn-sm">Eliminar</button>
                    </div>
                    <div className="text-end text-secondary small mt-2">ID: {prod.id}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {editId && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleEditSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 8px #0002' }}>
            <h3>Editar producto</h3>
            <label>
              Nombre:
              <input name="nombre" value={editForm.nombre} onChange={handleEditChange} required />
            </label>
            <label>
              Precio:
              <input name="precio" value={editForm.precio} onChange={handleEditChange} type="number" min="0" step="0.01" required />
            </label>
            <label>
              Descripción:
              <textarea name="descripcion" value={editForm.descripcion} onChange={handleEditChange} required />
            </label>
            <label>
              Imagen (URL):
              <input name="imagen" value={editForm.imagen} onChange={handleEditChange} required />
            </label>
            <label>
              Categoría:
              <input name="categoria" value={editForm.categoria} onChange={handleEditChange} required />
            </label>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button type="submit" disabled={editLoading}>{editLoading ? 'Guardando...' : 'Guardar'}</button>
              <button type="button" onClick={closeEdit}>Cancelar</button>
            </div>
            {editError && <p style={{ color: 'red' }}>{editError}</p>}
          </form>
        </div>
      )}
    </section>
  );
}
