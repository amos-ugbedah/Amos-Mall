import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext(); // Export as a named export

const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return { ...state, cartItems: action.payload };

    case "ADD_TO_CART": {
      if (!action.payload || !action.payload.id) {
        console.error("Invalid product data:", action.payload);
        return state;
      }

      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

      let updatedCart;
      if (existingItem) {
        updatedCart = state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart };
    }

    case "REMOVE_FROM_CART":
      return { ...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload) };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch({ type: "LOAD_CART", payload: storedCart });
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product) => dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const updateCartItemQuantity = (id, quantity) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const getTotalPrice = () => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart: state.cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
