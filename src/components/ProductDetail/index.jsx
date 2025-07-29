// src/components/ProductDetail/index.jsx

import styles from './ProductDetail.module.css';
import { useEffect, useRef } from 'react';

export default function ProductDetail({ product, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (product && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [product]);

  if (!product) return null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={e => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <button className={styles.closeBtn} onClick={onClose}>×</button>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h2>{product.title}</h2>
      <span className={styles.category}>{product.category}</span>
      <span className={styles.rating}>
        {Array.from({ length: Math.round(product.rating.rate) }).map((_, i) => '⭐')}
        <span style={{ marginLeft: 8, color: '#888', fontSize: '0.95em' }}>
          ( {product.rating.rate} estrellas de {product.rating.count} votos )
        </span>
      </span>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>Precio: ${product.price}</p>
    </dialog>
  );
}
