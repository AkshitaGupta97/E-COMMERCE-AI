
import { useContext, useEffect } from "react";
import ProductCard from "./ProductCard";
import { AppContext } from "../context/AppContext";

const Fashion = () => {
  const { productData } = useContext(AppContext);

  const filteredProducts = productData.filter(product => product.category === "fashion");

  return (
    <div className="min-h-screen pt-16 pb-12 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-300">Fashion Category Page</h1>
        <p className="text-center text-gray-400 mb-12">Explore the latest trends and styles in our fashion category. From chic apparel to stylish accessories, find everything you need to elevate your wardrobe!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fashion;
