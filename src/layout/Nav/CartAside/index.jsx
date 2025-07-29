// src/layout/Nav/CartAside/index.jsx
import React from 'react';
import styles from './cartAside.module.css';
import RemoveButton from '../RemoveButton';
import DeleteCartBtn from '../DeleteCartBtn';
import CheckOutBtn from '../CheckOutBtn';

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
                    <img src="#" alt="Product image x ..." />
                    <div className={styles.itemDetails}>
                        <span className={styles.itemName}>Item 1</span>
                        <span className={styles.itemPrice}>$10.00</span>
                    </div>
                    <div className={styles.itemActions}>
                        <input type="number" min="1" defaultValue="1" className={styles.itemQuantity} />
                        <RemoveButton />
                    </div>
                </li>
                <li>
                    <img src="#" alt="Product image y ..." />
                    <div className={styles.itemDetails}>
                        <span className={styles.itemName}>Item 2</span>
                        <span className={styles.itemPrice}>$20.00</span>
                    </div>
                    <div className={styles.itemActions}>
                        <input type="number" min="1" defaultValue="1" className={styles.itemQuantity} />
                        <RemoveButton />
                    </div>
                </li>
                <li>
                    <img src="#" alt="Product image z ..." />
                    <div className={styles.itemDetails}>
                        <span className={styles.itemName}>Item 3</span>
                        <span className={styles.itemPrice}>$30.00</span>
                    </div>
                    <div className={styles.itemActions}>
                        <input type="number" min="1" defaultValue="1" className={styles.itemQuantity} />
                        <RemoveButton />
                    </div>
                </li>
            </ul>
            <div className={styles.cartSummary}>
                <div>
                    <span className={styles.cartItemsCount}>3</span>
                    <span>items</span>
                </div>
                <div>
                    <span>Total:</span>
                    <span className={styles.cartTotal}>$60.00</span>
                </div>
                <DeleteCartBtn />
            </div>

            <CheckOutBtn />

        </aside>
    );
}