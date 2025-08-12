// File: api/generate.js
export default async function handler(req, res) {
  // --- CORS (so Kajabi/browser can call it) ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Echo prompt (for debugging), then return valid JSON-as-text
    const body = req.headers["content-type"]?.includes("application/json")
      ? req.body
      : JSON.parse(req.body || "{}");

    const demoJSON = {
      uvp: "We help small IT firms win premium deals with a narrative-first sales experience.",
      case_study: "CASE STUDY\\nClient: Atlas Legal\\nChallenge: Price-driven RFPs...\\nIntervention: Peak–End onboarding...\\nResults: +27% fee uplift...",
      linkedin_post: "**Stop winning on price. Win on identity.**\\n\\nThree moves...\\n• Clarify a category-of-one UVP\\n• Build proof assets\\n• Design a Peak & End",
      blog_article: "## Why Generalists Lose...\\n(700–900 words would go here in a real run.)",
      email_outreach: "Subject: Quick win to avoid price wars\\n\\nHi there,..."
    };

    return res.status(200).json({ ok: true, text: JSON.stringify(demoJSON) });
  } catch (err) {
    console.error("generate error:", err);
    return res.status(500).json({ error: "Server failure" });
  }
}
