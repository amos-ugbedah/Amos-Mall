import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import WishlistProductCard from "../components/WishlistProductCard";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <WishlistProductCard
              key={product.id}
              product={product}
              removeFromWishlist={() => removeFromWishlist(product.id)}
              moveToCart={() => {
                addToCart(product);
                removeFromWishlist(product.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
