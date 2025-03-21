import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Unable to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoryName) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  const currentIndex = categories.indexOf(categoryName);
  const prevCategory = currentIndex > 0 ? categories[currentIndex - 1] : null;
  const nextCategory = currentIndex < categories.length - 1 ? categories[currentIndex + 1] : null;

  if (loading) {
    return <div className="text-center py-5">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize mb-4">
        {categoryName} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-white rounded-lg shadow-md">
            <Link to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover" />
              <h3 className="text-lg font-bold mt-2">{product.title}</h3>
              <p className="text-green-600 font-semibold">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        {prevCategory && (
          <button
            onClick={() => navigate(`/category/${prevCategory}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            ⬅ {prevCategory}
          </button>
        )}
        {nextCategory && (
          <button
            onClick={() => navigate(`/category/${nextCategory}`)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            {nextCategory} ➡
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
