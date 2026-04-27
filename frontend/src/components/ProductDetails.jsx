import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { productData } from "../assets/productdata";

const ProductDetails = () => {
    const { id } = useParams();
    const productId = Number(id);
    const product = productData.find((item) => item.id === productId);

    const { cartData, addToWishlist, addToCart, removeFromCart, wishlistData } = useContext(AppContext);

    if (!product) {
        return (
            <div className="min-h-[calc(100vh-80px)] mt-28 px-4 text-center text-white">
                <h1 className="text-3xl font-bold text-yellow-300">Product not found</h1>
                <p className="mt-4">Please select a valid product from the store.</p>
                <Link to="/" className="inline-block mt-6 px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">Back to Store</Link>
            </div>
        );
    }

    const quantity = cartData[productId] || 0;
    const added = quantity > 0;
    const isWishlisted = Boolean(wishlistData[productId]);

    return (
        <div className="min-h-[calc(100vh-80px)] mt-28 px-4 pb-16">
            <h1 className="text-2xl font-bold text-center mt-10 text-yellow-300">Product Details</h1>

            <div className="bg-gray-900 flex flex-col md:flex-row gap-4 p-6 rounded-3xl shadow-lg hover:shadow-yellow-400/20 transition max-w-5xl mx-auto mt-8">
                <img
                    src={product.image}
                    alt={product.name}
                    className="md:w-1/2 w-full h-72 md:h-auto rounded-2xl object-cover"
                />

                <div className="flex flex-col justify-between md:w-1/2 w-full">
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-2xl md:text-3xl">{product.name}</h3>
                        <p className="text-yellow-400 font-bold text-xl md:text-2xl">₹{product.price.toLocaleString("en-IN")}</p>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                            Discover the latest premium accessory designed to deliver crisp sound, comfortable fit, and long battery life.
                            This product detail view is powered by `productData`, and it updates automatically as you select different items.
                        </p>
                        
                    </div>

                    <div className="space-y-4">
                        <button
                            disabled={added}
                            onClick={() => addToCart(product.id)}
                            className={`w-full md:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-semibold transition ${added ? "opacity-50 cursor-not-allowed" : "hover:scale-95 cursor-pointer"}`}
                        >
                            {added ? "Added to Cart" : "Add to Cart"}
                        </button>

                        {added && (
                            <div className="flex items-center gap-4 text-white">
                                <button className="counter-btn rounded-full bg-gray-800 px-3 py-2" onClick={() => removeFromCart(product.id)}>
                                    <span className="material-symbols-outlined text-red-400">remove</span>
                                </button>
                                <span className="border border-amber-400 rounded-full bg-amber-50 text-black font-semibold px-4 py-2">{quantity}</span>
                                <button className="counter-btn rounded-full bg-gray-800 px-3 py-2" onClick={() => addToCart(product.id)}>
                                    <span className="material-symbols-outlined text-green-400">add</span>
                                </button>
                            </div>
                        )}

                        <button
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm cursor-pointer font-semibold transition ${isWishlisted ? "bg-red-600 text-white" : "bg-gray-800 text-gray-200 hover:bg-gray-700"}`}
                            onClick={() => addToWishlist(product.id)}
                        >
                            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>

            <section className="max-w-5xl mx-auto mt-10">
                <h2 className="text-xl font-bold text-white mb-4">More Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {productData.filter((item) => item.id !== productId).map((item) => (
                        <Link
                            key={item.id}
                            to={`/product/${item.id}`}
                            className="block rounded-3xl bg-gray-900 p-4 transition hover:shadow-yellow-400/20"
                        >
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-2xl mb-4" />
                            <div className="space-y-2">
                                <p className="text-white font-semibold">{item.name}</p>
                                <p className="text-yellow-400">₹{item.price.toLocaleString("en-IN")}</p>
                                <p className="text-gray-400 text-sm">View details for this item</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ProductDetails
