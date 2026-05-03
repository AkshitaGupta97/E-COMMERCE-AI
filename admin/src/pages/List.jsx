import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = () => {
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);

    const fetchList = async() => {
        const response = await axios.get(`${url}/api/product/list-products`);
        console.log(response.data);
        try {
            if(response.data.success){
                setList(response.data.productData);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(response.data.message)
            console.error("Request error:", error)
        }
    }

    const removedProduct = async(foodId) => {
        const response = await axios.delete(`${url}/api/product/remove-product`, {data: {id: foodId}});
        await fetchList();
        if(response.data.success){
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        fetchList();
    },[]);

  return (
    <div>
        <h1 className="text-2xl font-bold text-yellow-300 mb-6">Product List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                    <img
                        className="w-full h-48 rounded-lg object-cover"
                        src={`${url}/uploads/${item.image}`}
                        alt={item.name}
                    />
                    <p className=" font-semibold text-green-600">${item.price.toFixed(2)}</p>
                    <button 
                        onClick={() => removedProduct(item._id)}
                        className="mt-2 bg-red-500 cursor-pointer font-semibold text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default List
