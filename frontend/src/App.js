import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminOrders from './pages/AdminOrders';
import AdminReviewPanel from './pages/AdminReviewPanel';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AddProduct from './components/admin/AddProduct';
import EditProduct from './components/admin/EditProduct';

// Import pages
import Home from './pages/Home';
import Products from './pages/Products';
import Category from './pages/Category';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/CartTemp';
import ProductDetails from './pages/ProductDetails';
import Checkouttemp from './pages/Checkouttemp';
import VirtualTryOn from "./pages/VirtualTryOn";

function AppContent() {
  const location = useLocation();
  const isAdmin = localStorage.getItem('admin') === 'true';
  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideFooterRoutes = ['/login'];

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div className="app">
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkouttemp" element={<Checkouttemp />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/virtual-try-on" element={<VirtualTryOn />} />

            {/* Admin Routes - Protected */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/add"
              element={isAdmin ? <AddProduct /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/edit/:id"
              element={isAdmin ? <EditProduct /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/orders"
              element={isAdmin ? <AdminOrders /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/admin-reviews"
              element={isAdmin ? <AdminReviewPanel /> : <Navigate to="/admin/login" />}
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Footer only on non-admin & non-hidden pages */}
        {!isAdminRoute && !hideFooterRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
