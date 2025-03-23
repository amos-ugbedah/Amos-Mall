import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar"; // Import SearchBar
import { Home, ProductDetail, CategoryProducts, CartPage, Checkout } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <CurrencyProvider>
            <ErrorBoundary>
              <Header />
              <SearchBar searchTerm="" setSearchTerm={() => {}} /> {/* Add SearchBar */}
              <main className="flex-grow pt-32"> {/* Adjust padding-top to pt-32 */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  <Route
                    path="/category/:categoryName"
                    element={<CategoryProducts />}
                  />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<Checkout />} />
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