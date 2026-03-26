import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const imageUrl =
    Array.isArray(product.images) && product.images.length
      ? product.images[0]
      : product.image ||
        'https://images.unsplash.com/photo-1520975927760-8a17f74779f4?auto=format&fit=crop&w=1200&q=80';

  const discount = product.discount ||
    (product.originalPrice && product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0);

  const handleBuy = () => {
    addToCart({
      ...product,
      _id: product._id || product.id,
      quantity: 1,
      image: imageUrl,
    });
  };

  return (
    <article className="product-card" onClick={() => navigate(`/product/${product._id || product.id}`)}>
      <div className="product-card__image">
        {discount > 0 && (
          <span className="product-card__badge">{discount}% OFF</span>
        )}
        <img
          src={imageUrl}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1562158070-2b24e758d7f9?auto=format&fit=crop&w=1200&q=80';
          }}
        />
      </div>

      <div className="product-card__info">
        <h3 className="product-card__title">{product.name}</h3>
        {product.category && (
          <p className="product-card__subtitle">{product.category}</p>
        )}

        <div className="product-card__pricing">
          <span className="product-card__price">₹{product.price}</span>
          {product.originalPrice && (
            <span className="product-card__price product-card__price--original">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <div className="product-card__actions">
          <button className="btn btn--outline" onClick={(e) => { e.stopPropagation(); handleBuy(); }}>
            Add to Cart
          </button>
          <button className="btn btn--solid" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product._id || product.id}`); }}>
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
