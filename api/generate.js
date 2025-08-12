import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt required" });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    res.status(200).json({ text: completion.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
