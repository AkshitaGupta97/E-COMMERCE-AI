import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
//import Shop from "./pages/Shop";
import Deals from "./components/Deals";
import NewArrivals from "./pages/NewArrivals";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Fashion from "./components/Fashion";
import WishList from "./components/WishList";
import ProductDetails from "./components/ProductDetails";
import Login from "./pages/Login";
import { AppContext } from "./context/AppContext";
import UserDetails from "./components/UserDetails";

function App() {
  const { token } = useContext(AppContext);

  const RequireAuth = ({ children }) => {
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      <div className="App">
        <Navbar />
        {/* MAIN CONTENT */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          <Route path="/deals" element={
            <RequireAuth>
              <Deals />
            </RequireAuth>
          } />
          <Route path="/my-profile" element={
            <RequireAuth>
              <UserDetails />
            </RequireAuth>
          } />
          <Route path="/cart" element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          } />
          <Route path="/fashion" element={
            <RequireAuth>
              <Fashion />
            </RequireAuth>
          } />
          <Route path="/wishlist" element={
            <RequireAuth>
              <WishList />
            </RequireAuth>
          } />
          
          <Route path="/product/:id" element={
            <RequireAuth>
              <ProductDetails />
            </RequireAuth>
          } />
          <Route path="/new-arrivals" element={
            <RequireAuth>
              <NewArrivals />
            </RequireAuth>
          } />
          <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App
