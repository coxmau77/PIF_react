// src/layout/Nav/CartAside/index.jsx
import React from 'react';
import styles from './cartAside.module.css';
import RemoveButton from '../RemoveButton';
import DeleteCartBtn from '../DeleteCartBtn';
import CheckOutBtn from '../CheckOutBtn';

export default function index({ open, onClose, asideRef, cartItems, updateCartItemQuantity }) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <aside
            ref={asideRef}
            className={`${styles.cartAside} ${open ? styles.open : ''}`}
            tabIndex={-1}
        >
            <button className={styles.closeBtn} onClick={onClose}>×</button>
            <h2>Shopping Cart</h2>
            <ul className={styles.cartItemsAside}>
                {cartItems.length === 0 && <li>Tu carrito está vacío</li>}
                {cartItems.map(item => (
                    <li key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <div className={styles.itemDetails}>
                            <span className={styles.itemTitle}>{item.title}</span>
                            <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                        </div>
                        <div className={styles.itemActions}>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={e => updateCartItemQuantity(item.id, e.target.value)}
                                className={styles.itemQuantity}
                            />
                            <RemoveButton />
                        </div>
                    </li>
                ))}
            </ul>
            <div className={styles.cartSummary}>
                <div>
                    <span className={styles.cartItemsCount}>{cartItems.length}</span>
                    <span>items</span>
                </div>
                <div>
                    <span>Total:</span>
                    <span className={styles.cartTotal}>${total.toFixed(2)}</span>
                </div>
                <DeleteCartBtn />
            </div>
            <CheckOutBtn />
        </aside>
    );
}