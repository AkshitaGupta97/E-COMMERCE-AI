import ProductCard from "../components/ProductCard";
import { productData } from "../assets/productdata";

const NewArrivals = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="inline-flex rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                New Arrivals
              </p>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Explore our latest arrivals
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                  Shop the freshest AI-curated gadgets and accessories. Every product is hand-picked to give you a premium, modern shopping experience.
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-950/80 px-5 py-4 text-center text-slate-300 shadow-inner shadow-slate-900/50">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Featured</p>
              <p className="mt-2 text-3xl font-semibold text-white">{productData.length} Products</p>
              <p className="text-sm text-slate-400">New arrivals, ready to ship</p>
            </div>
          </div>
        </section>

        <section>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {productData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default NewArrivals;
