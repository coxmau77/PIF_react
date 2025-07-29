// src/layout/Nav/index.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import CartButton from './CartButton';
import CartAside from './CartAside';

export function Nav({ cartItems, cartOpen, setCartOpen, updateCartItemQuantity, removeFromCart, clearCart }) {
    const asideRef = useRef(null);

    // Cierra el aside al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (asideRef.current && !asideRef.current.contains(event.target)) {
                setCartOpen(false);
            }
        }
        if (cartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [cartOpen, setCartOpen]);

    return (
        <>
            <nav>
                <h1 className={styles.brand}>
                    <Link to="/" >Mi Tienda React</Link>
                </h1>
                <ul>
                    <li><Link to="/" >Inicio</Link></li>
                    <li><Link to="/about">Acerca de</Link></li>
                    <li><Link to="/products">Productos</Link></li>
                </ul>
                <span onClick={() => setCartOpen(true)} style={{ cursor: 'pointer' }}>
                    <CartButton />
                </span>
            </nav>
            <CartAside
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                asideRef={asideRef}
                cartItems={cartItems}
                updateCartItemQuantity={updateCartItemQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
            />
        </>
    );
}