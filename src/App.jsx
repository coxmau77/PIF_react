// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import CartLayoutRoute from './components/CartLayoutRoute';
import { Home, About , Contact } from './pages';
import ProductList from './components/ProductList';
import { CartProvider } from './components/Cart/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CartLayoutRoute element={<Home />} />} />
          <Route path="/about" element={<CartLayoutRoute element={<About />} />} />
          <Route path="/products" element={<CartLayoutRoute element={<ProductList />} />} />
          <Route path="/contact" element={<CartLayoutRoute element={<Contact />} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
