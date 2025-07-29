// src/layout/Nav/CartAside/index.jsx
import React from 'react';
import styles from './cartAside.module.css';
import RemoveButton from '../RemoveButton';

export default function index({ open, onClose, asideRef }) {
  return (
    <aside
      ref={asideRef}
      className={`${styles.cartAside} ${open ? styles.open : ''}`}
      tabIndex={-1}
    >
      <button className={styles.closeBtn} onClick={onClose}>×</button>
      <h2>Shopping Cart</h2>
      <ul className={styles.cartItemsAside}>
        <li>
            <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Product image x ..." />
            <div className={styles.itemDetails}>
                <span className={styles.itemName}>Item 1</span>
                <span className={styles.itemPrice}>$10.00</span>
            </div>
            <div className={styles.itemActions}>
            <input type="number" min="1" defaultValue="1" className={styles.itemQuantity} />
            <RemoveButton />
            </div>
        </li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
        <div className={styles.cartSummary}>
            <span>Total:</span>
            <span>$30.00</span>
        </div>
        <button className={styles.deleteCartBtn}>Delete Cart</button>
        <button className={styles.checkoutBtn}>Checkout</button>
    </aside>
  );
}