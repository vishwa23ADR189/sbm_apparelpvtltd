import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState('');

  const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        // Set default selected size to first available size or M
        const defaultSize = data.sizes && data.sizes.length > 0 ? data.sizes[0] : 'M';
        setSelectedSize(defaultSize);
        setSizeError('');
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Unable to load this product right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize) {
      setSizeError('Please select a size');
      return;
    }

    addToCart({
      ...product,
      _id: product._id || product.id,
      image: product.image || (product.images?.[0] ?? ''),
      selectedSize,
      quantity: 1,
    });

    navigate('/cart');
  };

  const images = product?.images?.length ? product.images : [product?.image || ''];
  const mainImage = images[currentImageIndex] || '';
  const availableSizes = product?.sizes && product.sizes.length > 0
    ? product.sizes
    : AVAILABLE_SIZES;

  if (loading) {
    return (
      <div className="page-status">
        <p>Loading…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-status">
        <p>{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <section className="product-details">
      <div className="product-details__container">
        <div className="product-details__gallery">
          <img
            className="product-details__main"
            src={mainImage}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1520975927760-8a17f74779f4?auto=format&fit=crop&w=1200&q=80';
            }}
          />

          {images.length > 1 && (
            <div className="product-details__thumbs">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={`product-details__thumb ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1520975927760-8a17f74779f4?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-details__info">
          <h1 className="product-details__title">{product.name}</h1>
          <div className="product-details__meta">
            {product.category && <span>{product.category}</span>}
            <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          </div>

          <p className="product-details__price">₹{product.price?.toFixed(2)}</p>

          <p className="product-details__description">
            {product.description ||
              'A premium piece designed with refined details and elevated materials.'}
          </p>

          {/* Size Selection */}
          <div className="product-details__sizes">
            <label className="product-details__size-label">Select Size:</label>
            <div className="product-details__size-options">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`product-details__size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError('');
                  }}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && <span className="product-details__size-error">{sizeError}</span>}
          </div>

          <div className="product-details__actions">
            <button
              className="btn btn--solid"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="btn btn--outline" onClick={() => navigate('/products')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
