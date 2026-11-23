import {
  Globe,
  ShoppingBag,
  Workflow,
  LayoutDashboard,
  Bot,
  Blocks,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";
import Navbar from "../components/Navbar";
import DemoSection from "../components/DemoSection";
import PackagesAndContact from "../components/PackagesAndContact";

const iconMap = {
  Globe,
  ShoppingBag,
  Workflow,
  LayoutDashboard,
  Bot,
  Blocks,
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-violet-600 selection:text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.16),_rgba(59,130,246,0.08),_transparent_70%)]" />

      <Navbar />

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              {siteConfig.brand.badge}
            </div>

            <h1 className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              {siteConfig.hero.title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {siteConfig.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/25 transition hover:brightness-110 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                {siteConfig.hero.primaryCta}
              </a>

              <a
                href="#demos"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-900 sm:w-auto"
              >
                {siteConfig.hero.secondaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
              Capacidades
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Soluciones diseñadas para vender y optimizar
            </h2>
            <p className="mt-3 text-zinc-400">
              Arquitectura modular adaptable a las necesidades reales de tu negocio.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((service) => {
              const IconComponent = iconMap[service.icon] || Globe;
              return (
                <div
                  key={service.id}
                  className="group rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-zinc-900/80"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-600 group-hover:text-white">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <DemoSection />
        <PackagesAndContact />
      </main>
    </div>
  );
}
