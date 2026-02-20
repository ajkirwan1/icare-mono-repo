export async function action({ request }) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ ok: false, error: "Please enter a valid email address." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Server-side: use API_INTERNAL_URL (Docker internal), fallback to VITE_API_URL (local dev)
  const apiBase = globalThis.process?.env?.API_INTERNAL_URL || import.meta.env.VITE_API_URL;
  if (!apiBase) {
    return new Response(
      JSON.stringify({ ok: false, error: "Server misconfigured." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let resp;
  try {
    resp = await fetch(`${apiBase}/api/newsletter/resend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Cannot reach server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!resp.ok) {
    let message = "Resend failed.";
    try {
      const data = await resp.json();
      message = data?.error || message;
    } catch { /* ignore */ }

    return new Response(
      JSON.stringify({ ok: false, error: message }),
      { status: resp.status, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
