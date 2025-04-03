import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "../UserContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    return storedCart;
  });

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Get current user's cart
  const cartItems = user ? cart[user.id] || [] : [];

  // ✅ Add item (prevents duplicates based on title)
  const addToCart = (item) => {
    if (!user) return alert("Please log in to add items to the cart.");

    setCart((prevCart) => {
      const userCart = prevCart[user.id] || [];
      const isAlreadyInCart = userCart.some((cartItem) => cartItem.title === item.title);

      if (isAlreadyInCart) {
        alert("This course is already in your cart.");
        return prevCart; // Don't update if course already exists
      }

      return {
        ...prevCart,
        [user.id]: [...userCart, item],
      };
    });
  };

  // ✅ Remove item by `title`
  const removeFromCart = (title) => {
    if (!user) return;

    setCart((prevCart) => {
      if (!prevCart[user.id]) return prevCart; // Ensure user cart exists

      const updatedCart = prevCart[user.id].filter((item) => item.title !== title);

      // If user's cart is empty, remove user key
      const newCart = { ...prevCart };
      if (updatedCart.length === 0) {
        delete newCart[user.id];
      } else {
        newCart[user.id] = updatedCart;
      }

      return newCart;
    });
  };

  // ✅ Clear user's cart completely
  const clearCart = () => {
    if (!user) return;
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[user.id]; // Remove user key completely
      return updatedCart;
    });
  };

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
