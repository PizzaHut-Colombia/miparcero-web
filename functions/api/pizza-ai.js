export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();
    const apiKey = context.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply: "Falta configurar GEMINI_API_KEY en el entorno para activar el motor de IA en vivo.",
          orderSummary: null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Eres NapoliBot, el asistente virtual de ventas con IA de "Napoli Woodfire Pizza" en Colombia.
Tu objetivo es atender clientes con amabilidad, precisión y rapidez, ayudarles a elegir pizzas y cerrar pedidos.
CARTA OFICIAL (Precios en COP):
- Pepperoni Crunch: Mediana $32.000 | Familiar $46.000
- Hawaiana Caramelizada: Mediana $30.000 | Familiar $44.000
- Carnes Maduradas & Tocineta: Mediana $36.000 | Familiar $52.000
- 4 Quesos & Albahaca: Mediana $33.000 | Familiar $47.000
- Pizzas mitad y mitad: se cobra el promedio o el valor de la especialidad mayor.
- Bebidas: Gaseosa 1.5L ($7.000), Limonada de Coco ($9.500).
- Promo del día: 2 Pizzas Medianas + Gaseosa 1.5L por $58.000.
- Domicilio urbano: $4.000 (Gratis por compras superiores a $60.000). Horario: 12:00 m. a 11:00 p.m.

REGLAS ESTRICTAS:
1. Responde de forma natural, corta y persuasiva (máximo 4 líneas).
2. Calcula los precios exactamente según la carta.
3. Si el cliente ya mencionó qué productos quiere pedir, devuelve JSON puro con esta estructura exacta:
{"reply": "tu respuesta amable aquí", "orderSummary": "resumen corto del pedido y total en COP"}
Si aún no ha elegido productos concretos, deja "orderSummary": null.`;

    const contents = messages.map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await fetch(
      `https://googleapis.com{apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(rawText);

    return new Response(JSON.stringify(parsed), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        reply: "Tuve un breve retraso procesando tu mensaje. ¿Me repites qué sabor o tamaño de pizza deseas?",
        orderSummary: null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
