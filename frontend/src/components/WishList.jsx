import { useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext"
import { productData } from "../assets/productdata";
import { Link } from "react-router-dom";

const WishList = () => {
  const { wishlistData, getWishlistData, token } = useContext(AppContext);
  const itemIds = Object.keys(wishlistData || {});

  useEffect(() => {
    if (token) {
      getWishlistData(token);
    }
  }, [token, getWishlistData]);

  return (
    <div className="min-h-[calc(100vh-80px)] mt-28 px-4">
      <h1 className="text-3xl font-bold text-center mt-10 text-yellow-300">My Wishlist</h1>
      <div className="max-w-6xl mx-auto mt-10">
        {itemIds.length === 0 ? (
          <div className="glass p-8 text-center">
            <p className="text-xl text-yellow-400">Your wishlist is empty</p>
            <p className="text-gray-500 mt-2">Add some products to get started!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itemIds.map((itemId) => {
              const itemInfo = productData.find((item) => item.id.toString() === itemId);
              if (!itemInfo) return null;

              return (
                <Link to={`/product/${itemId}`} key={itemId} className="glass p-4 rounded-lg">
                  <img className="w-full h-48 object-cover rounded-lg mb-4" src={itemInfo.image} alt={itemInfo.name} />
                  <h3 className="font-semibold text-lg text-white">{itemInfo.name}</h3>
                  <p className="text-yellow-400 font-bold text-sm">${itemInfo.price}</p>
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

