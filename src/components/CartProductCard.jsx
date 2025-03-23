import React from "react";
import { useCart } from "../context/CartContext"; // Import the cart context

function CartProductCard({ product }) {
  const { removeFromCart, updateCartItemQuantity } = useCart(); // Use the cart context

  if (!product) {
    return <p className="text-red-500">Error: Product not found.</p>;
  }

  // Destructure properties for cleaner access and handle defaults
  const {
    id,
    title = "No Title",
    thumbnail = "https://via.placeholder.com/150",
    price = 0,
    quantity = 1, // Quantity in the cart
  } = product;

  // Calculate total price for the item
  const totalPrice = (price * quantity).toFixed(2);

  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-lg">
      {/* Product Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-20 h-20 object-cover rounded-md"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150"; // Fallback image
        }}
      />

      {/* Product Details */}
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-green-600 font-semibold">${price}</p>
        <p className="text-gray-600 text-sm">Total: ${totalPrice}</p>

        {/* Quantity Selector */}
        <div className="flex items-center mt-2">
          <button
            onClick={() => updateCartItemQuantity(id, quantity - 1)} // Decrease quantity
            disabled={quantity <= 1}
            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            onClick={() => updateCartItemQuantity(id, quantity + 1)} // Increase quantity
            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(id)} // Remove the product from the cart
        className="ml-4 text-red-600 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
}

export default CartProductCard;