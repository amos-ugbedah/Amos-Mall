import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  // Ad messages with their corresponding navigation paths and styles
  const ads = [
    { text: "Welcome to Amos ShopEase", path: "/contact", style: "text-[3rem] text-yellow-600 font-extrabold" },
    { text: "Brand Day - Shop Now!", path: "#all-products", style: "text-[3rem] text-red-500 font-extrabold" },
    { text: "Up to 50% OFF Live Now!", path: "#discounts", style: "text-[3rem] text-green-400 font-extrabold" },
    { text: "Sell on ShopEase", path: "/sell", style: "text-[3rem] text-purple-400 font-bold" }
  ];

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 4000); // Change ad every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [ads.length]);

  return (
    <header className="bg-blue-600 text-white shadow-md h-40 flex flex-col relative w-full">
      {/* Ad Banner with Horizontal Scrolling Animation */}
      <div
        className="absolute top-8 w-full overflow-hidden bg-blue-700 cursor-pointer h-16 flex items-center"
        onClick={() => navigate(ads[currentAdIndex].path)}
      >
        <motion.div
          key={currentAdIndex}
          initial={{ x: "100%" }} // Start from the right
          animate={{ x: "-100%" }} // Move to the left
          transition={{ duration: 8, ease: "linear", repeat: Infinity }} // Smooth infinite scroll
          className={`whitespace-nowrap ${ads[currentAdIndex].style}`} // Prevent text wrapping
        >
          {ads[currentAdIndex].text}
        </motion.div>
      </div>

      {/* Logo and Navigation at the Bottom Left */}
      <div className="absolute bottom-4 left-0 flex items-center p-4">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <FaShoppingCart /> Amos ShopEase
        </Link>
      </div>
    </header>
  );
};

export default Header;