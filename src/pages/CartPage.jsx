/* eslint-disable no-unused-vars */
import React from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, getTotalPrice, addToCart, removeFromCart, updateCartItemQuantity } = useCart();
  const { currency, setCurrency, currencies, convertCurrency } = useCurrency();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center"
            >
              {/* Item Image */}
              <img
                src={item.thumbnail} // Ensure `thumbnail` exists
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
              />
              {/* Item Details */}
              <div className="flex-1 w-full">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-600">
                  Price: {currency}{" "}
                  {convertCurrency?.(item.price, currency) ?? item.price}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  {/* Decrease Quantity Button */}
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  {/* Quantity Display */}
                  <span className="text-lg w-8 text-center">{item.quantity}</span>
                  {/* Increase Quantity Button */}
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
                {/* Remove Item Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Currency Conversion Section */}
          <div className="bg-blue-600 p-4 rounded-lg shadow-md">
            <h3 className="text-white text-lg font-semibold mb-2">Currency Conversion</h3>
            <div className="flex items-center space-x-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 border rounded-md w-full"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.name} ({curr.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Total Balance */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">
              Total: {currency} {convertCurrency?.(getTotalPrice(), currency) ?? getTotalPrice()}
            </h3>
          </div>

          {/* Continue Shopping and Checkout Buttons */}
          <div className="flex justify-between mt-6">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
