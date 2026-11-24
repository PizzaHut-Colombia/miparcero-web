import { useState } from "react";
import { UserPlus, DollarSign, TrendingUp, CheckCircle2 } from "lucide-react";
import { formatCOP } from "../data/crmDemoData";

export default function CrmLeadFormAndStats({ leads, onAddLead }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service] = useState("Plataforma Web Comercial");
  const [value, setValue] = useState("1500000");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddLead({
      id: Date.now(),
      name: name.trim(),
      contact: "Contacto Directo",
      phone: phone.replace(/\D/g, "") || "573212227999",
      service,
      value: Number(value) || 0,
      status: "Nuevo",
      note: note.trim() || "Prospecto registrado desde tablero",
    });
    setName("");
    setPhone("");
    setNote("");
  };

  const pipelineTotal = leads
    .filter((l) => l.status !== "Cerrado")
    .reduce((sum, l) => sum + l.value, 0);
  const closedTotal = leads
    .filter((l) => l.status === "Cerrado")
    .reduce((sum, l) => sum + l.value, 0);

  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <span className="flex items-center gap-1.5 text-xs text-zinc-400">
            <TrendingUp className="h-4 w-4 text-blue-400" /> En negociación activa
          </span>
          <p className="mt-2 text-2xl font-extrabold text-white">{formatCOP(pipelineTotal)}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <span className="flex items-center gap-1.5 text-xs text-zinc-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Ventas cerradas
          </span>
          <p className="mt-2 text-2xl font-extrabold text-emerald-400">{formatCOP(closedTotal)}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <span className="flex items-center gap-1.5 text-xs text-zinc-400">
            <DollarSign className="h-4 w-4 text-violet-400" /> Ticket promedio
          </span>
          <p className="mt-2 text-2xl font-extrabold text-white">
            {leads.length > 0 ? formatCOP((pipelineTotal + closedTotal) / leads.length) : "$0"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:grid-cols-5">
        <input
          type="text"
          placeholder="Empresa o cliente *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="WhatsApp (573...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
        />
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-2.5 text-xs font-semibold text-zinc-500">
            $ COP
          </span>
          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 py-2.5 pl-14 pr-3 text-xs text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
          />
        </div>
        <input
          type="text"
          placeholder="Nota rápida"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-110"
        >
          <UserPlus className="h-4 w-4" /> Registrar
        </button>
      </form>
    </>
  );
}
