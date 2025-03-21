// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
      <img src={product.thumbnail} alt={product.title} className="w-64 mx-auto mb-4 rounded-md" />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{product.title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
      <p className="text-lg font-semibold text-green-600">${product.price}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          ← Back
        </button>
        <button
          onClick={() => navigate(`/product/${parseInt(id) + 1}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
