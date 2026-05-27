// Vercel serverless function: POST /api/subscribe
// Forwards an email to Loops's contacts API. The API key never leaves the
// server — it lives in the LOOPS_API_KEY environment variable.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Vercel parses JSON bodies automatically; also accept form-encoded for
  // graceful no-JS fallback.
  let email = "";
  if (req.body && typeof req.body === "object") {
    email = (req.body.email || "").toString().trim();
  } else if (typeof req.body === "string") {
    const params = new URLSearchParams(req.body);
    email = (params.get("email") || "").trim();
  }

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email." });
  }

  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    console.error("LOOPS_API_KEY is not configured");
    return res.status(500).json({ error: "Server not configured." });
  }

  try {
    const r = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "resident.computer",
        userGroup: "Prelaunch",
        subscribed: true,
      }),
    });

    const data = await r.json().catch(() => ({}));

    if (r.ok && data && data.success !== false) {
      return res.status(200).json({ ok: true });
    }

    // Loops returns success:false with an explanatory message for things like
    // "Email already on contact list."
    const msg = (data && data.message) || "";
    if (/already/i.test(msg)) {
      return res.status(200).json({ ok: true, alreadySubscribed: true });
    }

    return res
      .status(r.ok ? 400 : r.status)
      .json({ error: msg || "Could not subscribe. Try again." });
  } catch (err) {
    console.error("Loops request failed:", err);
    return res.status(502).json({ error: "Could not reach the server." });
  }
};
