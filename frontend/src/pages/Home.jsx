import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const CATEGORY_PRESETS = [
  {
    id: 'custom',
    title: 'Custom Apparel',
    subtitle: 'Tailored manufacturing solutions',
    image:
      'https://images.unsplash.com/photo-1581093458791-9d42e3a6c7c2?auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: 'corporate',
    title: 'Corporate Wear',
    subtitle: 'Professional & bulk production',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: 'oem',
    title: 'OEM / Private Label',
    subtitle: 'Manufacturing for global brands',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: 'sustainable',
    title: 'Sustainable Textiles',
    subtitle: 'Recycled & eco-friendly fabrics',
    image:
      'https://images.unsplash.com/photo-1618354691321-e851c56960d1?auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: 'quality',
    title: 'Quality Control',
    subtitle: 'Precision & export standards',
    image:
      'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1500&q=80',
  },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('http://localhost:5000/api/products?limit=12');
        setFeatured(data || []);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        .enhanced-hero {
          position: relative;
          background-size: cover;
          background-position: center;
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
        }

        .hero__content {
          position: relative;
          z-index: 2;
        }

        .enhanced-card {
          position: relative;
          background-size: cover;
          background-position: center;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .enhanced-card:hover {
          transform: scale(1.05);
        }

        .deal-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ff4d4f;
          color: #fff;
          padding: 4px 10px;
          font-size: 12px;
          border-radius: 20px;
          z-index: 2;
        }

        .offer-wrapper {
          position: relative;
        }

        .offer-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #28a745;
          color: white;
          padding: 5px 10px;
          font-size: 12px;
          border-radius: 20px;
          z-index: 2;
        }

        .products__grid,
        .categories__grid {
          display: grid;
          gap: 20px;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .products__grid,
          .categories__grid {
            grid-template-columns: 1fr;
          }

          .hero__title {
            font-size: 1.8rem;
          }
        }

        /* TABLET */
        @media (min-width: 769px) and (max-width: 1024px) {
          .products__grid,
          .categories__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* DESKTOP */
        @media (min-width: 1025px) {
          .products__grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .categories__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <main>
        {/* HERO */}
        <section
          className="hero enhanced-hero"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
          }}
        >
          <div className="hero__overlay"></div>

          <div className="hero__content">
            <p className="hero__label">SBM Apparels Pvt Limited</p>

            <h1 className="hero__title">
              Quality Recycled Textile Manufacturing
              <span>Trusted Global Apparel Partner</span>
            </h1>

            <p className="hero__subtitle">
              Custom clothing solutions with sustainable materials and export-quality production.
            </p>

            <div className="hero__actions">
              <button className="btn btn--primary" onClick={() => navigate('/contact')}>
                Contact Us
              </button>

              <button className="btn btn--secondary" onClick={() => navigate('/products')}>
                View Capabilities
              </button>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="categories" id="categories">
          <div className="categories__header">
            <h2 className="categories__title">Our Capabilities</h2>
            <p className="categories__subtitle">
              End-to-end apparel manufacturing designed for global standards.
            </p>
          </div>

          <div className="categories__grid">
            {CATEGORY_PRESETS.map((category) => (
              <article
                key={category.id}
                className="category-card enhanced-card"
                onClick={() => navigate(`/category/${category.id}`)}
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <span className="deal-badge">HOT</span>

                <div className="category-card__overlay">
                  <div>
                    <h3 className="category-card__title">{category.title}</h3>
                    <p className="category-card__subtitle">{category.subtitle}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* OFFERS */}
        <section className="products">
          <div className="products__header">
            <h2 className="products__title">Special Offers</h2>
            <p className="products__subtitle">
              Exclusive deals on bulk apparel manufacturing and custom orders.
            </p>
          </div>

          <div className="products__grid">
            {!isLoading &&
              featured.slice(0, 4).map((product, index) => (
                <div className="offer-wrapper" key={product._id || product.id}>
                  <span className="offer-tag">
                    {index % 2 === 0 ? '20% OFF' : 'LIMITED'}
                  </span>

                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
