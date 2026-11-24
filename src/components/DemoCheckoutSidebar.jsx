import { ShoppingBag, Plus, Minus, Trash2, MessageCircle, Store, Bike } from "lucide-react";
import { demoStoreInfo, formatCOP } from "../data/catalogDemoData";
import { getWhatsAppUrl } from "../config/siteConfig";

export default function DemoCheckoutSidebar({
  cart,
  setCart,
  updateQty,
  deliveryMode,
  setDeliveryMode,
  customerName,
  setCustomerName,
  address,
  setAddress,
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = deliveryMode === "domicilio" && cart.length > 0 ? demoStoreInfo.deliveryFee : 0;
  const total = subtotal + shipping;

  const handleCheckoutWhatsApp = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const itemsText = cart
      .map((i) => `• ${i.qty}x ${i.name} (${formatCOP(i.price * i.qty)})`)
      .join("\n");

    const deliveryText =
      deliveryMode === "domicilio"
        ? `Domicilio a: ${address.trim() || "Dirección por confirmar"}`
        : "Recoger en punto de venta";

    const msg = `Hola MIPARCERO, probé la demo de Catálogo Comercial (${demoStoreInfo.businessName}). Así llegaría un pedido real:\n\nCliente: ${customerName.trim() || "Cliente Demo"}\nEntrega: ${deliveryText}\n\nPedido:\n${itemsText}\n\nSubtotal: ${formatCOP(subtotal)}\nEnvío: ${formatCOP(shipping)}\nTotal: ${formatCOP(total)}`;

    window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleCheckoutWhatsApp}
      className="sticky top-6 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <ShoppingBag className="h-5 w-5 text-violet-400" />
          Tu Pedido
        </h2>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={() => setCart([])}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" /> Vaciar
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500">
          Selecciona productos del menú para armar un pedido de prueba.
        </p>
      ) : (
        <div className="mt-4 max-h-60 space-y-3 overflow-y-auto pr-1">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{item.name}</p>
                <p className="text-xs text-zinc-400">{formatCOP(item.price * item.qty)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQty(item.id, -1)}
                  className="rounded-lg border border-zinc-700 p-1 text-zinc-300 hover:bg-zinc-800"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-xs font-bold">{item.qty}</span>
                <button
                  type="button"
                  onClick={() => updateQty(item.id, 1)}
                  className="rounded-lg border border-zinc-700 p-1 text-zinc-300 hover:bg-zinc-800"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setDeliveryMode("domicilio")}
          className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition ${
            deliveryMode === "domicilio"
              ? "border-violet-500 bg-violet-500/15 text-white"
              : "border-zinc-800 bg-zinc-950 text-zinc-400"
          }`}
        >
          <Bike className="h-4 w-4" /> Domicilio
        </button>
        <button
          type="button"
          onClick={() => setDeliveryMode("recoger")}
          className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition ${
            deliveryMode === "recoger"
              ? "border-violet-500 bg-violet-500/15 text-white"
              : "border-zinc-800 bg-zinc-950 text-zinc-400"
          }`}
        >
          <Store className="h-4 w-4" /> Recoger
        </button>
      </div>

      <div className="mt-4 space-y-2.5">
        <input
          type="text"
          placeholder="Tu nombre"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
        />
        {deliveryMode === "domicilio" && (
          <input
            type="text"
            placeholder="Dirección de entrega (ej. Cra 5 # 10-20)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
          />
        )}
      </div>

      <div className="mt-5 space-y-1.5 border-t border-zinc-800 pt-4 text-xs">
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span>
          <span>{formatCOP(subtotal)}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Domicilio</span>
          <span>{shipping > 0 ? formatCOP(shipping) : "Gratis"}</span>
        </div>
        <div className="flex justify-between pt-2 text-base font-extrabold text-white">
          <span>Total a pagar</span>
          <span>{formatCOP(total)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={cart.length === 0}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:brightness-110 disabled:opacity-40"
      >
        <MessageCircle className="h-4 w-4" />
        Simular pedido por WhatsApp
      </button>
    </form>
  );
}
