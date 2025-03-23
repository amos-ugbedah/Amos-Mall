import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=100"),
          fetch("https://dummyjson.com/products/categories"),
        ]);
        if (!productsRes.ok || !categoriesRes.ok) throw new Error("Failed to fetch data");
        
        const [productsData, categoriesData] = await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
        ]);
        
        setProducts(productsData.products);
        setFilteredProducts(productsData.products);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;
      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (selectedCategory) {
        filtered = filtered.filter((product) => product.category === selectedCategory);
      }
      setFilteredProducts(filtered);
      setCurrentPage(1);
    };
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Categories categories={categories} onSelectCategory={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => navigate(`/product/${product.id}`)} />
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          Next
        </button>
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No products match your search or category.</p>
      )}
    </div>
  );
};

export default Home;