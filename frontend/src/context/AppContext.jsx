import { useState, useEffect, useCallback } from "react";
import { createContext } from "react";
import axios from "axios";
import { productData } from "../assets/productdata";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const envUrl = import.meta.env.VITE_BACKEND_URL;

    const backendUrl = envUrl
        ? envUrl.startsWith("http")
            ? envUrl
            : `http://${envUrl}`
        : "http://localhost:4000";

    const [token, setToken] = useState(
        localStorage.getItem("token") || false
    );

    const [userData, setUserData] = useState(false);
    const [cartData, setCartData] = useState({});
    const [wishlistData, setWishlistData] = useState({});

    // ================= USER =================

    const loadUserProfileData = async () => {
        try {
            if (!token) return;

            const { data } = await axios.get(
                backendUrl + "/api/user/get-profile",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (data.success) {
                setUserData({ ...data.user });
            } else {
                setUserData(false);
            }

        } catch (error) {
            console.error("User load failed:", error);
            setUserData(false);
        }
    };

    // ================= CART =================

    const addToCart = async (itemId) => {
        try {
            setCartData((prev) => ({
                ...prev,
                [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
            }));

            if (token) {
                await axios.post(
                    backendUrl + "/api/cart/add",
                    { itemId },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }

        } catch (error) {
            console.error("Add to cart failed:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setCartData((prev) => {
                const updated = { ...prev };

                if (!updated[itemId]) return updated;

                if (updated[itemId] <= 1) {
                    delete updated[itemId];
                } else {
                    updated[itemId] -= 1;
                }

                return updated;
            });

            if (token) {
                await axios.post(
                    backendUrl + "/api/cart/remove",
                    { itemId },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }

        } catch (error) {
            console.error("Remove from cart failed:", error);
        }
    };

    const loadCartData = async () => {
        try {
            if (!token) return;

            const response = await axios.post(
                backendUrl + "/api/cart/get",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setCartData(response.data.cartData || {});

        } catch (error) {
            console.error("Cart load failed:", error);
            setCartData({});
        }
    };

    // ================= WISHLIST =================

    const addToWishlist = async (itemId) => {
        try {
            setWishlistData((prev) => {
                const updated = { ...prev };

                if (updated[itemId]) {
                    delete updated[itemId];
                } else {
                    updated[itemId] = true;
                }

                return updated;
            });

            if (token) {
                await axios.post(
                    backendUrl + "/api/cart/add-to-wishlist",
                    { itemId },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }

        } catch (error) {
            console.error("Wishlist update failed:", error);
        }
    };

    const getWishlistData = useCallback(async () => {
        try {
            if (!token) return;

            const response = await axios.post(
                backendUrl + "/api/cart/get-wishlist",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const wishList = response.data.wishList || {};
            setWishlistData(wishList);

        } catch (error) {
            console.error("Wishlist load failed:", error);
            setWishlistData({});
        }
    }, [backendUrl, token]);

    // ================= HELPERS =================

    const getTotalCartItems = () => {
        let total = 0;

        for (let key in cartData) {
            if (cartData[key] > 0) {
                const itemExists = productData.find(
                    (item) => item.id.toString() === key
                );

                if (itemExists) {
                    total += cartData[key];
                }
            }
        }

        return total;
    };

    const getTotalWishlistItems = () => {
        return Object.keys(wishlistData).length;
    };

    // ================= EFFECTS =================

    // Sync token to localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // Load user when token changes
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
            setCartData({});
            setWishlistData({});
        }
    }, [token]);

    // Load cart + wishlist when token ready
    useEffect(() => {
        if (token) {
            loadCartData();
            getWishlistData();
        }
    }, [token, getWishlistData]);

    // ================= CONTEXT VALUE =================

    const value = {
        backendUrl,

        token, setToken,

        userData, setUserData, loadUserProfileData,

        cartData, setCartData,
        addToCart, removeFromCart, loadCartData,
        getTotalCartItems,

        wishlistData,
        addToWishlist, getWishlistData,
        getTotalWishlistItems
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
