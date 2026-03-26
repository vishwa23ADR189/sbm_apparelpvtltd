import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CheckoutTemp = () => {
  const userEmail = localStorage.getItem('email');
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('gpay');
  const [form, setForm] = useState({
    name: localStorage.getItem('name') || '',
    email: userEmail || '',
    address: '',
    phone: '',
  });

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    if (!form.name || !form.address || !form.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      const orderHistory = JSON.parse(localStorage.getItem(`orders_${userEmail}`)) || [];
      const newOrder = {
        user: form,
        items: cartItems,
        total: cartTotal,
        paymentMethod,
        date: new Date().toISOString(),
        status: paymentMethod === 'cod' ? 'pending' : 'paid',
      };
      orderHistory.push(newOrder);
      localStorage.setItem(`orders_${userEmail}`, JSON.stringify(orderHistory));

      clearCart();
      localStorage.removeItem(`cart_${userEmail}`);

      alert('Order placed successfully! Redirecting to home...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth" style={{ minHeight: 'auto', paddingTop: '3rem' }}>
      <div className="auth__card" style={{ maxWidth: '800px', width: '100%' }}>
        <h1 className="auth__title" style={{ fontSize: '2.2rem' }}>Complete Your Order</h1>
        <p className="auth__subtitle">Review your items and confirm shipping details before payment.</p>

        {/* Order Summary */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--brand-dark)', marginBottom: '1.5rem' }}>
            Order Summary
          </h3>

          {cartItems.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item._id} className="cart__item" style={{ paddingBottom: '1rem' }}>
                  <div className="cart__item-image" style={{ width: '80px', height: '80px' }}>
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
                      <span>₹{item.price}  {item.quantity}</span>
                      <span style={{ fontWeight: 600 }}>= ₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.2rem', marginTop: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'var(--brand-dark)',
                  }}
                >
                  <span>Order Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Shipping Information */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--brand-dark)', marginBottom: '1.5rem' }}>
            Shipping Details
          </h3>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ backgroundColor: 'rgba(245, 241, 237, 0.5)', cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="text"
              placeholder="+91 xxxxxxxxxx"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Shipping Address</label>
            <textarea
              id="address"
              placeholder="Street address, city, state, postal code"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              style={{
                padding: '0.9rem 1rem',
                borderRadius: '14px',
                border: '1px solid rgba(58, 42, 34, 0.15)',
                background: 'rgba(245, 241, 237, 0.88)',
                fontFamily: 'inherit',
                fontSize: '1rem',
                color: 'var(--brand-dark)',
                resize: 'vertical',
                minHeight: '100px',
              }}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--brand-dark)', marginBottom: '1.5rem' }}>
            Payment Method
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '1rem', borderRadius: '14px', background: paymentMethod === 'gpay' ? 'rgba(184, 137, 104, 0.08)' : 'rgba(245, 241, 237, 0.5)', border: paymentMethod === 'gpay' ? '1px solid var(--brand-warm)' : '1px solid transparent', transition: 'all 250ms' }}>
              <input
                type="radio"
                value="gpay"
                checked={paymentMethod === 'gpay'}
                onChange={() => setPaymentMethod('gpay')}
              />
              <span style={{ fontWeight: 500 }}>Google Pay / UPI</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '1rem', borderRadius: '14px', background: paymentMethod === 'cod' ? 'rgba(184, 137, 104, 0.08)' : 'rgba(245, 241, 237, 0.5)', border: paymentMethod === 'cod' ? '1px solid var(--brand-warm)' : '1px solid transparent', transition: 'all 250ms' }}>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              <span style={{ fontWeight: 500 }}>Cash on Delivery</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
       <button
  className="form__submit"
  onClick={() => window.location.href = "https://razorpay.com/"}
  disabled={isLoading || cartItems.length === 0}
  style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
>
  {isLoading ? 'Processing...' : 'Place Order'}
</button>

        <button
          className="btn-outline"
          onClick={() => navigate('/cart')}
          style={{ width: '100%', padding: '1rem 1.5rem', marginTop: '1rem' }}
        >
          Back to Cart
        </button>
      </div>
    </section>
  );
};

export default CheckoutTemp;
