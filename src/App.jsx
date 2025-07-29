// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import CartLayoutRoute from './components/CartLayoutRoute';
import { Home, About , Contact } from './pages';
import ProductoDetalle from './pages/ProductoDetalle';
import ProductList from './components/ProductList';
import { CartProvider } from './components/Cart/CartContext';
import { AuthProvider } from './components/Auth/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<CartLayoutRoute element={<Home />} />} />
            <Route path="/about" element={<CartLayoutRoute element={<About />} />} />
            <Route path="/products" element={<CartLayoutRoute element={<ProductList />} />} />
            <Route path="/productos/:id" element={<CartLayoutRoute element={<ProductoDetalle />} />} />
            <Route path="/contact" element={<CartLayoutRoute element={<Contact />} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            {/* Ejemplo de ruta protegida: */}
            <Route path="/perfil" element={
              <ProtectedRoute>
                <CartLayoutRoute element={<div>Mi perfil privado</div>} />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
