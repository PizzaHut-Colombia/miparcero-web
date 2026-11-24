import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { demoStoreInfo, demoProducts } from "../data/catalogDemoData";
import DemoProductGrid from "../components/DemoProductGrid";
import DemoCheckoutSidebar from "../components/DemoCheckoutSidebar";

export default function CatalogDemoPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [deliveryMode, setDeliveryMode] = useState("domicilio");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("miparcero_real_cart");
    return saved ? JSON.parse(saved) : [{ ...demoProducts[0], qty: 1 }];
  });

  useEffect(() => {
    localStorage.setItem("miparcero_real_cart", JSON.stringify(cart));
  }, [cart]);

  const categories = ["Todos", ...new Set(demoProducts.map((p) => p.category))];

  const filteredProducts = demoProducts.filter((p) => {
    const matchesCat = category === "Todos" || p.category === category;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <div className="border-b border-violet-500/20 bg-violet-950/20 px-4 py-2.5 text-center text-xs text-violet-200">
        Demostración funcional de <strong>MIPARCERO.</strong> — Así operaría la tienda digital de tu negocio sin comisiones.
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Volver a MIPARCERO.
            </Link>
            <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              {demoStoreInfo.businessName}
            </h1>
            <p className="text-xs text-zinc-400 sm:text-sm">{demoStoreInfo.tagline}</p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" /> Abierto • Pedidos activos
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <DemoProductGrid
            search={search}
            setSearch={setSearch}
            categories={categories}
            category={category}
            setCategory={setCategory}
            filteredProducts={filteredProducts}
            addToCart={addToCart}
          />

          <div className="lg:col-span-5">
            <DemoCheckoutSidebar
              cart={cart}
              setCart={setCart}
              updateQty={updateQty}
              deliveryMode={deliveryMode}
              setDeliveryMode={setDeliveryMode}
              customerName={customerName}
              setCustomerName={setCustomerName}
              address={address}
              setAddress={setAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
