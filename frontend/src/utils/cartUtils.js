// Get cart from localStorage
export const getCart = () => {
  const email = localStorage.getItem("email"); // unique cart per user
  const cartKey = `cart_${email}`;
  return JSON.parse(localStorage.getItem(cartKey)) || [];
};

// Save cart to localStorage
export const saveCart = (cart) => {
  const email = localStorage.getItem("email");
  const cartKey = `cart_${email}`;
  localStorage.setItem(cartKey, JSON.stringify(cart));
};

// Add product to cart
export const addToCart = (product, quantity = 1) => {
  let cart = getCart();
  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  return cart;
};

// Clear cart
export const clearCart = () => {
  const email = localStorage.getItem("email");
  const cartKey = `cart_${email}`;
  localStorage.removeItem(cartKey);
};
