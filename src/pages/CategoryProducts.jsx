import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        console.log("Fetched Categories:", data); // Debugging

        // Ensure categories is an array of objects
        if (Array.isArray(data)) {
          setCategories(data); // Set the array of objects
        } else {
          console.error("Unexpected categories data structure:", data);
          setError("Unexpected categories data structure.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Unable to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch products for selected category
  useEffect(() => {
    if (!categoryName) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        console.log("Fetched Products:", data.products); // Debugging

        // Ensure products is an array
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected products data structure:", data);
          setError("Unexpected products data structure.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  // Calculate previous and next categories
  const currentIndex = categories.findIndex((category) => category.slug === categoryName);
  const prevCategory = currentIndex > 0 ? categories[currentIndex - 1] : null;
  const nextCategory = currentIndex < categories.length - 1 ? categories[currentIndex + 1] : null;

  // Loading state
  if (loading) {
    return <div className="text-center py-5 text-gray-700 font-semibold">Loading products...</div>;
  }

  // Error state
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
      <h1 className="text-3xl font-bold capitalize mb-4 text-gray-800">
        {categoryName} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2 text-gray-900">{product.title}</h3>
                <p className="text-green-600 font-semibold">${product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No products found in this category.</p>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {prevCategory && (
          <button
            onClick={() => navigate(`/category/${prevCategory.slug}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            ⬅ {prevCategory.name}
          </button>
        )}
        {nextCategory && (
          <button
            onClick={() => navigate(`/category/${nextCategory.slug}`)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            {nextCategory.name} ➡
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;