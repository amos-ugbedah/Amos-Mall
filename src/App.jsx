import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./Context/CartContext";  // Capital "C"
import { WishlistProvider } from "./Context/WishlistContext";  // Capital "C"
import { CurrencyProvider } from "./Context/CurrencyContext";  // Capital "C"
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { Home, ProductDetail, CategoryProducts, CartPage, CheckoutPage, WishlistPage, OrderSuccess } from "./pages";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <CurrencyProvider>
            <ErrorBoundary>
              <Header />
              <SearchBar searchTerm="" setSearchTerm={() => {}} />
              <ScrollToTop /> {/* Ensure page scrolls to top on navigation */}
              <main className="flex-grow pt-32">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  <Route path="/category/:categoryName" element={<CategoryProducts />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/order-success" element={<OrderSuccess />} /> {/* New Order Success Page */}
                </Routes>
              </main>
              <Footer />
            </ErrorBoundary>
          </CurrencyProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
