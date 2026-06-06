import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 px-4 mt-4 py-8 sm:px-6 lg:px-10 mb-6 shadow-2xl shadow-slate-950/30">
      <div className="mx-auto grid max-w-6xl gap-6 grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center">
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/20 order-1 lg:order-2">
          <img
            src="https://graphicsfamily.com/wp-content/uploads/edd/2022/11/Online-Shopping-AD-Banner-Design-in-Photoshop-1180x664.jpg"
            alt="ShopEase banner"
            loading="lazy"
            className="w-full object-cover h-56 sm:h-72 md:h-80 lg:h-96"
          />
           <div className="hidden sm:block absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent px-4 sm:px-6 py-4 text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Shop smarter with AI</p>
            <p className="mt-1 text-base font-semibold sm:text-lg">
              Hand-picked collections, tailored recommendations, and exclusive offers.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
          <p className="inline-flex rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            AI shopping made simple
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Welcome to <span className="text-emerald-400">NeuroCart</span>
          </h1>
          <p className="max-w-xl text-base text-slate-300 sm:text-lg">
            Discover the future of online shopping with AI-powered recommendations, fast checkout, and curated deals tailored just for you.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <a href="/#products" className="w-full sm:w-auto text-center rounded-full bg-emerald-400 px-6 py-3 cursor-pointer text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
              Start Shopping
            </a>
            <button onClick={() => navigate("/deals")} className="w-full sm:w-auto text-center rounded-full border cursor-pointer border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-300">
              Explore Deals
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/5 p-3 text-center text-white/90">
              <p className="text-lg font-semibold">500+</p>
              <p className="text-xs text-slate-400">AI-curated</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3 text-center text-white/90">
              <p className="text-lg font-semibold">24/7</p>
              <p className="text-xs text-slate-400">Support</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3 text-center text-white/90">
              <p className="text-lg font-semibold">Fast</p>
              <p className="text-xs text-slate-400">Checkout</p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Banner;
