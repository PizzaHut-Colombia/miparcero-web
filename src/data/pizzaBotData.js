export const pizzaShopInfo = {
  botName: "NapoliBot IA",
  shopName: "Napoli Woodfire Pizza",
  subtitle: "Asistente virtual 24/7 para pedidos, carta y domicilios",
};

export const quickPrompts = [
  "Ver menú y precios",
  "Promoción del día",
  "Quiero pedir 1 Pizza Familiar",
  "¿Cuánto vale el domicilio y horarios?",
];

export function generateBotReply(userText) {
  const text = userText.toLowerCase();

  if (text.includes("menu") || text.includes("menú") || text.includes("precio") || text.includes("sabor")) {
    return {
      reply:
        "🍕 Nuestra carta artesanal en horno de leña:\n\n• Pepperoni Crunch (Mediana $32.000 / Familiar $46.000)\n• Hawaiana Caramelizada (Mediana $30.000 / Familiar $44.000)\n• Carnes Maduradas & Tocineta (Mediana $36.000 / Familiar $52.000)\n• 4 Quesos & Albahaca (Mediana $33.000 / Familiar $47.000)\n\n¿Cuál tamaño y sabor te gustaría pedir hoy?",
      suggestedOrder: "1 Pizza Familiar Mitad Pepperoni / Mitad Carnes ($49.000)",
    };
  }

  if (text.includes("promo") || text.includes("oferta") || text.includes("combo")) {
    return {
      reply:
        "🔥 ¡Promo Activa de Hoy!\n\n2 Pizzas Medianas (hasta 2 sabores cada una) + Gaseosa 1.5L por **$58.000 COP**.\n\nAhorras $12.000. ¿Te la reservo para domicilio o recoger?",
      suggestedOrder: "Combo Promo: 2 Pizzas Medianas + Gaseosa 1.5L ($58.000)",
    };
  }

  if (text.includes("domicilio") || text.includes("horario") || text.includes("ubicacion") || text.includes("hora")) {
    return {
      reply:
        "🛵 Domicilios y Horarios:\n\n• Horario: Lunes a Domingo de 12:00 m. a 11:00 p.m.\n• Tiempo estimado de entrega: 30 a 40 min.\n• Costo domicilio urbano: **$4.000 COP** (Gratis en pedidos mayores a $60.000).\n\n¿Deseas hacer tu pedido ahora?",
      suggestedOrder: null,
    };
  }

  if (text.includes("pedir") || text.includes("quiero") || text.includes("familiar") || text.includes("mediana") || text.includes("pepperoni") || text.includes("hawaiana")) {
    return {
      reply:
        "✅ ¡Excelente elección! Ya pre-armé tu orden en el sistema:\n\n• 1x Pizza Familiar Artesanal ($48.000)\n• Incluye borde de queso cortesía de hoy\n\nHaz clic en el botón verde de abajo para confirmar dirección y enviarla directo a cocina por WhatsApp.",
      suggestedOrder: "1x Pizza Familiar Artesanal + Borde de queso ($48.000)",
    };
  }

  return {
    reply:
      "¡Hola! Soy el asistente IA de Napoli Pizza 🍕. Puedo mostrarte nuestra carta, darte la promoción de hoy, informarte costos de domicilio o tomar tu pedido al instante. ¿Qué deseas consultar?",
    suggestedOrder: null,
  };
}
