import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../hook/useCart";
import { useWishlist } from "../hook/useWishList";

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  return (
    <header className="bg-[#c7ae6a] text-white p-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#1a1a1a]">
          Amos ShopEase
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-[#b99a45] transition">Home</Link>

          {/* Wishlist */}
          <div className="relative">
            <Link to="/wishlist" className="hover:text-[#b99a45]" aria-label="Wishlist">
              <FaHeart className="text-2xl" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {totalWishlistItems}
                </span>
              )}
            </Link>
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart" className="hover:text-[#b99a45]" aria-label="Cart">
              <FaShoppingCart className="text-2xl" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
