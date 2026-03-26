import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartTemp = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

  const handleProceedCheckout = () => {
    if (cartCount === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkouttemp');
  };

  return (
    <section className="cart">
      <div className="cart__container">
        {/* Cart Items List */}
        <div className="cart__list">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--brand-dark)' }}>Shopping Bag</h2>

          {cartCount === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                Your cart is currently empty
              </p>
              <button
                className="btn btn--solid"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item._id} className="cart__item">
                  <div className="cart__item-image">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1552062407-291eea989fa0?auto=format&fit=crop&w=300&q=60'}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1552062407-291eea989fa0?auto=format&fit=crop&w=300&q=60';
                      }}
                    />
                  </div>

                  <div className="cart__item-info">
                    <h4 className="cart__item-title">{item.name}</h4>
                    <div className="cart__item-meta">
                      <span>{item.category || 'Product'}</span>
                      <span>₹{item.price?.toFixed(2)}</span>
                      {item.selectedSize && (
                        <span style={{ fontWeight: '600', color: 'var(--brand-dark)' }}>
                          Size: {item.selectedSize}
                        </span>
                      )}
                    </div>

                    <div className="cart__quantity">
                      <button
                        className="cart__quantity-btn"
                        onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedSize)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="cart__quantity-btn"
                        onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedSize)}
                      >
                        +
                      </button>
                      <button
                        className="btn-outline"
                        onClick={() => removeFromCart(item._id, item.selectedSize)}
                        style={{ marginLeft: 'auto', padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Order Summary */}
        {cartCount > 0 && (
          <div className="cart__summary">
            <h3 className="cart__summary-title">Order Summary</h3>

            <div style={{ borderTop: '1px solid rgba(58, 42, 34, 0.12)', paddingTop: '1.2rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.8rem',
                  fontSize: '0.95rem',
                }}
              >
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.8rem',
                  fontSize: '0.95rem',
                }}
              >
                <span>Shipping</span>
                <span style={{ color: 'var(--brand-warm)' }}>Calculated at checkout</span>
              </div>
            </div>

            <div className="cart__summary-total">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            <button className="cart__checkout" onClick={handleProceedCheckout}>
              Proceed to Checkout
            </button>

            <button
              className="btn-outline"
              onClick={() => navigate('/products')}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                marginTop: '1rem',
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartTemp;
