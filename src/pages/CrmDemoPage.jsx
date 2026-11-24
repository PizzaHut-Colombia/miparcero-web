import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, MessageCircle, Download, Search } from "lucide-react";
import { initialCrmLeads, formatCOP } from "../data/crmDemoData";
import CrmLeadFormAndStats from "../components/CrmLeadFormAndStats";

export default function CrmDemoPage() {
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem("miparcero_crm_pro_v1");
      return saved ? JSON.parse(saved) : initialCrmLeads;
    } catch {
      return initialCrmLeads;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    localStorage.setItem("miparcero_crm_pro_v1", JSON.stringify(leads));
  }, [leads]);

  const addLead = (newLead) => setLeads([newLead, ...leads]);
  const updateStatus = (id, status) =>
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
  const deleteLead = (id) => setLeads(leads.filter((l) => l.id !== id));

  const exportToCSV = () => {
    const headers = ["Empresa,Servicio,Valor_COP,Estado,Telefono,Nota"];
    const rows = leads.map(
      (l) => `"${l.name}","${l.service}",${l.value},"${l.status}","${l.phone}","${l.note}"`
    );
    const blob = new Blob([headers.concat(rows).join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte-ventas-miparcero.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = filter === "Todos" || l.status === filter;
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.service.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const slash = String.fromCharCode(47);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <div className="border-b border-violet-500/20 bg-violet-950/20 px-4 py-2.5 text-center text-xs text-violet-200">
        Demostración funcional de <strong>MIPARCERO.</strong> — Controla cotizaciones, ventas cerradas y seguimiento en un solo panel.
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Volver a MIPARCERO.
            </Link>
            <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Pipeline Comercial & Mini-CRM</h1>
            <p className="text-xs text-zinc-400 sm:text-sm">Gestión de oportunidades reales con exportación a Excel (CSV).</p>
          </div>

          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:border-violet-500"
          >
            <Download className="h-4 w-4 text-violet-400" /> Exportar Excel (.CSV)
          </button>
        </div>

        <CrmLeadFormAndStats leads={leads} onAddLead={addLead} />

        <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
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
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar prospecto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-bold text-white">{lead.name}</h3>
                  <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                    {formatCOP(lead.value)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">{lead.service} • {lead.note}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold focus:outline-none ${
                    lead.status === "Cerrado"
                      ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                      : lead.status === "Cotizado"
                      ? "border-violet-500/40 bg-violet-500/15 text-violet-300"
                      : "border-amber-500/40 bg-amber-500/15 text-amber-300"
                  }`}
                >
                  <option value="Nuevo" className="bg-zinc-950 text-amber-300">Nuevo</option>
                  <option value="Cotizado" className="bg-zinc-950 text-violet-300">Cotizado</option>
                  <option value="Cerrado" className="bg-zinc-950 text-emerald-300">Cerrado</option>
                </select>
                <a
                  href={"https:" + slash + slash + "wa.me" + slash + lead.phone + "?text=" + encodeURIComponent(`Hola ${lead.name}, te saludamos de MIPARCERO respecto a ${lead.service}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-500/15 p-2 text-emerald-400 transition hover:bg-emerald-500/25"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <button onClick={() => deleteLead(lead.id)} className="rounded-lg p-2 text-zinc-500 hover:text-red-400">
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
