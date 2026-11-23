import { useState } from "react";
import { Send, Check, Sparkles, Clock, Layers } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";

export default function SolutionConfigurator() {
  const [clientName, setClientName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [selectedIds, setSelectedIds] = useState(["mod-web"]);

  const toggleModule = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeModules = siteConfig.configurator.modules.filter((m) =>
    selectedIds.includes(m.id)
  );

  const maxTier = activeModules.reduce((max, m) => Math.max(max, m.tier), 0);
  const totalDays = activeModules.reduce((sum, m) => sum + m.days, 0);

  const recommendedPlan =
    maxTier === 0
      ? "Selecciona un módulo"
      : maxTier === 1
      ? "Esencial Digital"
      : maxTier === 2
      ? "Comercial Inteligente"
      : "Ecosistema a Medida";

  const handleSendConfig = (e) => {
    e.preventDefault();
    if (activeModules.length === 0) return;

    const who = clientName.trim() || "un interesado";
    const biz = businessType.trim() ? ` (${businessType.trim()})` : "";
    const moduleList = activeModules.map((m) => `• ${m.label}`).join("\n");

    const msg = `Hola MIPARCERO, soy ${who}${biz}.\n\nConfiguré esta solución:\n${moduleList}\n\nPlan sugerido: ${recommendedPlan}\nTiempo estimado: ~${totalDays} días hábiles.`;
    window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-12 rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/25 via-zinc-900/90 to-blue-950/25 p-6 sm:p-8">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
          <Sparkles className="h-3.5 w-3.5" />
          Herramienta Interactiva
        </span>
        <h3 className="mt-1 text-2xl font-bold text-white">
          {siteConfig.configurator.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          {siteConfig.configurator.subtitle}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-7">
          {siteConfig.configurator.modules.map((mod) => {
            const isSelected = selectedIds.includes(mod.id);
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => toggleModule(mod.id)}
                className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                }`}
              >
                <div>
                  <span className="block text-sm font-semibold text-white">{mod.label}</span>
                  <span className="mt-0.5 block text-xs text-zinc-400">{mod.desc}</span>
                </div>
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition ${
                    isSelected
                      ? "border-violet-500 bg-violet-600 text-white"
                      : "border-zinc-700 bg-zinc-900 text-transparent"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
        </div>

        <form
          onSubmit={handleSendConfig}
          className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 lg:col-span-5"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Diagnóstico en tiempo real
            </span>

            <div className="mt-4 space-y-3 border-b border-zinc-800 pb-5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-zinc-400">
                  <Layers className="h-4 w-4 text-violet-400" />
                  Plan sugerido:
                </span>
                <span className="font-bold text-white">{recommendedPlan}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-zinc-400">
                  <Clock className="h-4 w-4 text-blue-400" />
                  Tiempo estimado:
                </span>
                <span className="font-semibold text-zinc-200">
                  {totalDays > 0 ? `~${totalDays} días hábiles` : "—"}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="Tu nombre"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Tipo de negocio (ej. Clínica, Tienda)"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={activeModules.length === 0}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
            Enviar configuración a WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
