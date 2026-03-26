import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Capabilities' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // ✅ Unified login check (no logic change, just consistency)
  const isLoggedIn =
    user ||
    localStorage.getItem('admin') ||
    localStorage.getItem('user');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const cartUser = JSON.parse(localStorage.getItem('user')) || null;
  const cartKey = cartUser?.email ? `cart_${cartUser.email}` : 'cart_guest';

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    setCartCount(cart.length);
  }, [cartKey]);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  // ✅ Proper logout cleanup
  const handleLogout = () => {
    logout();
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="luxury-navbar">
      {/* BRAND */}
      <div className="luxury-navbar__brand">
        <Link to="/" className="luxury-navbar__logo">
          SBM Apparels
        </Link>
        <span className="luxury-navbar__tagline">
          Recycled Textile Manufacturing
        </span>
      </div>

      {/* NAV LINKS */}
      <nav className={`luxury-nav ${isMenuOpen ? 'luxury-nav--open' : ''}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="luxury-nav__link"
            onClick={() => setIsMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* ACTIONS */}
      <div className="luxury-navbar__actions">

        {/* SEARCH */}
        <button
          className="luxury-icon"
          aria-label="Search"
          onClick={() => navigate('/products')}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

        {/* ✅ CART (ONLY WHEN LOGGED IN) */}
        {isLoggedIn && (
          <button
            className="luxury-icon"
            aria-label="Cart"
            onClick={() => navigate('/cart')}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M6 6H19L18 14H8L6 6Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="20" r="1" fill="currentColor"/>
              <circle cx="17" cy="20" r="1" fill="currentColor"/>
            </svg>
            {cartCount > 0 && <span className="luxury-badge">{cartCount}</span>}
          </button>
        )}

        {/* USER / LOGOUT */}
        {isLoggedIn ? (
          <>
            <span className="luxury-navbar__username">
              {user || 'Admin'}
            </span>

            <button
              className="luxury-btn-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="luxury-icon"
            aria-label="Profile"
            onClick={() => navigate('/login')}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C15 12 17 10 17 7C17 4 15 2 12 2C9 2 7 4 7 7C7 10 9 12 12 12Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 22C4 18 8 15 12 15C16 15 20 18 20 22" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        )}

        {/* MENU */}
        <button
          className="luxury-icon luxury-icon--menu"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 6H21" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 18H21" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
