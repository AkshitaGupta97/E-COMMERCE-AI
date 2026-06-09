import { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import Beauty from "./components/Beauty";
import Grocery from "./components/Grocery";
import PlaceOrder from "./components/PlaceOrder";
import ChatBox from "./components/ChatBox";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

function App() {
  const { token } = useContext(AppContext);

  const RequireAuth = ({ children }) => {
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />
      <div className="App">
        <RequireAuth>
          <Navbar />
        </RequireAuth>
        <ScrollToTop />
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
          <Route path="/beauty" element={
            <RequireAuth>
              <Beauty />
            </RequireAuth>
          } />
          <Route path="/grocery" element={
            <RequireAuth>
              <Grocery />
            </RequireAuth>
          } />
          <Route path="/place-order" element={
            <RequireAuth>
              <PlaceOrder />
            </RequireAuth>
          } />
          <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
        </Routes>
      </div>
      <ChatBox />
      <Footer />
    </>
  );
}

export default App
