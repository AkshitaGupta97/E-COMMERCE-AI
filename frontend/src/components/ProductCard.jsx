import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

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

            <button className="mt-3 flex items-center gap-2  bg-yellow-400 text-black px-4 py-2  rounded-full hover:scale-95 cursor-pointer font-semibold transition">
                <ShoppingCart size={18} />
                Add to Cart
            </button>
        </motion.div>
    );
}
