// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import MainLayoutRoute from './components/MainLayoutRoute';
import { Home, About , Contact } from './pages';
import NotFound from './pages/NotFound';
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
            <Route path="/" element={<MainLayoutRoute element={<Home />} />} />
            <Route path="/about" element={<MainLayoutRoute element={<About />} />} />
            <Route path="/products" element={<MainLayoutRoute element={<ProductList />} />} />
            <Route path="/productos/:id" element={<MainLayoutRoute element={<ProductoDetalle />} />} />
            <Route path="/contact" element={<MainLayoutRoute element={<Contact />} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            {/* Ejemplo de ruta protegida: */}
            <Route path="/perfil" element={
              <ProtectedRoute>
                <MainLayoutRoute element={<div>Mi perfil privado</div>} />
              </ProtectedRoute>
            } />
            <Route path="*" element={<MainLayoutRoute element={<NotFound />} />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
