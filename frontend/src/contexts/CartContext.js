import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check for existing item with same ID and size
      const existingItem = prevItems.find(
        item => item._id === product._id && item.selectedSize === product.selectedSize
      );
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item._id === id && item.selectedSize === size))
    );
  };

  const updateQuantity = (id, newQuantity, size) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        cartTotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
// Should end with:
export default CartContext;
