import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductDetail = () => {
  const { productId } = useParams(); // Get current product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Handle loading state

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true); // Show loading spinner
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product details");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Navigate to the next product
  const handleNextProduct = () => {
    const nextProductId = parseInt(productId, 10) + 1;
    navigate(`/product/${nextProductId}`);
  };

  // Handle carousel navigation
  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-6 bg-gray-300 rounded-md w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/4 mx-auto mt-2"></div>
        </div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-5">Product not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Navigation Buttons */}
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          <FaArrowLeft /> Go Back
        </button>
        <button
          onClick={handleNextProduct}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Next Product <FaArrowRight />
        </button>
      </div>

      {/* Product Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        {product.title}
      </h1>

      {/* Image Carousel */}
      <div className="relative my-6">
        {product.images && product.images.length > 0 ? (
          <>
            <img
              src={
                product.images[currentImageIndex] ||
                "https://dummyimage.com/300x300/cccccc/000000&text=Image+Not+Available"
              }
              alt={`Image ${currentImageIndex + 1}`}
              className="w-full h-96 object-contain rounded-lg"
              loading="lazy"
            />
            <button
              onClick={handlePreviousImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2"
            >
              <FaArrowRight />
            </button>
          </>
        ) : (
          <p className="text-center text-gray-600">No images available.</p>
        )}
      </div>

      {/* Product Details */}
      <p className="text-lg text-gray-600 dark:text-gray-400 my-2">
        {product.description || "No description available."}
      </p>
      <p className="text-xl font-bold text-green-600">
        Price: ${product.price.toFixed(2) || 0}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Discount: {product.discountPercentage || 0}% off
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Rating: {product.rating || "No rating"} / 5
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Stock: {product.stock || "Out of stock"}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        SKU: {product.sku || "Not available"}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Weight: {product.weight || 0} kg
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Dimensions: {product.dimensions?.width || 0}" W x{" "}
        {product.dimensions?.height || 0}" H x {product.dimensions?.depth || 0}"
        D
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Warranty: {product.warrantyInformation || "No warranty information"}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Shipping: {product.shippingInformation || "No shipping information"}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Availability: {product.availabilityStatus || "Unavailable"}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Return Policy: {product.returnPolicy || "No return policy available"}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Minimum Order Quantity: {product.minimumOrderQuantity || 1}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Barcode: {product.meta?.barcode || "Not available"}
      </p>
      <img
        src={product.meta?.qrCode}
        alt="QR Code"
        className="w-32 h-32 object-contain my-4"
      />

      {/* Tags */}
      <div className="my-4">
        <h2 className="text-lg font-bold">Tags:</h2>
        {product.tags && product.tags.length > 0 ? (
          <ul>
            {product.tags.map((tag, index) => (
              <li key={index} className="text-gray-600">
                - {tag}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No tags available.</p>
        )}
      </div>

      {/* Reviews */}
      <div className="my-4">
        <h2 className="text-lg font-bold">Reviews:</h2>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="my-2 p-4 border rounded-md">
              <p>
                <span className="font-bold">{review.reviewerName}:</span>{" "}
                {review.comment}
              </p>
              <p className="text-sm text-gray-500">
                Rating: {review.rating} / 5
              </p>
              <p className="text-sm text-gray-500">
                Date: {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
