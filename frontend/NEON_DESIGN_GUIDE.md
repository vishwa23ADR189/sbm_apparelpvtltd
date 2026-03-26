# 🎨 Bold Neon Modern Design Guide

## Overview
This design system implements a **Bold Neon Minimal Modern UI** with vibrant accents and clean, minimal layouts. Perfect for a fresh, contemporary fashion e-commerce experience.

---

## 🎯 Color Palette

```
Primary Neon Pink:    #FF10F0 (use for CTAs, highlights)
Neon Green Accent:    #CCFF00 (use for positive actions, badges)
Neon Cyan:            #00F0FF (optional accent color)
Dark Text:            #111111 (primary text)
Light Text:           #888888 (secondary text)
White:                #FFFFFF (backgrounds, cards)
Light Background:     #FAFAFA (page background)
Border Color:         #E8E8E8 (subtle dividers)
```

---

## 📦 Component Classes

### Navbar (Top Navigation)
```jsx
<nav className="navbar-modern">
  <div className="navbar-brand">SBM APPARELS PVT LTD</div>
  <ul className="navbar-links">
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
  <div className="navbar-actions">
    <span>Hello, User</span>
    <button className="btn-primary-neon">Logout</button>
  </div>
</nav>
```

### Hero Section
```jsx
<section className="hero-section-neon">
  <h1>
    Discover Your <span className="neon-word">Style</span>
  </h1>
  <p>Fresh, modern fashion for the contemporary you</p>
  <div className="hero-buttons">
    <button className="btn-primary-neon">Shop Now</button>
    <button className="btn-accent-neon">Explore</button>
  </div>
</section>
```

### Buttons
```jsx
<!-- Primary CTA Button (Pink Neon with glow) -->
<button className="btn-primary-neon">Add to Cart</button>

<!-- Accent Button (Green Neon) -->
<button className="btn-accent-neon">Explore Now</button>

<!-- Add to Cart in Products -->
<button className="btn-add-cart">Add to Cart</button>

<!-- Wishlist Button -->
<button className="btn-wishlist">♡</button>
```

### Product Card
```jsx
<div className="product-card-neon">
  <img src={productImage} alt="" className="product-image" />
  <div className="product-info">
    <h3 className="product-title">Product Name</h3>
    <p className="product-description">Description here</p>

    <div className="product-price">
      <span className="price-current">₹320</span>
      <span className="price-original">₹500</span>
      <span className="discount-badge">36% OFF</span>
    </div>

    <div className="product-rating">
      <span className="rating-stars">★★★★★</span>
      <span className="rating-count">(124 reviews)</span>
    </div>

    <div className="product-actions">
      <button className="btn-add-cart">Add to Cart</button>
      <button className="btn-wishlist">♡</button>
    </div>
  </div>
</div>
```

### Section Headers
```jsx
<div className="section-header">
  <h2 className="section-title-modern">
    Featured Collection
    <span className="section-title-accent">NEW</span>
  </h2>
  <a href="/all" className="see-all-link">See All</a>
</div>
```

### Forms
```jsx
<form>
  <div className="form-group">
    <label className="form-label">Email Address</label>
    <input
      type="email"
      className="form-input"
      placeholder="your@email.com"
    />
  </div>

  <div className="form-group">
    <label className="form-label">Message</label>
    <textarea
      className="form-textarea"
      placeholder="Your message here..."
    ></textarea>
  </div>

  <button className="btn-primary-neon">Send Message</button>
</form>
```

### Cart Items
```jsx
<div className="cart-item">
  <img src={item.image} alt="" className="cart-item-image" />

  <div className="cart-item-details">
    <h3 className="cart-item-title">Orange Summer Suit</h3>
    <p className="cart-item-price">₹320</p>

    <div className="quantity-control">
      <button className="quantity-btn">−</button>
      <input type="number" className="quantity-input" value="1" />
      <button className="quantity-btn">+</button>
    </div>
  </div>

  <button className="cart-remove">Remove</button>
</div>
```

### Checkout Layout
```jsx
<div className="checkout-container">
  <div className="checkout-left">
    <section className="checkout-section">
      <h2 className="checkout-title">Delivery Address</h2>
      <!-- Form fields here -->
    </section>

    <section className="checkout-section">
      <h2 className="checkout-title">Payment Method</h2>
      <!-- Payment options here -->
    </section>
  </div>

  <div className="checkout-right">
    <h2 className="checkout-title">Order Summary</h2>
    <div className="summary-row">
      <span>Subtotal</span>
      <span>₹530</span>
    </div>
    <div className="summary-row">
      <span>Delivery</span>
      <span>₹60</span>
    </div>
    <div className="summary-row">
      <span>Discount</span>
      <span>-₹159</span>
    </div>
    <div className="summary-row total">
      <span>Total</span>
      <span>₹431</span>
    </div>
    <button className="btn-primary-neon" style={{width: '100%', marginTop: '1.5rem'}}>
      Place Order
    </button>
  </div>
</div>
```

### Utility Classes
```jsx
<!-- Text colors -->
<p className="text-neon-pink">Special offer!</p>
<p className="text-neon-green">In stock</p>

<!-- Background colors -->
<div className="bg-neon-green">Success message</div>
<div className="bg-neon-pink">Alert message</div>

<!-- Gradient text -->
<h1 className="gradient-text">Premium Collection</h1>

<!-- Glow effects -->
<button className="btn-primary-neon glow-pink">Glowing Button</button>
<div className="glow-green">Box with glow effect</div>
```

---

## 🎨 Usage Examples

### Modern Home Page Layout
```jsx
import './styles/neon-modern.css';

export const ModernHomePage = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar-modern">
        {/* Navigation items */}
      </nav>

      {/* Hero Section */}
      <section className="hero-section-neon">
        <h1>
          Fresh <span className="neon-word">Fashion</span> Vibes
        </h1>
        <p>Discover modern styles for contemporary you</p>
        <div className="hero-buttons">
          <button className="btn-primary-neon">Shop Collection</button>
          <button className="btn-accent-neon">Learn More</button>
        </div>
      </section>

      {/* Featured Products */}
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title-modern">
            Trending Now
            <span className="section-title-accent">SOLD OUT</span>
          </h2>
          <a href="/products" className="see-all-link">See All</a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Product cards */}
        </div>
      </div>
    </>
  );
};
```

### Modern Product Card Component
```jsx
const ProductCard = ({ product }) => {
  return (
    <div className="product-card-neon">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-price">
          <span className="price-current">₹{product.price}</span>
          <span className="price-original">₹{product.originalPrice}</span>
          <span className="discount-badge">{product.discount}% OFF</span>
        </div>

        <div className="product-rating">
          <span className="rating-stars">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>

        <div className="product-actions">
          <button className="btn-add-cart" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button className="btn-wishlist" onClick={() => toggleWishlist(product)}>
            ♡
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 🌈 Color Combinations

### Primary Actions (Pink + White)
Use neon pink buttons for main CTAs like "Add to Cart", "Buy Now", "Checkout"

### Secondary Actions (Green + Dark)
Use neon green for positive confirmations like "Continue", "Apply", "Confirm"

### Badges & Highlights
- **Discounts**: Pink background with white text
- **New Items**: Green background with dark text
- **Popular**: Gradient pink-to-green

### Text Hierarchy
- **Headings**: Dark (#111111), bold, larger font
- **Primary Text**: Dark (#111111), medium weight
- **Secondary Text**: Light gray (#888888), normal weight

---

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with multi-column grids
- **Tablet (≤1024px)**: 2-3 column product grids
- **Mobile (≤768px)**: Single column, stacked layout
- **Small Mobile (≤480px)**: Minimal spacing, essential elements only

---

## ✨ Animation & Effects

### Hover Effects
- Buttons: Scale up slightly + glow
- Cards: Lift up with shadow increase
- Links: Color change + underline expand

### Transitions
- Duration: 0.3s ease
- Apply to: color, background, transform, box-shadow

### Glow Effects
- Pink glow: `box-shadow: 0 0 16px rgba(255, 16, 240, 0.3);`
- Green glow: `box-shadow: 0 0 12px rgba(204, 255, 0, 0.3);`

---

## 🎯 Design Principles

1. **Minimal**: Clean layouts with plenty of whitespace
2. **Bold**: Neon colors make strong visual impact
3. **Modern**: Rounded corners, smooth transitions, contemporary styling
4. **Fresh**: Light backgrounds, open design
5. **User-Focused**: Clear CTAs, intuitive navigation

---

## 📝 CSS Variables

All colors are defined as CSS variables in `neon-modern.css`:

```css
:root {
  --neon-green: #CCFF00;
  --neon-pink: #FF10F0;
  --text-dark: #111111;
  --text-light: #888888;
  --white: #FFFFFF;
  --light-bg: #FAFAFA;
  --border-color: #E8E8E8;
}
```

Override them in your own CSS as needed!

---

## 🚀 Quick Start

1. Import the CSS in your App.js:
   ```jsx
   import './styles/neon-modern.css';
   ```

2. Use the component classes in your JSX
3. Combine classes as needed
4. Customize colors by overriding CSS variables

---

## 📞 Support

For issues or questions about the neon design system, refer to the component examples in this guide!
