// src/layout/Nav/index.jsx
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export function Nav() {
    return (
        <nav>
            <h1 className={styles.brand}>
                <Link to="/" >Mi Tienda React</Link>
            </h1>
            <ul>
                <li><Link to="/" >Inicio</Link></li>
                <li><Link to="/about">Acerca de</Link></li>
                <li><Link to="/products">Productos</Link></li>
            </ul>
        </nav>
    );
}