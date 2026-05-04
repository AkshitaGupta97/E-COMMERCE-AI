import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${url}/api/order/list`);

      if (response?.data?.success) {
        const data = response.data.data || [];
        setOrders(data);
        console.log("Orders fetched:", data);
      } else {
        const message = response?.data?.message || "Error fetching orders";
        setError(message);
        toast.error(message);
      }
    } catch (fetchError) {
      console.error("Orders fetch failed:", fetchError);
      const message = fetchError?.response?.data?.message || fetchError.message || "Unable to fetch orders";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });

      if (response?.data?.success) {
        await fetchOrders();
      } else {
        const message = response?.data?.message || "Unable to update order status";
        toast.error(message);
      }
    } catch (statusError) {
      console.error("Order status update failed:", statusError);
      toast.error(statusError?.message || "Unable to update order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-100">Orders</h1>

      {loading && <p className="text-slate-300">Loading orders...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && orders.length === 0 && <p className="text-slate-300">No orders found.</p>}

      <div className="space-y-4">
        {orders.map((order) => {
          const address = order.address || {};
          const amount = typeof order.amount === "number" ? order.amount.toFixed(2) : "0.00";
          const orderDate = order.date ? new Date(order.date).toLocaleString() : "N/A";
          const currentStatus = order.status || "Item Processing";

          return (
            <div key={order._id || `${order.userId}-${orderDate}`} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-xl font-bold text-gray-800">Order ID: {order._id || "Unknown"}</h2>
              <p className="text-gray-600">User ID: {order.userId || "Unknown"}</p>
              <p className="text-gray-600">Total Amount: ${amount}</p>
              <p className="text-gray-600">Payment Status: {order.payment ? "Paid" : "Not Paid"}</p>
              <p className="text-gray-600">
                Delivery Address: {order.address || "N/A"}
              </p>
              <p className="text-gray-600">Order Date: {orderDate}</p>
              <label className="mt-2 block text-sm font-medium text-gray-700">Status</label>
              <select
                value={currentStatus}
                onChange={(event) => statusHandler(event, order._id)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none"
              >
                <option value="Item Processing">Item Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
