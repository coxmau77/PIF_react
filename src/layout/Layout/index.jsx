// src/layout/Layout/index.jsx
import { Nav } from '../Nav';
import { Footer } from '../Footer';

export function Layout({ children }) {
    return (
        <>
            <Nav />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}