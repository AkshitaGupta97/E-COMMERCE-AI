import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const [token, setTokenState] = useState(localStorage.getItem('adToken') ? localStorage.getItem('adToken') : '');
    
    const setToken = (newToken) => {
        if(newToken) {
            localStorage.setItem('adToken', newToken);
        } else {
            localStorage.removeItem('adToken');
        }
        setTokenState(newToken);
    };
    
    const value = {
        backendUrl,
        token,
        setToken
    };
    
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );

}

export default AdminContextProvider;
