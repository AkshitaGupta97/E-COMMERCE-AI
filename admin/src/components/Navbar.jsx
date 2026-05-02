import { useState } from 'react'
import { Link } from 'react-router-dom'
import neurocartlogo from '../assets/neurocartlogo.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-800 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={neurocartlogo} alt="NeuroCart logo" className="h-12 w-32 object-contain" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
            Admin Panel
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center cursor-pointer justify-center rounded-xl border border-slate-700 bg-slate-900/90 text-slate-200 transition hover:bg-slate-800 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <nav className="hidden items-center gap-4 text-sm font-medium text-slate-200 md:flex">
            <Link to="/add" className="rounded-lg px-3 py-2 transition hover:bg-slate-800 hover:text-white">
              Add Product
            </Link>
            <Link to="/orders" className="rounded-lg px-3 py-2 transition hover:bg-slate-800 hover:text-white">
              Orders
            </Link>
            <Link to="/products" className="rounded-lg px-3 py-2 transition hover:bg-slate-800 hover:text-white">
              Products
            </Link>
          </nav>

          <div className="hidden items-center gap-3 rounded-full bg-slate-900/90 px-3 py-2 text-slate-100 shadow-sm ring-1 ring-slate-700 md:flex">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-200">
              A
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-yellow-300">Admin</p>
              <p className="text-xs text-slate-400">Superuser</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${menuOpen ? 'block' : 'hidden'} border-t border-slate-800 bg-slate-950/95 px-4 pb-4 pt-3 md:hidden`}>
        <nav className="flex flex-col gap-2 text-sm font-medium text-slate-200">
          <Link
            to="/add"
            className="rounded-xl px-3 py-2 transition hover:bg-slate-800 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Add Product
          </Link>
          <Link
            to="/orders"
            className="rounded-xl px-3 py-2 transition hover:bg-slate-800 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/products"
            className="rounded-xl px-3 py-2 transition hover:bg-slate-800 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
        </nav>

        <div className="mt-4 flex items-center gap-3 rounded-full bg-slate-900/90 px-3 py-3 text-slate-100 shadow-sm ring-1 ring-slate-700">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-200">
            A
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Admin</p>
            <p className="text-xs text-slate-400">Superuser</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
