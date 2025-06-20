// src/layout/Nav/index.jsx
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export function Nav() {
    return (
        <nav>
            <h1>
                <Link to="/">Mi Tienda!</Link>
            </h1>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/about">Acerca de</Link>
                </li>
            </ul>
        </nav>
    );
}