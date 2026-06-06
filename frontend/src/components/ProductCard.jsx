import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {

    const { cartData, setCartData, backendUrl,  addToWishlist, addToCart, removeFromCart, wishlistData } = useContext(AppContext);
    
    //const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const imageUrl = `${backendUrl}/uploads/${product.image}`;

    const added = Boolean(cartData[product._id]);

    const navigate = useNavigate();

    return (
        <motion.div
            id={product._id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-yellow-400/20 transition cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            <img src={imageUrl} alt={product.name} className="rounded-xl mb-3 w-full h-36 sm:h-44 object-cover" />

            <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-2">{product.name}</h3>
                        <p className="text-yellow-400 font-bold text-sm">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); addToWishlist(product._id); }}
                        className="rounded-full p-2 bg-white/5 text-gray-200 hover:text-red-500 transition"
                    >
                        <Heart
                            size={18}
                            className={`${wishlistData[product._id] ? 'text-red-500 fill-red-500' : ''}`}
                        />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        disabled={added}
                        onClick={(e) => { e.stopPropagation(); addToCart(product._id); }}
                        className={`w-full flex items-center justify-center gap-2 bg-yellow-400 text-black px-3 py-2 rounded-full text-xs font-semibold transition ${added ? 'opacity-50 cursor-not-allowed' : 'hover:scale-95 cursor-pointer'}`}
                    >
                        <ShoppingCart size={18} />
                        {added ? <span className="text-gray-500">Added</span> : <span>Add to Cart</span>}
                    </button>

                    {
                        cartData[product._id] && (
                            <div className="food-item-counter justify-between gap-2 bg-gray-800 p-2">
                                <button
                                    type="button"
                                    className="counter-btn"
                                    onClick={(e) => { e.stopPropagation(); removeFromCart(product._id); }}
                                >
                                    <span className="remove-symbol material-symbols-outlined cursor-pointer text-red-100">remove</span>
                                </button>
                                <span className="border border-amber-400 rounded-full bg-amber-50 text-black font-semibold px-2 py-1 text-sm">{cartData[product._id]}</span>
                                <button
                                    type="button"
                                    className="counter-btn"
                                    onClick={(e) => { e.stopPropagation(); addToCart(product._id); }}
                                >
                                    <span className="add-symbol material-symbols-outlined cursor-pointer text-blue-200">add</span>
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </motion.div>
    );
}
