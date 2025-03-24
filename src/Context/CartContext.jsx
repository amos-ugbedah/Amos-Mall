/* eslint-disable no-case-declarations */
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(); // ✅ Ensure Context is properly created

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      const updatedCart = existingProduct
        ? state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return { ...state, cartItems: filteredCart };

    case "UPDATE_QUANTITY":
      const updatedQuantityCart = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedQuantityCart));
      return { ...state, cartItems: updatedQuantityCart };

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return { ...state, cartItems: [] };

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// ✅ Context Provider
export const CartProvider = ({ children }) => {
  // Ensure `localStorage.getItem("cart")` is properly parsed and defaults to `[]`
  const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");

  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: initialCart,
  });

  useEffect(() => {
    // Ensure localStorage updates whenever cart state changes
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateCartItemQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalPrice = () => {
    return state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Ensure Proper Export
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
