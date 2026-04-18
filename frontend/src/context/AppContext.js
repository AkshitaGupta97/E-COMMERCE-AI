import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);

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
                setUserData({
                    ...data.user,
                    address: data.user.address || {line1: "", line2: ""}
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(token){
            loadUserProfileData()
        }
        else {
            setUserData(false);
        }
    },[token]);

    const value = {
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData,
        
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


}

export default AppContextProvider;
