import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CartProvider } from "./context/CartContext";  // Ensure CartProvider is used
import { WishlistProvider } from "./context/WishlistContext";  // Ensure WishlistProvider is used
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import {
  Home,
  ProductDetail,
  CategoryProducts,
  CartPage,
  CheckoutPage,
  WishlistPage,
  OrderSuccess,
} from "./pages";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Fix searchTerm state

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <CurrencyProvider>
          <CartProvider> {/* Ensure Cart Context is available */}
            <WishlistProvider> {/* Ensure Wishlist Context is available */}
              <Header />
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* ✅ Pass props properly */}
              <ScrollToTop />
              <main className="flex-grow pt-32">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  <Route
                    path="/category/:categoryName"
                    element={<CategoryProducts />}
                  />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                </Routes>
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </CurrencyProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
