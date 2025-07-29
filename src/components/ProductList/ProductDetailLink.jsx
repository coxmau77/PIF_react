// src/components/ProductList/ProductDetailLink.jsx
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

export default function ProductDetailLink({ id }) {
  const location = useLocation();
  return (
    <Link
      to={`/productos/${id}`}
      state={{ scrollY: window.scrollY }}
      style={{ marginLeft: 8 }}
    >
      <button type="button">Ver detalle</button>
    </Link>
  );
}
