import { useState, useEffect, useCallback } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
//import { productData } from "../assets/productdata";

export const AppContext = createContext({
    productData: [],
    cartData: {},
});

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
    const [productData, setProductData] = useState([]);

    // ================= PRODUCTS =================

    const fetchProductList = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list-products");

            if (response.data.success) {
                setProductData(response.data.productData);
             //   console.log("Products =====", response.data.productData);
            } else {
                setProductData([]);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setProductData([]);
        }
    }

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
            toast.success("Added to cart!");

        } catch (error) {
            console.error("Add to cart failed:", error);
            toast.error("Unable to add item to cart.");
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
            toast.info("Removed from cart.");

        } catch (error) {
            console.error("Remove from cart failed:", error);
            toast.error("Unable to remove item from cart.");
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
        if (!itemId) {
            toast.error("Unable to update wishlist.");
            return;
        }

        let previousWishlistData = {};
        let optimisticWishlistData = {};
        let isAdding = true;

        setWishlistData((prev) => {
            previousWishlistData = { ...(prev || {}) };
            const updated = { ...(prev || {}) };
            isAdding = !Boolean(updated[itemId]);

            if (isAdding) {
                updated[itemId] = true;
            } else {
                delete updated[itemId];
            }

            optimisticWishlistData = updated;
            return updated;
        });

        try {
            if (token) {
                const response = await axios.post(
                    backendUrl + "/api/cart/add-to-wishlist",
                    { itemId },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (response.data.success) {
                    const updatedWishList = response.data.wishList || optimisticWishlistData;
                    const isWishlisted = response.data.isWishlisted ?? Boolean(updatedWishList[itemId]);
                    setWishlistData(updatedWishList);

                    if (isWishlisted) {
                        toast.success("Added to wishlist!");
                    } else {
                        toast.success("Removed from wishlist!");
                    }
                } else {
                    setWishlistData(previousWishlistData);
                    toast.error(response.data.message || "Wishlist update failed");
                }
            } else {
                toast.success(isAdding ? "Added to wishlist!" : "Removed from wishlist!");
            }
        } catch (error) {
            setWishlistData(previousWishlistData);
            console.error("Wishlist update failed:", error);
            toast.error(error?.response?.data?.message || "Unable to update wishlist.");
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

            if (response.data.success) {
                const wishList = response.data.wishList || {};
                setWishlistData(wishList);
            }

        } catch (error) {
            console.error("Wishlist load failed:", error);
        }
    }, [backendUrl, token]);

    // ================= HELPERS =================

    const getTotalCartItems = () => {
        let total = 0;

        for (let key in cartData) {
            if (cartData[key] > 0) {
                const itemExists = productData.find(
                    (item) => item?._id?.toString() === key
                );

                if (itemExists) {
                    total += cartData[key] //* itemExists.price;
                }
            }
        }

        return total;
    };

    const getTotalWishlistItems = () => {
        return Object.keys(wishlistData || {}).length;
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
            fetchProductList();
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
    }, [token]);

    // ================= CONTEXT VALUE =================

    const value = {
        backendUrl,
        productData, fetchProductList,
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
