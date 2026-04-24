
const Deals = () => {
  return (
    <div className="min-h-screen font-semibold pt-16 pb-12 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-300">Today's Deals</h1>
        <p className="text-center text-gray-400 mb-12">Discover amazing discounts and limited-time offers on our top products. Don't miss out on these exclusive deals!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Example Deal Card */}
          <div className="bg-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-yellow-400/20 transition">
            <img src="https://th.bing.com/th/id/OIP.--Bhv05grQ8eBnssITOZqgHaIt?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Deal Product" className="rounded-xl mb-3" />
            <h3 className="text-white font-semibold">Product Name</h3>
            <p className="text-yellow-400 font-bold">₹9,999</p>
            <p className="text-gray-400 text-sm mt-1">Limited time offer - 50% off!</p>
          </div>
          {/* Repeat similar deal cards as needed */}
        </div>
      </div>
      
    </div>
  )
}

export default Deals
