export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { message, history = [] } = req.body;

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-5-5",
        max_tokens: 300,
        system: "Tum Zara ho, ek pyaari Hinglish personal assistant. Chhote, meethe jawab do.",
        messages: [...history, { role: "user", content: message }]
      })
    });

    const data = await r.json();
    res.status(200).json({
      reply: data.content?.[0]?.text || "Arre, kuch gadbad ho gayi 🥺"
    });
  } catch (e) {
    res.status(500).json({ reply: "Arre, kuch gadbad ho gayi 🥺" });
  }
}
