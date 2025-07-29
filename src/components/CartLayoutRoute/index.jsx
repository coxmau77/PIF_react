// src/components/CartLayoutRoute/index.jsx
import { Layout } from '../../layout';
import { useCart } from '../Cart/CartContext';

export default function CartLayoutRoute({ element }) {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    addToCart
  } = useCart();

  // Si el hijo es ProductList, le pasamos addToCart
  const child =
    element.type && element.type.name === 'ProductList'
      ? { ...element, props: { ...element.props, addToCart } }
      : element;

  return (
    <Layout
      cartItems={cartItems}
      cartOpen={cartOpen}
      setCartOpen={setCartOpen}
      updateCartItemQuantity={updateCartItemQuantity}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
    >
      {child}
    </Layout>
  );
}
