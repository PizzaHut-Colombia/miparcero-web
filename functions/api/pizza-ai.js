export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();
    const apiKey = context.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply: "Falta configurar GEMINI_API_KEY en Cloudflare Pages.",
          orderSummary: null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Eres NapoliBot, el asistente virtual de ventas con IA de "Napoli Woodfire Pizza" en Colombia.
Atiende clientes con amabilidad, precisión y naturalidad.
CARTA OFICIAL (Precios en COP):
- Pepperoni Crunch: Mediana $32.000 | Familiar $46.000
- Hawaiana Caramelizada: Mediana $30.000 | Familiar $44.000
- Carnes Maduradas & Tocineta: Mediana $36.000 | Familiar $52.000
- 4 Quesos & Albahaca: Mediana $33.000 | Familiar $47.000
- Mitad y mitad: se cobra el valor de la especialidad mayor.
- Bebidas: Gaseosa 1.5L ($7.000), Limonada de Coco ($9.500).
- Promo del día: 2 Pizzas Medianas + Gaseosa 1.5L por $58.000.
- Domicilio urbano: $4.000 (Gratis en compras mayores a $60.000). Horario: 12:00 m. a 11:00 p.m.

REGLAS:
1. Responde natural, claro y persuasivo (máximo 4 líneas).
2. Calcula precios exactos según la carta.
3. Responde SIEMPRE en JSON puro con esta estructura:
{"reply": "tu respuesta aquí", "orderSummary": "resumen corto del pedido y total en COP si el cliente ya pidió algo, o null si aún no pide"}`;

    const firstUserIdx = messages.findIndex((m) => m.sender === "user");
    const validHistory = firstUserIdx >= 0 ? messages.slice(firstUserIdx) : messages;

    const contents = validHistory.map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const slash = String.fromCharCode(47);
    const geminiUrl =
      "https:" +
      slash +
      slash +
      "generativelanguage.googleapis.com" +
      slash +
      "v1beta" +
      slash +
      "models" +
      slash +
      "gemini-3.8-flash:generateContent";

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          temperature: 0.5,
          responseMimeType: "application/json",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          reply: "Error Gemini (" + response.status + "): " + (data?.error?.message || "Revisa tu API Key"),
          orderSummary: null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const candidates = data.candidates || [];
    const firstCandidate = candidates[0] || {};
    const parts = firstCandidate.content?.parts || [];
    const rawText = parts[0]?.text || "{}";
    const parsed = JSON.parse(rawText);

    return new Response(JSON.stringify(parsed), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        reply: "Detalle técnico: " + error.message,
        orderSummary: null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
