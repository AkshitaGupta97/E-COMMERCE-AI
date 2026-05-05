
//import ProductCard from "../components/ProductCard"
import { useContext, useEffect } from "react";
import { productData } from "../assets/productdata.js"
import Banner from "./Banner.jsx"
import NewArrivals from "./NewArrivals.jsx"
import { AppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

const Home = () => {
    const {productData} = useContext(AppContext);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product');
        if (productId) {
            const element = document.getElementById(productId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [productData]);

    return (
        <div className="mt-36 px-8">
             <Banner />
            <p className="text-lg text-blue-200 mb-6">Discover the best products at unbeatable prices. Shop now and experience the future of online shopping with AI-powered recommendations!</p>
            <div id="products" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productData.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <NewArrivals />
           
        </div>
    )
}

export default Home
