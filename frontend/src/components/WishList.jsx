import { Link } from "react-router-dom"

const WishList = () => {
  return (
    <Link to="/product/1" className="min-h-[calc(100vh-80px)] mt-28 px-4">
      <h1 className="text-3xl font-bold text-center mt-10 text-yellow-300">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
        {/* Example Wishlist Product Card */}
        <div className="bg-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-yellow-400/20 transition">
          <img src="https://th.bing.com/th/id/OIP.--Bhv05grQ8eBnssITOZqgHaIt?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Wishlist Product" className="rounded-xl mb-3" />
          <h3 className="text-white font-semibold">Wishlist Product Name</h3>
          <p className="text-yellow-400 font-bold">₹9,999</p>
          <p className="text-gray-400 text-sm mt-1">This is a product you've added to your wishlist.</p>
        </div>
        {/* Repeat similar wishlist product cards as needed */}
      </div>
      
    </Link>
  )
}

export default WishList
