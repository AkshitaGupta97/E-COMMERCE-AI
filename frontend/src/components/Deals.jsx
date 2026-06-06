
import { useContext, useEffect } from "react";
import ProductCard from "./ProductCard";
import { AppContext } from "../context/AppContext";

const Deals = () => {
  const { productData } = useContext(AppContext);

  const filteredProducts = productData.filter(product => product.category === "deals");

  return (
    <div className="min-h-screen font-semibold pt-24 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-300">Today's Deals</h1>
        <p className="text-center text-gray-400 mb-12">Discover amazing discounts and limited-time offers on our top products. Don't miss out on these exclusive deals!</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals
