// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayoutRoute from './components/MainLayoutRoute';
import { Home, About, Contact, Products } from './pages';
import NotFound from './pages/NotFound';
import ProductoDetalle from './pages/ProductoDetalle';
import { CartProvider } from './components/Cart/CartContext';
import { AuthProvider } from './components/Auth/AuthContext';
import RoleProtectedRoute from './components/Auth/RoleProtectedRoute';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import Admin from './pages/Admin/Admin';
import ProductListAdmin from './pages/Admin/ProductListAdmin';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayoutRoute />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="productos/:id" element={<ProductoDetalle />} />
              <Route path="contact" element={<Contact />} />
              <Route path="perfil" element={
                <RoleProtectedRoute allowedRoles={['user']}>
                  <div>Mi perfil privado</div>
                </RoleProtectedRoute>
              } />
              <Route path="admin" element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <Admin />
                </RoleProtectedRoute>
              } />
              <Route path="admin/productos" element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <ProductListAdmin />
                </RoleProtectedRoute>
              } />
              <Route path="admin/productos/nuevo" element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <ProductForm />
                </RoleProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
