import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/category/:categoryName" element={<CategoryProducts />} />
          </Routes>
        </main>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
