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
      const orderHistory =
        JSON.parse(localStorage.getItem(`orders_${userEmail}`)) || [];

      const newOrder = {
        user: form,
        items: cartItems,
        total: cartTotal,
        paymentMethod,
        date: new Date().toISOString(),
        status: paymentMethod === 'cod' ? 'pending' : 'paid',
      };

      orderHistory.push(newOrder);
      localStorage.setItem(
        `orders_${userEmail}`,
        JSON.stringify(orderHistory)
      );

      clearCart();
      localStorage.removeItem(`cart_${userEmail}`);

      alert('Order placed successfully!');

      // 🔥 Optional: Redirect based on payment method
      if (paymentMethod === 'gpay') {
        window.location.href = "https://razorpay.com/";
      } else {
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }

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
        
        <h1 className="auth__title">Complete Your Order</h1>
        <p className="auth__subtitle">
          Review your items and confirm shipping details before payment.
        </p>

        {/* Order Summary */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3>Order Summary</h3>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item._id} className="cart__item">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '80px', height: '80px' }}
                  />

                  <div>
                    <h4>{item.name}</h4>
                    <p>
                      ₹{item.price} × {item.quantity} = ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <h3>Total: ₹{cartTotal.toFixed(2)}</h3>
            </>
          )}
        </div>

        {/* Shipping */}
        <div>
          <h3>Shipping Details</h3>

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            value={form.email}
            readOnly
          />

          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <textarea
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>

        {/* Payment */}
        <div>
          <h3>Payment Method</h3>

          <label>
            <input
              type="radio"
              value="gpay"
              checked={paymentMethod === 'gpay'}
              onChange={() => setPaymentMethod('gpay')}
            />
            UPI / GPay
          </label>

          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            Cash on Delivery
          </label>
        </div>

        {/* BUTTON FIXED */}
        <button
          onClick={handlePlaceOrder}
          disabled={isLoading || cartItems.length === 0}
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>

        <button onClick={() => navigate('/cart')}>
          Back to Cart
        </button>

      </div>
    </section>
  );
};

export default CheckoutTemp;
