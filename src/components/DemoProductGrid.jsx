import { Search, Plus } from "lucide-react";
import { formatCOP } from "../data/catalogDemoData";

export default function DemoProductGrid({
  search,
  setSearch,
  categories,
  category,
  setCategory,
  filteredProducts,
  addToCart,
}) {
  return (
    <div className="lg:col-span-7">
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Buscar producto o ingrediente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              category === cat
                ? "bg-violet-600 text-white"
                : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-zinc-400">{product.category}</span>
                {product.tag && (
                  <span className="rounded-full bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-violet-300">
                    {product.tag}
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-base font-bold text-white">{product.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">{product.desc}</p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-zinc-800/80 pt-3.5">
              <span className="text-base font-extrabold text-white">{formatCOP(product.price)}</span>
              <button
                onClick={() => addToCart(product)}
                className="inline-flex items-center gap-1 rounded-xl bg-zinc-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-violet-600"
              >
                <Plus className="h-3.5 w-3.5" /> Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
