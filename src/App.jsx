// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import { Home, About } from './pages';
import ProductList from './components/ProductList';
import { useState } from 'react';

function App() {
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true); // <-- Abre el aside automáticamente
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout
            cartItems={cartItems}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            updateCartItemQuantity={updateCartItemQuantity}
            removeFromCart={removeFromCart}
          >
            <Home />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout
            cartItems={cartItems}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            updateCartItemQuantity={updateCartItemQuantity}
            removeFromCart={removeFromCart}
          >
            <About />
          </Layout>
        } />
        <Route path="/products" element={
          <Layout
            cartItems={cartItems}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            updateCartItemQuantity={updateCartItemQuantity}
            removeFromCart={removeFromCart}
          >
            <ProductList addToCart={addToCart} />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
