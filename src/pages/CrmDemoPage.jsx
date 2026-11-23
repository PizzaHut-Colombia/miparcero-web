import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, UserPlus, Users, CheckCircle2, Clock, Trash2, MessageCircle } from "lucide-react";

const initialLeads = [
  { id: 1, name: "Clínica Dental Sonrisa", phone: "573001112233", service: "Catálogo + Citas WhatsApp", status: "Cotizado" },
  { id: 2, name: "Ferretería El Constructor", phone: "573114445566", service: "Plataforma Web Comercial", status: "Nuevo" },
  { id: 3, name: "Inmobiliaria del Río", phone: "573207778899", service: "Agente IA de Atención", status: "Cerrado" },
];

export default function CrmDemoPage() {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem("miparcero_demo_crm");
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Plataforma Web Comercial");
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    localStorage.setItem("miparcero_demo_crm", JSON.stringify(leads));
  }, [leads]);

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newLead = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.replace(/\D/g, "") || "573212227999",
      service,
      status: "Nuevo",
    };
    setLeads([newLead, ...leads]);
    setName("");
    setPhone("");
  };

  const updateStatus = (id, newStatus) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  const deleteLead = (id) => {
    setLeads(leads.filter((l) => l.id !== id));
  };

  const filteredLeads = filter === "Todos" ? leads : leads.filter((l) => l.status === filter);
  const slash = String.fromCharCode(47);

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-12 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300">
          <ArrowLeft className="h-4 w-4" /> Volver a MIPARCERO.
        </Link>

        <div className="mt-6 border-b border-zinc-800 pb-6">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
            Ruta Real: /demo/crm
          </span>
          <h1 className="mt-2 text-3xl font-bold text-white">Demo: Mini-CRM de Control Comercial</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Registra prospectos, cambia su estado de venta y haz seguimiento rápido por WhatsApp.
          </p>
        </div>

        {/* Métricas rápidas */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400"><Users className="h-3.5 w-3.5 text-blue-400" /> Total</span>
            <p className="mt-1 text-2xl font-bold text-white">{leads.length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400"><Clock className="h-3.5 w-3.5 text-amber-400" /> En proceso</span>
            <p className="mt-1 text-2xl font-bold text-white">{leads.filter((l) => l.status !== "Cerrado").length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Cerrados</span>
            <p className="mt-1 text-2xl font-bold text-white">{leads.filter((l) => l.status === "Cerrado").length}</p>
          </div>
        </div>

        {/* Formulario agregar prospecto */}
        <form onSubmit={handleAddLead} className="mt-6 grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:grid-cols-4">
          <input
            type="text"
            placeholder="Nombre cliente o empresa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="WhatsApp (ej. 57300...)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
          />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none"
          >
            <option value="Plataforma Web Comercial">Plataforma Web Comercial</option>
            <option value="Catálogo Digital">Catálogo Digital</option>
            <option value="Automatización con IA">Automatización con IA</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <UserPlus className="h-4 w-4" /> Agregar
          </button>
        </form>

        {/* Filtros y lista */}
        <div className="mt-6 flex gap-2">
          {["Todos", "Nuevo", "Cotizado", "Cerrado"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === st ? "bg-violet-600 text-white" : "border border-zinc-800 bg-zinc-900 text-zinc-400"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-semibold text-white">{lead.name}</h3>
                <p className="text-xs text-zinc-400">{lead.service} • +{lead.phone}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none"
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Cotizado">Cotizado</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
                <a
                  href={"https:" + slash + slash + "wa.me" + slash + lead.phone + "?text=" + encodeURIComponent(`Hola ${lead.name}, te saludamos de MIPARCERO respecto a tu solicitud de ${lead.service}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-500/15 p-2 text-emerald-400 transition hover:bg-emerald-500/25"
                  title="Escribir por WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <button onClick={() => deleteLead(lead.id)} className="rounded-lg p-2 text-zinc-500 hover:text-red-400" title="Eliminar">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
