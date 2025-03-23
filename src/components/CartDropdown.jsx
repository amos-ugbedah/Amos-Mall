import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartDropdown = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold border-b pb-2">Shopping Cart</h3>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center my-3">Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 border rounded">
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 border rounded">
                  +
                </button>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-2">x</button>
              </div>
            </div>
          ))}

          <div className="mt-3">
            <p className="font-semibold">Total: ${getTotalPrice().toFixed(2)}</p>
            <Link to="/cart" className="bg-blue-600 text-white w-full block text-center py-2 rounded mt-2">
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
