import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Ensure the correct path

export const useCart = () => {
  return useContext(CartContext);
};
