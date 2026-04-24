import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
//import {toast} from "react-toastify";
import { useEffect } from "react";
import { productData } from "../assets/productdata";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);
    const [cartData, setCartData] = useState({});
    const [wishlistData, setWishlistData] = useState({});

    // get user data
    const loadUserProfileData = async() => {
        try {
            
            const {data} = await axios.get(
                backendUrl + "/api/user/get-profile",
                {
                    headers: { Authorization: `Bearer ${token}`}
                }
            );

            if(data.success){
                setUserData({ ...data.user});
            }

        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = async(itemId) => {
        if(!cartData[itemId]){
            setCartData((prev) => ({...prev, [itemId] : 1}));
        }
        else {
            setCartData((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        }

        if(token){
            await axios.post(backendUrl + "/api/cart/add",
                { itemId },
                {
                    headers: { Authorization: `Bearer ${token}`}
                }
            );
        }
    }

    const removeFromCart = async(itemId) => {
        setCartData((prev) => ({...prev, [itemId]: Math.max(0, prev[itemId] - 1)})); // decrease the quantity of the item with itemId by 1, ensuring it doesn't go below 0
        if(token){
            await axios.post(backendUrl+"/api/cart/remove",
                { itemId },
                {
                    headers: { Authorization: `Bearer ${token}`}
                }
            );
        }
    }

    const loadCartData = async(token) => {
        const response = await axios.post(backendUrl+'/api/cart/get',  {},
            {
                headers: { Authorization: `Bearer ${token}`}
            }
        );
        setCartData(response.data.cartData)
    }

    const addToWishlist = async(itemId) => {
        // Toggle wishlist locally
        setWishlistData((prev) => {
            const newWishlist = { ...prev };
            if (newWishlist[itemId]) {
                delete newWishlist[itemId];
            } else {
                newWishlist[itemId] = true;
            }
            return newWishlist;
        });

        if(token){
            await axios.post(backendUrl + "/api/cart/add-to-wishlist",
                { itemId },
                {
                    headers: { Authorization: `Bearer ${token}`}
                }
            );
        }
    }

    const getWishlistData = async(token) => {
        const response = await axios.post(backendUrl+'/api/cart/get-wishlist',  {},
            {
                headers: { Authorization: `Bearer ${token}`}    
            }
        );
        setWishlistData(response.data.wishList || {});
        return response.data.wishList;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for(let key in cartData){
            if(cartData[key] > 0){
                let itemInfo = productData.find((item) => item.id.toString() === key);

                if(itemInfo){
                    totalItems += cartData[key];
                }
            }
        }
        return totalItems;
    }

    const getTotalWishlistItems = () => {
        return Object.keys(wishlistData).length;
    }

    useEffect(() => {
        if(token){
            loadUserProfileData()
        }
        else {
            setUserData(false);
        }
    },[token]);

    useEffect(() => {
        async function loadData() {

            if(localStorage.getItem("token")){
                await loadCartData(token);
                await getWishlistData(token);
            }
        }
        loadData();
    }, []);

    const value = {
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData,
        cartData, setCartData, addToCart, removeFromCart,
        getTotalCartItems,
        wishlistData, addToWishlist, getWishlistData, getTotalWishlistItems
        
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


}

export default AppContextProvider;
