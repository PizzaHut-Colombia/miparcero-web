import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";

export default function DemoSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [leadName, setLeadName] = useState("");
  const [leadNeed, setLeadNeed] = useState("Plataforma Web Comercial");

  const filteredDemos =
    selectedCategory === "Todos"
      ? siteConfig.demoCatalog.items
      : siteConfig.demoCatalog.items.filter(
          (item) => item.category === selectedCategory
        );

  const handleQuickQuote = (e) => {
    e.preventDefault();
    const client = leadName.trim() ? leadName.trim() : "un potencial cliente";
    const msg = `Hola MIPARCERO, soy ${client}. Probé la demo en tu web y me interesa información sobre: ${leadNeed}.`;
    window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="demos" className="border-y border-zinc-800/80 bg-zinc-950/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Portafolio & Laboratorio
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {siteConfig.demoCatalog.title}
            </h2>
            <p className="mt-3 text-zinc-400">{siteConfig.demoCatalog.subtitle}</p>
          </div>
          <span className="inline-block rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">
            {siteConfig.demoCatalog.disclaimer}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {siteConfig.demoCatalog.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-violet-600/20"
                  : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filteredDemos.map((demo) => (
            <div key={demo.id} className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-blue-400">{demo.category}</span>
                  <span className="rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300">
                    {demo.tag}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{demo.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{demo.summary}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-800/80 pt-4">
                <span className="text-xs text-zinc-400">{demo.impact}</span>
                <a
                  href={getWhatsAppUrl(`Hola MIPARCERO, me gustaría ver cómo funciona la solución demostrativa: "${demo.name}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 transition hover:text-violet-300"
                >
                  Probar flujo
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-950/30 via-zinc-900/80 to-blue-950/30 p-6 sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Demo en vivo</span>
              <h3 className="mt-1 text-xl font-bold text-white">Simulador de Captación Rápida</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Así de sencillo tus futuros clientes podrán enviarte una solicitud estructurada sin formularios largos.
              </p>
            </div>

            <form onSubmit={handleQuickQuote} className="grid gap-3 sm:grid-cols-3 lg:col-span-7">
              <input
                type="text"
                placeholder="Tu nombre o negocio"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="rounded-xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
              />
              <select
                value={leadNeed}
                onChange={(e) => setLeadNeed(e.target.value)}
                className="rounded-xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-sm text-white focus:border-violet-500 focus:outline-none"
              >
                <option value="Plataforma Web Comercial">Plataforma Web Comercial</option>
                <option value="Catálogo Digital Inteligente">Catálogo Digital Inteligente</option>
                <option value="Automatización con IA">Automatización con IA</option>
                <option value="Sistema de Gestión a Medida">Sistema de Gestión</option>
              </select>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <Send className="h-4 w-4" />
                Enviar a WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
