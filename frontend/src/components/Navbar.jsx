import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, User } from "lucide-react";
import neurocartlogo from "../assets/neurocartlogo.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);
  const [showDropdown, setShowDropDown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
    setShowDropDown(false);
  }

  return (
    <nav className="bg-black text-white font-semibold fixed w-full z-50 shadow-lg">

      {/* TOP BAR */}
      <div className="text-center text-sm py-1 bg-gray-900 text-gray-300">
        Free Shipping on Orders Above ₹499 🚚
      </div>

      {/* MAIN NAV */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3">

        {/* LEFT - LOGO */}
        <div className="text-2xl font-bold ">
          <img src={neurocartlogo} alt="logo" className="h-20 w-36" />
        </div>

        {/* CENTER - SEARCH (Hidden on mobile) */}
        <div className="hidden md:block w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-full text-white bg-gray-800 placeholder:text-gray-500 focus:outline-none"
          />
        </div>

        {/* RIGHT - ICONS */}
        <div className="hidden md:flex items-center gap-6 text-xl">
          {
            userData?.image ? (
              <img src={userData.image} alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            ) : (
              <div onClick={() => setShowDropDown(prev => !prev)}>
                <User className="cursor-pointer hover:text-yellow-400" />
              </div>
            )
          }
          {/* Arrow */}
          <span
            onClick={() => setShowDropDown(prev => !prev)}
            className="material-symbols-outlined text-emerald-100 cursor-pointer"
          >
            arrow_drop_down
          </span>

          {/* dropdown */}
          {
            showDropdown && (
              <div className="absolute right-10 top-24 bg-stone-900 text-shadow-white rounded shadow-lg w-48 p-4 flex flex-col gap-3 z-20">
                <p
                  onClick={() => {
                    navigate('/my-profile');
                    setShowDropDown(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-amber-400">
                    switch_account
                  </span>
                  <span className="font-semibold text-sm hover:underline">My Profile</span>
                </p>

                <p
                  onClick={logout}
                  className="flex items-center gap-2 hover:text-red-300 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-amber-400">
                    logout
                  </span>
                  <span className="font-semibold text-sm hover:underline">Logout</span>
                </p>

              </div>
            )
          }

          <Heart className="cursor-pointer hover:text-yellow-400" />

          <div className="relative cursor-pointer">
            <ShoppingCart className="hover:text-yellow-400" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1 rounded-full">
              2
            </span>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden cursor-pointer">
          {menuOpen ? (
            <X size={28} onClick={() => setMenuOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700 pt-1.5 px-6 pb-4 space-y-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full text-white bg-gray-800 placeholder:text-gray-500"
          />

          {/* LINKS */}
          <div className="flex flex-col gap-4 mt-1.5 cursor-pointer">
            <span>Home</span>
            <span>Shop</span>
            <span>Deals</span>
            <span>New Arrivals</span>
          </div>
          <hr className="text-gray-300" />
          {/* ICONS */}
          <div className="flex gap-6 text-xl cursor-pointer pt-3 border-t border-gray-700">
            {
              userData?.image ? (
                <img src={userData.image} alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setShowDropDown(prev => !prev)}
                />
              ) : (
                <div onClick={() => setShowDropDown(prev => !prev)}>
                  <User className="cursor-pointer hover:text-yellow-400" />
                </div>
              )
            }
           
            {/* dropdown */}
            {
              showDropdown && (
                <div className="absolute right-2 bottom-10 bg-stone-900 text-shadow-white rounded shadow-lg w-48 p-4 flex flex-col gap-3 z-20">
                  <p
                    onClick={() => {
                      navigate('/my-profile');
                      setShowDropDown(false);
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-amber-400">
                      switch_account
                    </span>
                    <span className="font-semibold text-sm hover:underline">My Profile</span>
                  </p>

                  <p
                    onClick={logout}
                    className="flex items-center gap-2 hover:text-red-300 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-amber-400">
                      logout
                    </span>
                    <span className="font-semibold text-sm hover:underline">Logout</span>
                  </p>

                </div>
              )
            }

            <Heart className="hover:text-amber-300" />
            <ShoppingCart className="hover:text-amber-300" />
          </div>
        </div>
      )}

      {/* CATEGORY STRIP */}
      <div className="hidden md:flex gap-8 cursor-pointer px-10 py-2 bg-gray-900 text-sm overflow-x-auto">
        <span className="hover:text-yellow-400 cursor-pointer">Electronics</span>
        <span className="hover:text-yellow-400 cursor-pointer">Fashion</span>
        <span className="hover:text-yellow-400 cursor-pointer">Home</span>
        <span className="hover:text-yellow-400 cursor-pointer">Beauty</span>
        <span className="hover:text-yellow-400 cursor-pointer">Sports</span>
        <span className="hover:text-yellow-400 cursor-pointer">Grocery</span>
      </div>

    </nav>
  );
};

export default Navbar;
