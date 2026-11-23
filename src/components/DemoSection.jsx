import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";
import SolutionConfigurator from "./SolutionConfigurator";

export default function DemoSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredDemos =
    selectedCategory === "Todos"
      ? siteConfig.demoCatalog.items
      : siteConfig.demoCatalog.items.filter(
          (item) => item.category === selectedCategory
        );

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

               {demo.id === "demo-1" || demo.id === "demo-3" ? (
  <Link
    to={demo.id === "demo-1" ? "/demo/catalogo" : "/demo/crm"}
    className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 transition hover:text-violet-300"
  >
    Probar demo en vivo
    <ArrowRight className="h-3.5 w-3.5" />
  </Link>
) : (
  <a
    href={getWhatsAppUrl(`Hola MIPARCERO, me gustaría ver cómo funciona la solución demostrativa: "${demo.name}".`)}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 transition hover:text-violet-300"
  >
    Probar flujo
    <ArrowRight className="h-3.5 w-3.5" />
  </a>
)}

              </div>
            </div>
          ))}
        </div>

        <SolutionConfigurator />
      </div>
    </section>
  );
}
