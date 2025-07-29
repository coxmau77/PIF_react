// src/layout/Layout/index.jsx
import { Nav } from '../Nav';
import { Footer } from '../Footer';

export function Layout({ children, cartItems, cartOpen, setCartOpen, updateCartItemQuantity, removeFromCart, clearCart }) {
    return (
        <>
            <Nav
              cartItems={cartItems}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              updateCartItemQuantity={updateCartItemQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}