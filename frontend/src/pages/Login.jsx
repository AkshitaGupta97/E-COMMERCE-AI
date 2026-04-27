import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {

    const [state, setState] = useState('Sign Up');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const { setToken, backendUrl, token } = useContext(AppContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(
                    `${backendUrl}/api/user/register`,
                    { name, email, password, address }
                );
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    toast.success(data.message);
                    setState('Login');
                } else {
                    toast.error(data.message);
                }
            }
            else {
                const { data } = await axios.post(
                    `${backendUrl}/api/user/login`,
                    { email, password }
                );
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    navigate('/');
                    toast.success(data.message);
                }
                else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            console.error('Error occurred while submitting the form:', error);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <div className="h-screen mt-32 min-h-screen w-full bg-linear-to-br flex items-center justify-center px-4 overflow-hidden">
            <form onSubmit={onSubmitHandler} className="w-full max-w-sm sm:max-w-md mx-auto p-5 sm:p-7 md:p-8 bg-slate-900/95 border border-slate-700 shadow-2xl shadow-black/30 rounded-3xl backdrop-blur-sm text-white max-h-[calc(100vh-4rem)] overflow-y-auto">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-center tracking-tight text-white">{state}</h2>
                {state === 'Sign Up' && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-semibold mb-1 text-slate-300">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-semibold mb-1 text-slate-300">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Enter your address"
                            />
                        </div>
                    </>
                )}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold mb-1 text-slate-300">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-semibold mb-1 text-slate-300">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-400 hover:scale-95 text-slate-950 font-semibold text-sm py-3 rounded-2xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
                >
                    {state === 'Sign Up' ? 'Sign Up' : 'Login'}
                </button>

                {
                    state === 'Sign Up' ? (
                        <p className="text-sm text-slate-400 mt-5 text-center">
                            Already have an account?{' '}
                            <span onClick={() => setState('Login')} className="text-cyan-400 cursor-pointer hover:underline">
                                Login here
                            </span>
                        </p>
                    ) : (
                        <p className="text-sm text-slate-400 mt-5 text-center">
                            Don't have an account?{' '}
                            <span onClick={() => setState('Sign Up')} className="text-cyan-400 cursor-pointer hover:underline">
                                Sign Up
                            </span>
                        </p>
                    )
                }

            </form>
        </div>
    )
}

export default Login
