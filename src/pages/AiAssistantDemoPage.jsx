import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Send, MessageCircle, Sparkles, Loader2 } from "lucide-react";
import { pizzaShopInfo, quickPrompts } from "../data/pizzaBotData";
import { getWhatsAppUrl } from "../config/siteConfig";

export default function AiAssistantDemoPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: `¡Hola! Soy ${pizzaShopInfo.botName} de ${pizzaShopInfo.shopName} 🍕. Pregúntame libremente por sabores, combinaciones mitad y mitad, promociones o pídeme lo que quieras.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const handleSend = async (textToSend) => {
    const cleanText = textToSend.trim();
    if (!cleanText || isLoading) return;

    const updatedMessages = [...messages, { id: Date.now(), sender: "user", text: cleanText }];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const [res] = await Promise.all([
        fetch("/api/pizza-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        }),
        new Promise((resolve) => setTimeout(resolve, 1800)),
      ]);

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: data.reply },
      ]);
      if (data.orderSummary) setActiveOrder(data.orderSummary);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "No pude conectar con el motor de IA. Verifica tu servidor local o conexión.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <div className="border-b border-violet-500/20 bg-violet-950/20 px-4 py-2.5 text-center text-xs text-violet-200">
        Demostración con <strong>Inteligencia Artificial Real (Gemini LLM)</strong> — Entrenada con la carta y reglas de negocio de una pizzería.
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a MIPARCERO.
        </Link>

        <div className="mt-4 flex items-center justify-between border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{pizzaShopInfo.shopName}</h1>
              <p className="text-xs text-zinc-400">Agente Conversacional con IA Real • Toma de pedidos y cálculos</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> IA Activa
          </span>
        </div>

        <div className="mt-6 h-[380px] space-y-4 overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900/50 p-5">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[82%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                    : "border border-zinc-800 bg-zinc-950 text-zinc-200"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-violet-400">
              <Loader2 className="h-4 w-4 animate-spin" /> NapoliBot IA está escribiendo...
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-violet-500 hover:text-white disabled:opacity-40"
            >
              <Sparkles className="h-3 w-3 text-violet-400" />
              {prompt}
            </button>
          ))}
        </div>

        {activeOrder && (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:flex-row">
            <div className="text-xs">
              <span className="font-semibold text-emerald-300">Orden estructurada por la IA:</span>
              <p className="mt-0.5 text-zinc-300">{activeOrder}</p>
            </div>
            <a
              href={getWhatsAppUrl(`Hola MIPARCERO, probé el Agente IA real (${pizzaShopInfo.shopName}) y esta fue la orden generada:\n\n• ${activeOrder}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
            >
              <MessageCircle className="h-4 w-4" /> Confirmar en WhatsApp
            </a>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="mt-4 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ej: Dame 1 familiar mitad pepperoni mitad 4 quesos y 2 limonadas de coco..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
