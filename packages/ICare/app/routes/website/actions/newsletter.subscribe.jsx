function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function action({ request }) {
  console.log("🟢 [RR Action] Newsletter submit started");

  const formData = await request.formData();

  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim(); // honeypot
  const delayMs = Math.min(Number(formData.get("_delay") || 0), 2000);

  console.log("🟢 [RR Action] Form data:", {
    email,
    company,
    delayMs
  });

  // Honeypot
  if (company) {
    console.warn("🟡 [RR Action] Honeypot triggered — NOT calling API");

    if (delayMs) { await sleep(delayMs); }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (delayMs) {
    console.log(`🟢 [RR Action] Sleeping for ${delayMs}ms`);
    await sleep(delayMs);
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("🔴 [RR Action] Invalid email:", email);

    return new Response(
      JSON.stringify({ ok: false, error: "Please enter a valid email address." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("🟢 [RR Action] Using API URL:", apiUrl);

  if (!apiUrl) {
    console.error("🔴 [RR Action] VITE_API_URL missing");

    return new Response(
      JSON.stringify({ ok: false, error: "Server misconfigured." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log("🟢 [RR Action] Sending request to Node API...");

  let resp;
  try {
    resp = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "news-page" })
    });
  } catch (err) {
    console.error("🔴 [RR Action] Network error calling API:", err);

    return new Response(
      JSON.stringify({ ok: false, error: "Cannot reach server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log("🟢 [RR Action] API responded with status:", resp.status);

  if (!resp.ok) {
    let message = "Subscription failed.";
    try {
      const data = await resp.json();
      message = data?.error || message;
    } catch {
      console.error("🔴 [RR Action] Failed to parse error JSON");
    }

    console.error("🔴 [RR Action] API error:", message);

    return new Response(
      JSON.stringify({ ok: false, error: message }),
      { status: resp.status, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log("🟢 [RR Action] Subscription success");

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
