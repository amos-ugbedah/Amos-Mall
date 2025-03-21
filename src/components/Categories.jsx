import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Fetch categories from DummyJSON
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();

        // Check the data structure to confirm it's an array of strings or objects
        console.log("Categories fetched:", data); // Debugging to verify data structure
        setCategories(data); // Assuming the API returns an array of strings like ["electronics", "jewelery"]
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products for the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryName) return;

      try {
        const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // Log products for debugging purposes
        console.log("Products fetched:", data.products);
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    navigate(`/category/${selectedCategory}`); // Navigate to the selected category page
  };

  return (
    <div className="p-6">
      {/* Categories Dropdown */}
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <select
        className="w-full p-3 border rounded-md bg-gray-100 hover:bg-gray-200 transition"
        value={categoryName || ""}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          Select a category...
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {typeof category === "string" ? category : category.name}
          </option>
        ))}
      </select>

      {/* Display Products in Selected Category */}
      {categoryName && (
        <div className="mt-8">
          <h2 className="text-xl font-bold capitalize mb-4">
            Products in {categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg shadow-md">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.thumbnail || "https://dummyimage.com/150x150/cccccc/000000&text=No+Image"}
                      alt={product.title || "Product image"}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-bold mt-2">{product.title || "Untitled Product"}</h3>
                    <p className="text-green-600 font-semibold">${product.price || 0}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No products found in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
