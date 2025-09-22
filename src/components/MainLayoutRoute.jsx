import { Outlet } from 'react-router-dom';
import { Layout } from '../layout';
import { useCart } from './Cart/CartContext';

export default function MainLayoutRoute() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <Layout
      cartItems={cartItems}
      cartOpen={cartOpen}
      setCartOpen={setCartOpen}
      updateCartItemQuantity={updateCartItemQuantity}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
    >
      <Outlet />
    </Layout>
  );
}
