import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
          setCategories(data);
        } else {
          console.error("Unexpected categories data structure:", data);
          setError("Unexpected categories data structure.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Unable to fetch categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    navigate(`/category/${selectedCategory}`); // Navigate to the selected category
  };

  // Loading state
  if (loading) {
    return <div className="text-center py-5 text-gray-700 font-semibold">Loading categories...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {/* Dropdown Menu */}
      <select
        className="w-full p-3 border rounded-md bg-gray-100 hover:bg-gray-200 transition"
        onChange={handleCategoryChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select a category...
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category.slug}> {/* Use category.slug as the value */}
            {category.name} {/* Use category.name as the display text */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;