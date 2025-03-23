import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa"; // Import icons

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToWishlist = () => {
    // Add logic for adding to wishlist
    console.log("Added to wishlist:", product.title);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
      <Link to={`/product/${product.id}`} aria-label={`View details of ${product.title}`}>
        {/* Product Thumbnail */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md"
        />

        {/* Product Title */}
        <h3 className="text-lg font-bold mt-2">{product.title}</h3>

        {/* Price */}
        <p className="text-green-600 font-semibold">${product.price}</p>

        {/* Stock Status */}
        <p className={`text-sm mt-2 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </Link>

      {/* Add to Cart and Add to Wishlist Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0} // Disable button if out of stock
          className={`flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${
            product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaShoppingCart className="mr-2" /> Add to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className="flex items-center bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
        >
          <FaHeart className="mr-2" /> Wishlist
        </button>
      </div>
    </div>
  );
}

export default ProductCard;