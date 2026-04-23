import { useContext } from "react";
import { productData } from "../assets/productdata";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { cartData, addToCart, removeFromCart, getTotalCartItems } = useContext(AppContext);

  // Calculate total price
  const getTotalPrice = () => {
    let total = 0;
    productData.forEach((product) => {
      if (cartData[product.id]) {
        total += cartData[product.id] * product.price;
      }
    });
    return total;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Your Cart</h1>

        {getTotalCartItems() === 0 ? (
          <div className="glass p-8 text-center">
            <p className="text-xl text-yellow-400">Your cart is empty</p>
            <p className="text-gray-500 mt-2">Add some products to get started!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="glass p-6">
                <h2 className="text-xl font-semibold mb-6 text-white">Order Items</h2>

                {/* Header */}
                <div className="hidden md:grid font-semibold grid-cols-6 gap-4 mb-4 pb-4 border-b border-yellow-200 text-sm  text-gray-400">
                  <div className="col-span-2 ">Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total</div>
                  <div>Remove</div>
                </div>

                {/* Cart Items */}
                <div className="space-y-4">
                  {productData.map((product) => {
                    if (cartData[product.id]) {
                      return (
                        <div key={product.id} className="glass p-4 rounded-lg">
                          <div className="grid md:grid-cols-6 gap-4 items-center">
                            {/* Product Info */}
                            <div className="col-span-2 flex items-center gap-4">
                              <img
                                className="w-16 h-16 rounded-lg object-cover"
                                src={product.image}
                                alt={product.name}
                              />
                              <div>
                                <h3 className="font-semibold text-xs text-white">{product.name}</h3>
                                <p className="text-sm text-yellow-400  md:hidden">₹{product.price}</p>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="hidden md:block text-sm text-yellow-400 font-semibold">
                              ₹{product.price}
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-2">
                              <button
                                className="w-8 h-8 rounded-full bg-gray-700 font-bold cursor-pointer hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
                                onClick={() => removeFromCart(product.id)}
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-white font-medium">
                                {cartData[product.id]}
                              </span>
                              <button
                                className="w-8 h-8 rounded-full bg-blue-600 font-bold hover:bg-blue-500 cursor-pointer text-white flex items-center justify-center transition-colors"
                                onClick={() => addToCart(product.id)}
                              >
                                +
                              </button>
                            </div>

                            {/* Total */}
                            <div className="text-cyan-100 font-semibold">
                              ₹{cartData[product.id] * product.price}
                            </div>

                            {/* Remove */}
                            <button
                              className="text-red-400 hover:text-red-600 cursor-pointer transition-colors p-2"
                              onClick={() => removeFromCart(product.id)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6 text-white">Order Summary</h2>

                <div className="space-y-4 font-semibold">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({getTotalCartItems()} items)</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>₹{Math.round(getTotalPrice() * 0.18)}</span>
                  </div>

                  <hr className="border-gray-600" />

                  <div className="flex justify-between text-xl font-semibold text-white">
                    <span>Total</span>
                    <span>₹{getTotalPrice() + Math.round(getTotalPrice() * 0.18)}</span>
                  </div>
                </div>

                <button className="w-full btn-premium cursor-pointer mt-6 py-3 text-lg font-semibold">
                  Proceed to Checkout
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Secure checkout powered by SSL encryption
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
