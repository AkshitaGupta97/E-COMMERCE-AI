import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Orders = () => {

  const url = "http://localhost:4000";

  const [orders, setOrders] = useState([]);

  const fetchOrders = async() => {
    const response = await axios.get(url+"/api/order/list");
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error in Fetching data");
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId, status: event.target.value
    })
    if(response.data.success){
      await fetchOrders();
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="">
      <h1>Orders</h1>
      <div className="">
        {
          orders.map((order, index) => {
            return (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-bold text-gray-800">Order ID: {order._id}</h2>
                <p className="text-gray-600">User ID: {order.userId}</p>
                <p className="text-gray-600">Total Amount: ${order.amount.toFixed(2)}</p>
                <p className="text-gray-600">Payment Status: {order.payment ? "Paid" : "Not Paid"}</p>
                <p className="text-gray-600">Delivery Address: {order.address.line1}, {order.address.city}, {order.address.state}, {order.address.postal_code}, {order.address.country}</p>
                <p className="text-gray-600">Order Date: {new Date(order.date).toLocaleString()}</p>
                <select
                  value={order.status}
                  onChange={(event) => statusHandler(event, order._id)}
                  className="mt-2 p-2 border rounded"
                >
                  <option value="Item Processing">Item Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders
