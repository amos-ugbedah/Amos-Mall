import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-6 max-w-6xl mx-auto">
        {children}
      </main>

      {/* Footer (Optional, Future-proofing) */}
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Amos ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
