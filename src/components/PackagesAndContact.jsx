import { MessageCircle, CheckCircle2 } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";

export default function PackagesAndContact() {
  return (
    <>
      {/* D. PROCESO DE TRABAJO */}
      <section id="proceso" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Metodología
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            De la idea a una solución operando
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {siteConfig.process.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-3xl font-extrabold text-transparent">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* E. PAQUETES COMERCIALES */}
      <section
        id="paquetes"
        className="border-t border-zinc-800/80 bg-zinc-950/50 py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Planes Escalables
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Soluciones adaptadas a tu etapa actual
            </h2>
            <p className="mt-3 text-zinc-400">
              Comienza con una base sólida y escala hacia automatizaciones o inteligencia artificial cuando tu negocio lo requiera.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {siteConfig.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl border p-7 transition ${
                  pkg.highlighted
                    ? "border-violet-500/60 bg-gradient-to-b from-violet-950/25 to-zinc-900/90 shadow-xl shadow-violet-600/10"
                    : "border-zinc-800 bg-zinc-900/50"
                }`}
              >
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      pkg.highlighted
                        ? "bg-violet-500/20 text-violet-300"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {pkg.badge}
                  </span>

                  <h3 className="mt-4 text-2xl font-bold text-white">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    {pkg.description}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-zinc-800/80 pt-6">
                    {pkg.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-zinc-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={getWhatsAppUrl(
                    `Hola MIPARCERO, me interesa recibir más información y cotización sobre el paquete "${pkg.name}".`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    pkg.highlighted
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-600/20 hover:brightness-110"
                      : "border border-zinc-700 bg-zinc-800/80 text-white hover:bg-zinc-800"
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  {pkg.ctaText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. CIERRE DE CONTACTO */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-violet-950/30 p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Listo para digitalizar o automatizar tu negocio?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Conversemos directamente por WhatsApp sin compromisos. Analizamos tu idea y definimos la solución más práctica para ti.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/25 transition hover:brightness-110"
            >
              <MessageCircle className="h-5 w-5" />
              Iniciar conversación en WhatsApp
            </a>
          </div>
          <p className="mt-5 text-xs text-zinc-500">
            {siteConfig.contact.location} • WhatsApp: +{siteConfig.contact.whatsappNumber}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/80 py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.name}. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </>
  );
}
