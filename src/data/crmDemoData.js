export const initialCrmLeads = [
  {
    id: 1,
    name: "Clínica Odontológica Sonrisa",
    contact: "Dra. Carolina Méndez",
    phone: "573001112233",
    service: "Catálogo + Agendamiento IA",
    value: 1850000,
    status: "Cotizado",
    note: "Pidió propuesta con recordatorios por WhatsApp",
  },
  {
    id: 2,
    name: "Ferretería & Depósito El Constructor",
    contact: "Carlos Ramírez",
    phone: "573114445566",
    service: "Catálogo Digital de Inventario",
    value: 1400000,
    status: "Nuevo",
    note: "Interesado en mostrar 300 referencias sin comisiones",
  },
  {
    id: 3,
    name: "Inmobiliaria del Alto Magdalena",
    contact: "Sofía Torres",
    phone: "573207778899",
    service: "Ecosistema Web + Agente IA",
    value: 3200000,
    status: "Cerrado",
    note: "Anticipo recibido • En fase de despliegue",
  },
  {
    id: 4,
    name: "Restaurante Mirador del Río",
    contact: "Andrés Gómez",
    phone: "573158889900",
    service: "Menú Digital Express",
    value: 950000,
    status: "Cotizado",
    note: "Revisando opciones de domicilio por zonas",
  },
];

export function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}
