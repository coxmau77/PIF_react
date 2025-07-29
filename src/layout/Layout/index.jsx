// src/layout/Layout/index.jsx
import { Nav } from '../Nav';
import { Footer } from '../Footer';

export function Layout({ children, cartItems, cartOpen, setCartOpen, updateCartItemQuantity }) {
    return (
        <>
            <Nav
              cartItems={cartItems}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              updateCartItemQuantity={updateCartItemQuantity}
            />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

// Usage example (e.g., in a page component)
// import { Layout } from '../layout/Layout';
// import { Home } from '../pages/Home';

// export function SomePage() {
//     return (
//         <Layout
//           cartItems={cartItems}
//           cartOpen={cartOpen}
//           setCartOpen={setCartOpen}
//         >
        //   <Home />
//         </Layout>
//     );
// }