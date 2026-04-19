import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4 rounded-2xl shadow-lg 
                 hover:shadow-yellow-400/20 transition"
        >
            <img src={product.image} alt={product.name} className="rounded-xl mb-3" />

            <h3 className="text-white font-semibold">{product.name}</h3>
            <p className="text-yellow-400 font-bold">₹{product.price.toLocaleString('en-IN')}</p>

            <div className="flex items-center justify-between mt-1">
                <button className="mt-3 flex items-center gap-2  bg-yellow-400 text-black px-4 py-2  rounded-full hover:scale-95 cursor-pointer text-sm font-semibold transition">
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>

                <button>
                    <Heart size={18} className="text-gray-200 cursor-pointer hover:text-red-500 transition" />
                </button>

                <button>
                    <span className="material-symbols-outlined text-gray-200 cursor-pointer hover:text-yellow-400 transition">
                        add
                    </span>
                </button>

            </div>
        </motion.div>
    );
}
