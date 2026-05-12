import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const PlaceOrder = () => {

    const {getTotalCartItems, backendUrl, token, productData, userData} = useContext(AppContext);
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
        let orderItems = [];
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 pb-12 px-4 mt-20">
        <p className="text-amber-300 font-semibold">Delivery Information</p>
    </div>
  )
}

export default PlaceOrder
