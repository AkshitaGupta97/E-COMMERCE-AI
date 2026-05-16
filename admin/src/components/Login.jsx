
const Login = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold text-center mt-10">Admin Login</h1>
        <form className="max-w-md mx-auto mt-6 p-6 bg-slate-900/80 rounded-lg shadow-lg">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" className="w-full px-3 py-2 rounded-lg bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-300" placeholder="Enter your email" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                <input type="password" id="password" className="w-full px-3 py-2 rounded-lg bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-300" placeholder="Enter your password" />
            </div>
            <button type="submit" className="w-full bg-yellow-300 text-slate-900 cursor-pointer font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                Login
            </button>
        </form>
    </div>
  )
}

export default Login
