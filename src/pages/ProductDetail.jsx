import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCart } from "../hook/useCart";
import { useWishlist } from "../hook/useWishlist";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        
        const data = await response.json();
        setProduct(data);
        setCurrentImage(0);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
      console.log("Added to wishlist:", product.title);
    }
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
    const prevId = Math.max(1, parseInt(productId) - 1);
    navigate(`/product/${prevId}`);
  };

  const goToNextProduct = () => {
    const nextId = parseInt(productId) + 1;
    navigate(`/product/${nextId}`);
  };

  if (loading) return <p className="text-center mt-10">Loading product details...</p>;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-black mb-4">
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          {/* Show a placeholder while the main image loads */}
          <img
            src={product.images[currentImage]}
            alt={product.title}
            className="w-full h-64 object-cover rounded-md"
            loading="lazy"
          />
          {product.images.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={prevImage}
              >
                <FaChevronLeft />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={nextImage}
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-green-600 font-semibold mt-2">${product.price}</p>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="mt-2 text-yellow-500">⭐ {product.rating} / 5</p>
          <p className="text-gray-500 text-sm mt-2">Barcode: #{product.id}</p>
          <p className="text-gray-700 mt-2"><strong>Brand:</strong> {product.brand}</p>
          <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
          <p className="text-gray-700"><strong>Stock:</strong> {product.stock} available</p>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex items-center bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
            >
              <FaHeart className={`${wishlist.some((item) => item.id === product.id) ? "text-red-500" : ""} mr-2`} />
              {wishlist.some((item) => item.id === product.id) ? "Added" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={goToPreviousProduct}
          className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          <FaArrowLeft className="mr-2" /> Previous Product
        </button>
        <button
          onClick={goToNextProduct}
          className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Next Product <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
