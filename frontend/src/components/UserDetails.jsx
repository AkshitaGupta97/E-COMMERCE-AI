
const UserDetails = () => {
  return (
    <div className="mt-40 pl-4 pr-4 flex justify-center text-center text-xl font-semibold text-white">
        
        <div className="max-w-3xl w-full bg-gray-900 p-6 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            
            <div className="space-y-4">
                <p><span className="font-semibold">Name:</span> John Doe</p>
                <p><span className="font-semibold">Email:</span> john.doe@example.com</p>
            </div>
        </div>
        
    </div>
  )
}

export default UserDetails
