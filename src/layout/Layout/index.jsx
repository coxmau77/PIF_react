// src/layout/Layout/index.jsx
import { Nav, Footer } from '../';

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