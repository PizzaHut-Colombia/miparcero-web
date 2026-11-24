export const demoStoreInfo = {
  businessName: "Burger & Grill Lab",
  tagline: "Ejemplo real: Restaurante & Comida Rápida con Pedidos Sin Comisiones",
  deliveryFee: 5000,
};

export const demoProducts = [
  {
    id: "p1",
    name: "Combo Doble Smash Clásica",
    category: "Combos",
    price: 28900,
    tag: "Más vendido",
    desc: "Doble carne artesanal 150g, queso cheddar fundido, papas rústicas y bebida.",
  },
  {
    id: "p2",
    name: "Costillas BBQ Ahumadas (400g)",
    category: "Platos Fuertes",
    price: 42000,
    tag: "Recomendado",
    desc: "Cocción lenta por 6 horas en salsa BBQ de la casa con mazorca dulce.",
  },
  {
    id: "p3",
    name: "Picada Familiar 4 Personas",
    category: "Para Compartir",
    price: 68000,
    tag: "Ideal grupos",
    desc: "Chicharrón crocante, chorizo artesanal, pechuga, papa criolla y guacamole.",
  },
  {
    id: "p4",
    name: "Limonada de Coco Natural",
    category: "Bebidas",
    price: 9500,
    tag: "Fresco",
    desc: "Preparada al momento con crema de coco natural y hielo frappé.",
  },
  {
    id: "p5",
    name: "Burger Pollo Crispy Miel Mostaza",
    category: "Combos",
    price: 25900,
    tag: null,
    desc: "Pechuga apanada extra crocante, ensalada coleslaw y papas a la francesa.",
  },
  {
    id: "p6",
    name: "Malteada de Brownie & Arequipe",
    category: "Bebidas",
    price: 13500,
    tag: null,
    desc: "Helado artesanal de vainilla mezclado con trozos de brownie tibio.",
  },
];

export function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}
