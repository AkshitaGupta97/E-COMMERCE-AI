import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
    
  return (
    <section className="w-full overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 px-4 mt-4 py-8 sm:px-6 lg:px-10 mb-6 shadow-2xl shadow-slate-950/30">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-6 text-center lg:text-left">
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
            <button onClick={() => navigate("/products")} className="rounded-full bg-emerald-400 px-6 py-3 cursor-pointer text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
              Start Shopping
            </button>
            <button onClick={() => navigate("/deals")} className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-300">
              Explore Deals
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/5 p-4 text-center text-white/90">
              <p className="text-2xl font-semibold">500+</p>
              <p className="text-sm text-slate-400">AI-curated products</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4 text-center text-white/90">
              <p className="text-2xl font-semibold">24/7</p>
              <p className="text-sm text-slate-400">Smart customer support</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4 text-center text-white/90">
              <p className="text-2xl font-semibold">Fast</p>
              <p className="text-sm text-slate-400">Secure checkout</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/20">
          <img
            src="https://graphicsfamily.com/wp-content/uploads/edd/2022/11/Online-Shopping-AD-Banner-Design-in-Photoshop-1180x664.jpg"
            alt="ShopEase banner"
            className="h-80 w-full object-cover sm:h-96 lg:h-112"
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent px-6 py-5 text-white">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Shop smarter with AI</p>
            <p className="mt-2 text-lg font-semibold sm:text-xl">
              Hand-picked collections, tailored recommendations, and exclusive offers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
