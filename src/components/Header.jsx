// src/components/Header.jsx
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Importing icon

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <FaShoppingCart /> Amos ShopEase
        </Link>
      </div>
    </header>
  );
}

export default Header;
