import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Plus, Trash2, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../config/siteConfig";

const sampleProducts = [
  { id: 1, name: "Landing Page Express", category: "Web", desc: "Diseño moderno + botón WhatsApp" },
  { id: 2, name: "Catálogo Digital Auto-administrable", category: "Comercio", desc: "Vitrina móvil sin comisiones" },
  { id: 3, name: "Bot de Respuesta Rápida", category: "IA", desc: "Atención automática 24/7" },
  { id: 4, name: "Mini-CRM de Prospectos", category: "Gestión", desc: "Seguimiento visual de clientes" },
];

export default function CatalogDemoPage() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("miparcero_demo_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("miparcero_demo_cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const sendOrderToWhatsApp = () => {
    const list = cart.map((item) => `• ${item.name}`).join("\n");
    const msg = `Hola MIPARCERO, probé la demo del Catálogo Inteligente y armé esta selección:\n\n${list}\n\nQuisiera recibir asesoría.`;
    window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-12 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300">
          <ArrowLeft className="h-4 w-4" /> Volver a MIPARCERO.
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              Ruta Real: /demo/catalogo
            </span>
            <h1 className="mt-2 text-3xl font-bold text-white">Demo: Catálogo con Pedido Directo</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Funciona 100% offline con guardado automático en localStorage y cierre por WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {sampleProducts.map((prod) => {
              const inCart = cart.some((item) => item.id === prod.id);
              return (
                <div key={prod.id} className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                  <div>
                    <span className="text-xs font-semibold text-violet-400">{prod.category}</span>
                    <h3 className="mt-1 text-lg font-bold text-white">{prod.name}</h3>
                    <p className="mt-1 text-xs text-zinc-400">{prod.desc}</p>
                  </div>
                  <button
                    onClick={() => addItem(prod)}
                    disabled={inCart}
                    className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-600 disabled:opacity-40"
                  >
                    <Plus className="h-4 w-4" />
                    {inCart ? "Agregado a la solicitud" : "Agregar al pedido"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-violet-500/30 bg-zinc-900/80 p-6 lg:col-span-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <ShoppingCart className="h-5 w-5 text-violet-400" />
              Resumen de Solicitud ({cart.length})
            </h2>

            {cart.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">Agrega soluciones desde el catálogo para probar el envío estructurado.</p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm">
                    <span>{item.name}</span>
                    <button onClick={() => removeItem(item.id)} className="text-zinc-500 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={sendOrderToWhatsApp}
              disabled={cart.length === 0}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-40"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar pedido a WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
