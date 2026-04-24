import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function ProductCard({ product }) {

    const { cartData, setCartData, addToWishlist, addToCart, removeFromCart, wishlistData } = useContext(AppContext);

    const [added, setAdded] = useState(false);

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
                <button disabled={added}  onClick={() => {addToCart(product.id); setAdded(true)}}
                 className="mt-3 flex items-center gap-2  bg-yellow-400 text-black px-4 py-2  rounded-full hover:scale-95 cursor-pointer text-sm font-semibold transition">
                    <ShoppingCart size={18} />
                    {
                        added ? <span className="text-gray-500">Added</span> : <span>Add to Cart</span>
                    }
                </button>

                <button onClick={() => addToWishlist(product.id)}>
                    <Heart 
                        size={18} 
                        className={`cursor-pointer transition ${wishlistData[product.id] ? 'text-red-500 fill-red-500' : 'text-gray-200 hover:text-red-500'}`} 
                    />
                </button>

                <button>
                    {
                        !cartData[product.id] ? (
                            <p onClick={() => addToCart(product.id)}>
                                <span className="material-symbols-outlined text-gray-200 cursor-pointer hover:text-yellow-400 transition">
                                    add
                                </span>
                            </p>
                        ) : (
                            <div className="food-item-counter">
                                <p className="counter-btn" onClick={() => removeFromCart(product.id)}>
                                    <span className="remove-symbol material-symbols-outlined cursor-pointer text-red-100">remove</span>
                                </p>
                                <p className="border border-amber-400 rounded-full bg-amber-50 text-black font-semibold">{cartData[product.id]}</p>
                                <p className="counter-btn" onClick={() => addToCart(product.id)}>
                                    <span className="add-symbol material-symbols-outlined cursor-pointer text-blue-200">add</span>
                                </p>
                            </div>
                        )
                    }
                </button>

            </div>
        </motion.div>
    );
}
