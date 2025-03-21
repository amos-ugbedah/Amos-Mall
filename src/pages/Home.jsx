import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [products, setProducts] = useState([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // Products filtered by search/category
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const itemsPerPage = 12; // Items to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allProducts = [];
        for (let i = 0; i < 17; i++) { // Fetch all products across all pages
          const res = await fetch(`https://dummyjson.com/products?limit=30&skip=${i * 30}`);
          if (!res.ok) throw new Error("Failed to fetch products");
          const data = await res.json();
          allProducts.push(...data.products);
        }
        setProducts(allProducts);
        setFilteredProducts(allProducts); // Default view is all products
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      // Filter by search term and category
      let filtered = products;

      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }

      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to the first page when filters change
    };

    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  // Calculate products to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-6">
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Categories Dropdown */}
      <Categories onSelectCategory={setSelectedCategory} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-6">
          No products match your search or category.
        </p>
      )}
    </div>
  );
};

export default Home;
