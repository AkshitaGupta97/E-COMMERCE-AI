
const Fashion = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold text-center mt-34 text-yellow-300">Fashion Category Page</h1>
        <p className="text-center text-gray-400 mt-4">Explore the latest trends and styles in our fashion category. From chic apparel to stylish accessories, find everything you need to elevate your wardrobe!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
            {/* Example Fashion Product Card */}
            <div className="bg-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-yellow-400/20 transition">
                <img src="https://th.bing.com/th/id/OIP.--Bhv05grQ8eBnssITOZqgHaIt?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Fashion Product" className="rounded-xl mb-3" />
                <h3 className="text-white font-semibold">Stylish Jacket</h3>
                <p className="text-yellow-400 font-bold">₹2,499</p>
                <p className="text-gray-400 text-sm mt-1">Trendy and comfortable jacket for all seasons.</p>
            </div>
            {/* Repeat similar fashion product cards as needed */}
        </div>
    </div>
  )
}

export default Fashion;
