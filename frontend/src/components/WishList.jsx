import { useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext"
// import { productData } from "../assets/productdata";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const WishList = () => {
  const { wishlistData, backendUrl, getWishlistData, getValidWishlistData, productData, fetchProductList, token, addToWishlist } = useContext(AppContext);
  const validWishlistData = getValidWishlistData();
  const itemIds = Object.keys(validWishlistData);
  
  const wishlistItems = itemIds
    .map((itemId) => ({
      itemId,
      itemInfo: productData.find((item) => item?._id?.toString() === itemId),
    }))
    .filter(({ itemInfo }) => itemInfo);
  const hasSavedWishlistData = Object.keys(wishlistData || {}).length > 0;
  const isWaitingForProducts = hasSavedWishlistData && productData.length === 0;

  useEffect(() => {
    if (token) {
      getWishlistData();
    }

    if (productData.length === 0) {
      fetchProductList();
    }
  }, [token, getWishlistData, fetchProductList, productData.length]);

  const handleRemove = async (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    await addToWishlist(itemId);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] mt-32 px-4">
      <h1 className="text-3xl font-bold text-center mt-10 text-yellow-300">My Wishlist</h1>
      <div className="max-w-6xl mx-auto mt-10">
        {isWaitingForProducts ? (
          <div className="glass p-8 text-center">
            <p className="text-xl text-yellow-400">Loading wishlist...</p>
          </div>
        ) : itemIds.length === 0 ? (
          <div className="glass p-8 text-center">
            <p className="text-xl text-yellow-400">Your wishlist is empty</p>
            <p className="text-gray-500 mt-2">Add some products to get started!</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="glass p-8 text-center">
            <p className="text-xl text-yellow-400">Wishlist products are not available right now</p>
            <p className="text-gray-500 mt-2">Please refresh once products finish loading.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map(({ itemId, itemInfo }) => {
              return (
                <Link
                  key={itemId}
                  to={`/product/${itemId}`}
                  className="relative z-10 block w-full cursor-pointer glass p-4 rounded-lg transition hover:shadow-yellow-400/20"
                >
                  <div className="relative">
                    <img
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      src={`${backendUrl}/uploads/${itemInfo.image}`}
                      alt={itemInfo.name}
                    />
                    <button
                      onClick={(e) => handleRemove(e, itemId)}
                      className="absolute top-2 right-2 rounded-full p-2 bg-white/10 text-red-500 hover:bg-red-600 hover:text-white transition"
                    >
                      <Heart size={20} className="fill-red-500" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-lg text-white">{itemInfo.name}</h3>
                  <p className="text-yellow-400 font-bold text-sm">${itemInfo.price}</p>
                  <p className="text-gray-400 text-sm mt-3">
                    {itemInfo.description || "No description available."}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishList
