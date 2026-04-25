import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProductDetails = () => {
    const { cartData, setCartData, addToWishlist, addToCart, removeFromCart, wishlistData } = useContext(AppContext);

    return (
        <div className="min-h-[calc(100vh-80px)] mt-28 px-4">
            <h1 className="text-2xl font-bold text-center mt-10 text-yellow-300">Product Details</h1>
            {/* Example Product Details Card */}
            <div className="bg-gray-900 flex flex-col md:flex-row gap-4 p-6 rounded-3xl shadow-lg hover:shadow-yellow-400/20 transition max-w-5xl mx-auto mt-8">
                <img
                    src="https://th.bing.com/th/id/OIP.--Bhv05grQ8eBnssITOZqgHaIt?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="Product Detail"
                    className="md:w-1/2 w-full h-72 md:h-auto rounded-2xl object-cover"
                />

                <div className="flex flex-col justify-between md:w-1/2 w-full">
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-xl md:text-2xl">Product Name</h3>
                        <p className="text-yellow-400 font-bold text-xl md:text-2xl">₹9,999</p>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                            This is a detailed description of the product. It includes features, specifications, and other relevant information that helps customers make informed purchasing decisions.
                        </p>
                        <h3 className="text-blue-400 font-semibold text-2xl md:text-3xl">Premium Tech Item</h3>
                    </div>

                    <div className="mt-2">
                        <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full hover:scale-95 cursor-pointer text-lg font-semibold transition">
                            {!cartData[1] ? (
                                <span onClick={() => addToCart(1)}>
                                    Add to Cart
                                </span>
                            ) : (
                                <div className="flex flex-row font-bold items-center gap-4">
                                    <p className="counter-btn" onClick={() => removeFromCart(1)}>
                                        <span className="remove-symbol material-symbols-outlined cursor-pointer text-red-600">remove</span>
                                    </p>
                                    <p className="border border-amber-400 rounded-full text-black font-semibold px-4 py-1">{cartData[1]}</p>
                                    <p className="counter-btn" onClick={() => addToCart(1)}>
                                        <span className="add-symbol material-symbols-outlined font-bold cursor-pointer text-green-600">add</span>
                                    </p>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
