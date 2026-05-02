
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AddProduct from './pages/AddProduct'
import Orders from './pages/Orders'
import List from './pages/List'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ToastContainer />

      <Navbar />

      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        <Routes>
          <Route
            index
            element={
              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                <h1 className="mb-3 text-3xl font-semibold text-yellow-300">Welcome to NeuroCart Admin</h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300">
                  Use the navigation above to manage dashboard data, orders, products, customers, and settings.
                </p>
              </section>
            }
          />
          <Route path="add" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<List />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
