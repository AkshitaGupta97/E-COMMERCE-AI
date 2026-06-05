import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {

    const {getTotalCartItems, backendUrl, token, productData, cartData, userData} = useContext(AppContext);
    const [data, setData] = useState({
        firstName: "", lastName: "", email: "",
        address: "", city: "", state: "", 
        pinCode: "", country: "", contact: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const placeOrder = async (event) => {
        event.preventDefault();

        const orderItems = [];
        productData.forEach((item) => {
          if (cartData[item._id] > 0) {
            const itemInfo = { ...item, quantity: cartData[item._id] };
            orderItems.push(itemInfo);
          }
        });

        if (!orderItems.length) {
          alert("Your cart is empty. Add items before placing an order.");
          return;
        }

        const missingField = [
          "firstName",
          "lastName",
          "email",
          "address",
          "city",
          "state",
          "pinCode",
          "country",
          "contact"
        ].find((field) => !data[field]?.toString().trim());

        if (missingField) {
          alert("Please fill in all shipping details before placing your order.");
          return;
        }

        if (!userData?._id) {
          alert("User profile is still loading. Please wait a moment and try again.");
          return;
        }

        const orderTotal = orderItems.reduce((sum, item) => {
          const price = Number(item.price) || 0;
          return sum + price * (Number(item.quantity) || 0);
        }, 0);

        const orderData = {
          address: `${data.address}, ${data.city}, ${data.state} - ${data.pinCode}, ${data.country}`,
          items: orderItems,
          amount: orderTotal + 10,
          userId: userData._id
        };

        try {
          const response = await axios.post(backendUrl + "/api/order/place", orderData, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data?.success && response.data?.session_url) {
            window.location.href = response.data.session_url;
            return;
          }

          alert(response.data?.message || "Order placement failed. Please try again.");
        } catch (error) {
          console.error("Place order error:", error);
          alert("Order placement failed. Please check your connection or try again later.");
        }
    }

    const navigate =  useNavigate();
    useEffect(() => {
      if(!token){
        navigate("/login");
      }
      else if(getTotalCartItems() === 0){
        navigate("/cart");
      }
    }, [token]);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-950/80 px-4 py-10 mt-20 sm:px-6">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-700/80 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40 sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-amber-300 font-semibold uppercase tracking-[0.24em] text-sm mb-2">Delivery Information</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Ready to place your order?</h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">Enter your shipping details and confirm your purchase.</p>
        </div>

        <form className="grid gap-6" onSubmit={placeOrder}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={data.firstName}
                onChange={onChangeHandler}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={onChangeHandler}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={data.address}
              onChange={onChangeHandler}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={data.city}
                onChange={onChangeHandler}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={data.state}
                onChange={onChangeHandler}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="pinCode">Pin Code</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={data.pinCode}
                onChange={onChangeHandler}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={data.country}
                onChange={onChangeHandler}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="contact">Contact Number</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={data.contact}
              onChange={onChangeHandler}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl cursor-pointer bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:from-blue-500 hover:to-sky-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder
