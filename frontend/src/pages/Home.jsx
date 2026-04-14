
import ProductCard from "../components/ProductCard"
import { productData } from "../assets/productdata.js"

const Home = () => {
    return (
        <div className="mt-48 px-8">
            <h1 className="text-4xl font-semibold mb-4">Welcome to Our E-Commerce Store!</h1>
            <p className="text-lg text-gray-300 mb-6">Discover the best products at unbeatable prices. Shop now and experience the future of online shopping with AI-powered recommendations!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productData.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Home
