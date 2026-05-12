import { useContext } from "react";
import ProductCard from "./ProductCard"
import { AppContext } from "../context/AppContext";

const Grocery = () => {
    const { productData } = useContext(AppContext);
    
    const filteredProducts = productData.filter(product => product.category === "grocery");
    
    return (
        <div className="min-h-screen pt-16 pb-12 px-4 mt-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6 text-yellow-300">Grocery Category Page</h1>
                <p className="text-center text-gray-400 mb-12">Discover our wide range of grocery items, from fresh produce to pantry staples. Shop quality products at competitive prices and enjoy convenient delivery options!</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Grocery
