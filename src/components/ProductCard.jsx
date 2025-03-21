// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <h3 className="text-lg font-bold mt-2">{product.title}</h3>
        <p className="text-green-600 font-semibold">${product.price}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
