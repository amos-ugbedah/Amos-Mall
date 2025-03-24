import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa"; // Import icons

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Calculate total items in the cart and wishlist
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MyStore
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/wishlist" className="hover:text-blue-200 relative">
            <FaHeart className="text-2xl" /> {/* Wishlist Icon */}
            {totalWishlistItems > 0 && (
              <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 transform translate-x-1/2 -translate-y-1/2">
                {totalWishlistItems}
              </span>
            )}
          </Link>
          <Link to="/cart" className="hover:text-blue-200 relative">
            <FaShoppingCart className="text-2xl" /> {/* Cart Icon */}
            {totalCartItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 transform translate-x-1/2 -translate-y-1/2">
                {totalCartItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
