import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * MODERN NEON MINIMAL HOME PAGE
 *
 * This is an example of how to use the neon design system
 * See NEON_DESIGN_GUIDE.md for complete component documentation
 */

const ModernHome = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: 'Orange Summer Suit',
      description: 'Perfect for casual outings',
      price: 320,
      originalPrice: 500,
      discount: 36,
      rating: 4.5,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1591047139829-c91a6a2fb321?w=400',
    },
    {
      id: 2,
      name: 'Bright Pink Jacket',
      description: 'Modern and stylish',
      price: 450,
      originalPrice: 750,
      discount: 40,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400',
    },
    {
      id: 3,
      name: 'Elegant Green Dress',
      description: 'Perfect for any occasion',
      price: 600,
      originalPrice: 999,
      discount: 40,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1595777707802-da763773364e?w=400',
    },
    {
      id: 4,
      name: 'Neon Casual Shirt',
      description: 'Contemporary fashion',
      price: 280,
      originalPrice: 450,
      discount: 38,
      rating: 4.3,
      reviews: 72,
      image: 'https://images.unsplash.com/photo-1552062407-291826ad9f30?w=400',
    },
  ];

  const collections = [
    { id: 1, name: 'Summer Collection', accent: '#CCFF00' },
    { id: 2, name: 'Party Wear', accent: '#FF10F0' },
    { id: 3, name: 'Casual Vibes', accent: '#00F0FF' },
    { id: 4, name: 'Ethnic Wear', accent: '#CCFF00' },
  ];

  return (
    <div className="App">
      {/* NAVBAR */}
      <nav className="navbar-modern">
        <div className="navbar-brand">✨ SBM APPARELS</div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/cart">Cart (0)</a></li>
        </ul>
        <div className="navbar-actions">
          <span style={{ fontWeight: 700, fontSize: '13px' }}>Welcome!</span>
          <button className="btn-primary-neon">Login</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section-neon" style={{ marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          Your <span className="neon-word">Fashion</span> Destination
        </h1>
        <p style={{ marginBottom: '2rem' }}>
          Discover bold neon vibes and contemporary styles curated just for you
        </p>
        <div className="hero-buttons">
          <button
            className="btn-primary-neon"
            onClick={() => navigate('/products')}
            style={{ fontSize: '1rem', padding: '12px 28px' }}
          >
            Shop Now
          </button>
          <button
            className="btn-accent-neon"
            onClick={() => navigate('/products')}
            style={{ fontSize: '1rem', padding: '12px 28px' }}
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', marginBottom: '4rem' }}>
        {/* FEATURED COLLECTION */}
        <div className="section-container">
          <div className="section-header">
            <div>
              <h2 className="section-title-modern">
                Featured
                <span className="section-title-accent" style={{ marginLeft: '0.8rem' }}>TRENDING</span>
              </h2>
            </div>
            <a href="/products" className="see-all-link">Explore All</a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card-neon">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>

                  <div className="product-price">
                    <span className="price-current">₹{product.price}</span>
                    <span className="price-original">₹{product.originalPrice}</span>
                    <span className="discount-badge">{product.discount}% OFF</span>
                  </div>

                  <div className="product-rating">
                    <span className="rating-stars">
                      {'★'.repeat(Math.floor(product.rating))}
                    </span>
                    <span className="rating-count">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="product-actions">
                    <button
                      className="btn-add-cart"
                      onClick={() => alert(`Added ${product.name} to cart!`)}
                    >
                      Add to Cart
                    </button>
                    <button className="btn-wishlist">♡</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLLECTIONS GRID */}
        <div className="section-container" style={{ marginTop: '3rem' }}>
          <h2 className="section-title-modern" style={{ marginBottom: '2rem' }}>
            Browse <span className="gradient-text">Collections</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {collections.map(collection => (
              <div
                key={collection.id}
                style={{
                  background: `linear-gradient(135deg, rgba(${
                    collection.accent === '#CCFF00' ? '204, 255, 0' : '255, 16, 240'
                  }, 0.1), rgba(${
                    collection.accent === '#CCFF00' ? '255, 16, 240' : '204, 255, 0'
                  }, 0.05))`,
                  padding: '2rem',
                  borderRadius: '10px',
                  border: `1px solid ${collection.accent}20`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = collection.accent;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${collection.accent}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${collection.accent}20`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  background: collection.accent,
                  marginBottom: '1rem',
                }}></div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {collection.name}
                </h3>
                <p style={{ color: '#888', marginBottom: '1rem' }}>
                  Discover our exclusive collection
                </p>
                <button className="btn-accent-neon" style={{ fontSize: '0.9rem' }}>
                  Shop Now →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div style={{
          background: 'linear-gradient(135deg, #FF10F0 0%, #CCFF00 100%)',
          borderRadius: '12px',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginTop: '3rem',
          color: '#111',
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Limited Time Offer
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.9 }}>
            Get 30% off on your first order
          </p>
          <button
            className="btn-primary-neon"
            onClick={() => navigate('/products')}
            style={{ fontSize: '1rem', padding: '12px 28px' }}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        background: '#111',
        color: '#fff',
        padding: '3rem 2rem',
        marginTop: '4rem',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}>
            <div>
              <h3 style={{ marginBottom: '1rem' }}>About Us</h3>
              <p style={{ color: '#aaa', lineHeight: 1.8 }}>
                SBM Apparels brings you the finest contemporary fashion with bold neon vibes and modern minimal aesthetics.
              </p>
            </div>
            <div>
              <h3 style={{ marginBottom: '1rem' }}>Quick Links</h3>
              <ul style={{ listStyle: 'none' }}>
                <li><a href="#" style={{ color: '#aaa', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#CCFF00'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Home</a></li>
                <li><a href="#" style={{ color: '#aaa', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#CCFF00'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Products</a></li>
                <li><a href="#" style={{ color: '#aaa', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#CCFF00'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ marginBottom: '1rem' }}>Contact</h3>
              <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Email: info@sbmapparels.com</p>
              <p style={{ color: '#aaa' }}>Phone: +91 XXXX XXXX XX</p>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #333',
            paddingTop: '2rem',
            textAlign: 'center',
            color: '#aaa',
          }}>
            <p>© 2024 SBM Apparels. All rights reserved. | Designed with ✨ using Neon Modern Design System</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernHome;
