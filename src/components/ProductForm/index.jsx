// src/components/ProductForm/index.jsx

import { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';

// URL correcta de tu recurso en MockAPI
const MOCKAPI_URL = 'https://68896f424c55d5c739526026.mockapi.io/api/v1/productos';

const initialState = {
  nombre: '',
  precio: '',
  descripcion: '',
  imagen: '',
  categoria: ''
};

const initialErrors = {
  nombre: '',
  precio: '',
  descripcion: '',
  imagen: '',
  categoria: ''
};

export default function ProductForm({ onSubmit }) {
  const { role } = useAuth();
  const [form, setForm] = useState(initialState);
  const [errores, setErrores] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  if (role !== 'admin') return <p>No tienes permisos para acceder a este formulario.</p>;

  // Validaciones
  const validate = (fieldValues = form) => {
    let temp = { ...errores };
    if ('nombre' in fieldValues) {
      temp.nombre = !fieldValues.nombre
        ? 'El nombre es obligatorio.'
        : fieldValues.nombre.length < 3
        ? 'Mínimo 3 caracteres.'
        : fieldValues.nombre.length > 50
        ? 'Máximo 50 caracteres.'
        : '';
    }
    if ('precio' in fieldValues) {
      temp.precio = !fieldValues.precio
        ? 'El precio es obligatorio.'
        : isNaN(fieldValues.precio) || Number(fieldValues.precio) < 0
        ? 'Debe ser un número mayor o igual a 0.'
        : '';
    }
    if ('descripcion' in fieldValues) {
      temp.descripcion = !fieldValues.descripcion
        ? 'La descripción es obligatoria.'
        : fieldValues.descripcion.length < 10
        ? 'Mínimo 10 caracteres.'
        : fieldValues.descripcion.length > 200
        ? 'Máximo 200 caracteres.'
        : '';
    }
    if ('imagen' in fieldValues) {
      temp.imagen = !fieldValues.imagen ? 'La URL de la imagen es obligatoria.' : '';
    }
    if ('categoria' in fieldValues) {
      temp.categoria = !fieldValues.categoria ? 'La categoría es obligatoria.' : '';
    }
    setErrores({ ...temp });
    return Object.values(temp).every(x => x === '');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validate({ [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setApiError('');
    setSuccess(false);
    if (validate()) {
      setLoading(true);
      try {
        // Enviar a MockAPI
        const response = await fetch(MOCKAPI_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: form.nombre,
            precio: form.precio,
            descripcion: form.descripcion,
            imagen: form.imagen,
            categoria: form.categoria
          })
        });
        if (!response.ok) throw new Error('Error al crear el producto');
        setSuccess(true);
        setForm(initialState);
        setErrores(initialErrors);
        if (onSubmit) onSubmit(form);
      } catch (err) {
        setApiError(err.message || 'Error de red');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Cargar nuevo producto</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          Nombre:
          <input name="nombre" value={form.nombre} onChange={handleChange} disabled={loading} />
          {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
        </label>
        <label>
          Precio:
          <input name="precio" value={form.precio} onChange={handleChange} type="number" min="0" step="0.01" disabled={loading} />
          {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
        </label>
        <label>
          Descripción:
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} disabled={loading} />
          {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}
        </label>
        <label>
          Imagen (URL):
          <input name="imagen" value={form.imagen} onChange={handleChange} disabled={loading} />
          {errores.imagen && <p style={{ color: 'red' }}>{errores.imagen}</p>}
        </label>
        <label>
          Categoría:
          <input name="categoria" value={form.categoria} onChange={handleChange} disabled={loading} />
          {errores.categoria && <p style={{ color: 'red' }}>{errores.categoria}</p>}
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Agregando...' : 'Agregar producto'}</button>
        {apiError && <p style={{ color: 'red', marginTop: 8 }}>{apiError}</p>}
        {success && <p style={{ color: 'green', marginTop: 8 }}>¡Producto agregado correctamente!</p>}
      </form>
    </section>
  );
}
