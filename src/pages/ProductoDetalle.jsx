// src/pages/ProductoDetalle.jsx
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './ProductoDetalle.module.css';

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Guardar scroll antes de navegar
  useEffect(() => {
    if (location.state && location.state.scrollY) {
      setTimeout(() => window.scrollTo(0, location.state.scrollY), 0);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>No se encontró el producto.</p>;

  const handleBack = () => {
    navigate(-1);
    // El scroll se restaura automáticamente si la navegación es push con scrollY
  };

  return (
    <div className={styles.detalleContainer}>
      <button className={styles.detalleBack} onClick={handleBack}>&larr; Volver</button>
      <img src={product.image} alt={product.title} className={styles.detalleImg} />
      <div className={styles.detalleInfo}>
        <h1 className={styles.detalleTitle}>{product.title}</h1>
        <span className={styles.detalleCategory}>{product.category}</span>
        <span className={styles.detalleRating}>
          {Array.from({ length: Math.round(product.rating.rate) }).map((_, i) => '⭐')}
          <span style={{ marginLeft: 8, color: '#888', fontSize: '0.95em' }}>
            ( {product.rating.rate} estrellas de {product.rating.count} votos )
          </span>
        </span>
        <p className={styles.detalleDescription}>{product.description}</p>
        <p className={styles.detallePrice}>Precio: ${product.price}</p>
      </div>
    </div>
  );
}
