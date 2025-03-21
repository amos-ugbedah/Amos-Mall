import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

function ProductCard({ product }) {
  if (!product) {
    return <p className="text-red-500">Error: Product not found.</p>;
  }

  // Destructure properties for cleaner access and handle defaults
  const {
    id,
    title = "No Title",
    thumbnail = "https://via.placeholder.com/150",
    price = 0,
    discountPercentage = 0,
    rating = 0,
    stock = 0,
    minimumOrderQuantity = 1,
  } = product;

  // Calculate discounted price
  const discountedPrice = (price * (1 - discountPercentage / 100)).toFixed(2);

  // Generate star ratings
  const renderStars = (rating) => {
    const maxStars = 5;
    return [...Array(maxStars)].map((_, index) =>
      index < Math.round(rating) ? (
        <FaStar key={index} className="text-yellow-500" />
      ) : (
        <FaRegStar key={index} className="text-gray-400" />
      )
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
      <Link to={`/product/${id}`} aria-label={`View details of ${title}`}>
        {/* Product Thumbnail */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-cover rounded-md"
        />

        {/* Product Title */}
        <h3 className="text-lg font-bold mt-2">{title}</h3>

        {/* Price and Discount */}
        <div className="flex items-center gap-2 mt-1">
          <p className="text-green-600 font-semibold">${discountedPrice}</p>
          {discountPercentage > 0 && (
            <p className="text-gray-500 line-through text-sm">${price}</p>
          )}
        </div>

        {/* Star Rating */}
        <div className="flex items-center mt-2">
          {renderStars(rating)}
          <span className="text-gray-600 text-sm ml-2">{rating || "No rating"}</span>
        </div>

        {/* Stock Status */}
        <p
          className={`text-sm mt-2 ${
            stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Minimum Order Quantity */}
        <p className="text-gray-600 text-sm">
          Min Order: {minimumOrderQuantity} units
        </p>
      </Link>
    </div>
  );
}

export default ProductCard;
