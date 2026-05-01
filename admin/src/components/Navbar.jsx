import { Link } from 'react-router-dom'
import neurocartlogom './assets/neurocartlogo.png'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-800 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={neurocartlogo} alt="NeuroCart logo" className="h-12 w-32 object-contain" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">
            Admin Panel
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-200 md:flex">
          <Link to="/dashboard" className="rounded-lg px-3 py-2 transition hover:bg-slate-800 hover:text-white">
            Dashboard
          </Link>
          <Link to="/orders" className="rounded-lg px-3 py-2 transition hover:bg-slate-800 hover:text-white">
            Orders
          </Link>
          <Link to="/products" className="rounded-lg px-3 py-2 transition hover:bg-slate-800 hover:text-white">
            Products
          </Link>
          <Link to="/customers" className="rounded-lg px-3 py-2 transition hover:bg-slate-800 hover:text-white">
            Customers
          </Link>
          <Link to="/settings" className="rounded-lg px-3 py-2 transition hover:bg-slate-800 hover:text-white">
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-800 md:inline-flex">
            New Product
          </button>
          <div className="flex items-center gap-3 rounded-full bg-slate-900/90 px-3 py-2 text-slate-100 shadow-sm ring-1 ring-slate-700">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-200">
              A
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Admin</p>
              <p className="text-xs text-slate-400">Superuser</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
