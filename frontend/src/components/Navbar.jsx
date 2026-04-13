import { useState } from "react";
import neurologo from "../assets/neurologo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md font-medium md:font-semibold bg-white/10 border-b border-white/20 text-white px-6 py-3 flex items-center justify-between fixed top-0 w-full z-50 shadow-lg">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={neurologo} alt="logo" className="h-20 w-auto" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 ">
        <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
        <Link to="/shop" className="hover:text-yellow-400 transition">Shop</Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none text-sm w-full placeholder-gray-300"
        />
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-6">
        
        {/* Cart */}
        <Link to="/cart" className="relative hover:text-yellow-400 transition">
          🛒
          <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-1.5 rounded-full">
            2
          </span>
        </Link>

        {/* Login */}
        <Link to="/login" className="hover:text-yellow-400 transition">
          Login
        </Link>
      </div>

      {/* Mobile Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full backdrop-blur-md bg-black/80 flex flex-col items-center gap-4 py-6 md:hidden">
          
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded-full w-4/5 text-black"
          />

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
