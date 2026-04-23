import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Deals from "./pages/Deals";
import NewArrivals from "./pages/NewArrivals";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

function App() {
  

  return (
    <>
      <div className="App">
        <Navbar />
          {/* MAIN CONTENT */}
          <Routes className="min-h-[calc(100vh-80px)]">
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/new-arrivals" element={<NewArrivals />} />

          </Routes>
        
      </div>
      <Footer />
    </>
  )
}

export default App
