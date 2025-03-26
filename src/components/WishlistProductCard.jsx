import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Import heart icon
import { useWishlist } from "../hook/useWishlist";



function WishlistProductCard({ product }) {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  // Check if the product is already in the wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
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
      </Link>

      {/* Add to Wishlist Button */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleWishlistClick}
          className={`flex items-center ${
            isInWishlist ? "bg-gray-400" : "bg-pink-600"
          } text-white px-4 py-2 rounded-md hover:bg-pink-700 transition`}
        >
          <FaHeart className="mr-2" />
          {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}

export default WishlistProductCard;
