import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm || ""); // Ensure inputValue is initialized

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerm(inputValue); // Update searchTerm after delay
    }, 1000); // 1-second debounce

    return () => clearTimeout(delay); // Cleanup to prevent multiple triggers
  }, [inputValue, setSearchTerm]);

  return (
    <div className="fixed top-16 left-0 w-full bg-white z-40 shadow-md"> {/* Fixed search bar */}
      <div className="container mx-auto p-4">
        <div className="relative w-full max-w-md mx-auto">
          {/* Search Icon */}
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update inputValue on change
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;