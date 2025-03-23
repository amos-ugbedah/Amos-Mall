import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { FaShoppingCart, FaHeart, FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setCurrentImage(0);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  const handleAddToWishlist = () => {
    console.log("Added to wishlist:", product.title);
  };

  const nextImage = () => {
    if (product && product.images.length > 1) {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images.length > 1) {
      setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const goToPreviousProduct = () => {
    const prevId = Math.max(1, parseInt(productId) - 1); // Ensure it doesn’t go below 1
    navigate(`/product/${prevId}`);
  };

  const goToNextProduct = () => {
    const nextId = parseInt(productId) + 1;
    navigate(`/product/${nextId}`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Back to Previous Page */}
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-black mb-4">
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image with Navigation */}
        <div className="relative">
          <img
            src={product.images[currentImage]}
            alt={product.title}
            className="w-full h-64 object-cover rounded-md"
          />
          {product.images.length > 1 && (
            <>
              <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={nextImage}>
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-green-600 font-semibold mt-2">${product.price}</p>
          <p className="text-gray-600 mt-2">{product.description}</p>

          {/* Rating */}
          <p className="mt-2 text-yellow-500">⭐ {product.rating} / 5</p>

          {/* Barcode */}
          <p className="text-gray-500 text-sm mt-2">Barcode: #{product.id}</p>

          {/* Extra Info */}
          <p className="text-gray-700 mt-2"><strong>Brand:</strong> {product.brand}</p>
          <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
          <p className="text-gray-700"><strong>Stock:</strong> {product.stock} available</p>

          {/* Add to Cart and Wishlist */}
          <div className="flex space-x-4 mt-6">
            <button onClick={() => addToCart(product)} className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button onClick={handleAddToWishlist} className="flex items-center bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition">
              <FaHeart className="mr-2" /> Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Next and Previous Product Buttons */}
      <div className="flex justify-between mt-6">
        <button onClick={goToPreviousProduct} className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
          <FaArrowLeft className="mr-2" /> Previous Product
        </button>
        <button onClick={goToNextProduct} className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
          Next Product <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
