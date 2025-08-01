// src/layout/Nav/index.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import UserMenu from './UserMenu';
import CartButton from './CartButton';
import CartAside from './CartAside';

const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/about', label: 'Acerca de' },
    { to: '/products', label: 'Productos' },
    { to: '/contact', label: 'Contacto' },
];

export function Nav({ cartItems, cartOpen, setCartOpen, updateCartItemQuantity, removeFromCart, clearCart }) {
    const asideRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    // Cierra el menú móvil al navegar o al hacer click fuera
    useEffect(() => {
        if (!mobileMenuOpen) return;
        function closeOnResize() {
            if (window.innerWidth > 900) setMobileMenuOpen(false);
        }
        function handleClickOutside(event) {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        }
        window.addEventListener('resize', closeOnResize);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('resize', closeOnResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    return (
        <>

            <nav className={styles.navContainer}>
                <h1 className={styles.brand}>
                    <Link to="/" >Mi Tienda React</Link>
                </h1>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                      className={styles.navMenuToggle}
                      aria-label="Abrir menú"
                      onClick={() => setMobileMenuOpen(o => !o)}
                  >
                      ☰
                  </button>
                  {mobileMenuOpen && (
                    <ul
                      className={styles.navMobileMenu}
                      ref={mobileMenuRef}
                    >
                        {navLinks.map(link => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                  )}
                </div>
                <ul className={styles.desktopMenu}>
                  {navLinks.map(link => (
                      <li key={link.to}>
                          <Link to={link.to}>{link.label}</Link>
                      </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span onClick={() => setCartOpen(true)} style={{ cursor: 'pointer' }}>
                        <CartButton />
                    </span>
                    <UserMenu />
                </div>
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