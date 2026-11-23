import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#09090b]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="flex items-center gap-3 group">
          <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] shadow-lg shadow-violet-600/20 transition-transform duration-300 group-hover:scale-105" />
          <span className="text-xl font-extrabold tracking-tight text-white">
            {siteConfig.brand.name}
            <span className="text-[#8b5cf6]">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-300 md:flex">
          <a href="#servicios" className="transition hover:text-white">Servicios</a>
          <a href="#demos" className="transition hover:text-white">Demostraciones</a>
          <a href="#proceso" className="transition hover:text-white">Proceso</a>
          <a href="#paquetes" className="transition hover:text-white">Paquetes</a>
        </nav>

        <div className="hidden md:block">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg border border-zinc-800 p-2 text-zinc-300 hover:bg-zinc-900 md:hidden"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-zinc-300">
            <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-zinc-900">Servicios</a>
            <a href="#demos" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-zinc-900">Demostraciones</a>
            <a href="#proceso" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-zinc-900">Proceso</a>
            <a href="#paquetes" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-zinc-900">Paquetes</a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
