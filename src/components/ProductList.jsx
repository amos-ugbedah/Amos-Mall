import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    title: "Product 1",
    thumbnail: "https://example.com/product1.jpg",
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    minimumOrderQuantity: 1,
  },
  // Add more products here
];

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;