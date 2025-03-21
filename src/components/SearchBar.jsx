// src/components/SearchBar.jsx
import { FiSearch } from "react-icons/fi";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full p-3 pl-10 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
