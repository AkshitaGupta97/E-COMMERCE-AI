import { useContext, useEffect, useState,  } from "react";
import { AdminContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {

    const [state, setState] = useState('Login');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, backendUrl, token } = useContext(AdminContext);

    const onSubmitHandler = async(event) => {
        event.preventDefault();
        try {
            if(state === 'Login'){
                const { data } = await axios.post(
                    `${backendUrl}/api/admin/login`,
                    { email, password }
                );

                if(data.success){
                    localStorage.setItem('adToken', data.token);
                    setToken(data.token);
                    toast.success(data.message);
                }
                else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            toast.error('An error occurred while logging in.');
        }
    }

    useEffect(() => {
        if(token){
            navigate('/');
        }
    }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-yellow-300 mb-2">NeuroCart Admin</h1>
                <p className="text-slate-400">Admin Login Portal</p>
            </div>
            
            <form onSubmit={onSubmitHandler} className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl shadow-slate-950/50 p-8">
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-200 mb-3" htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition duration-200" 
                        placeholder="admin@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-slate-200 mb-3" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition duration-200" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="w-full cursor-pointer bg-linear-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                    Sign In
                </button>
            </form>
            
            <div className="mt-8 text-center text-slate-400 text-sm">
                <p>Protected Admin Area</p>
            </div>
        </div>
    </div>
  )
}

export default Login
