import { ContactSchema } from "~/utils/validation/schemas/contact.schema";
import { formDataToObject, parseWithZod } from "~/utils/validation/validation";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalizeApiBase(base) {
  if (!base) { return null; }
  const trimmed = String(base).trim().replace(/\/$/, "");
  return trimmed || null;
}

function buildContactApiUrl(base, request) {
  const origin = new URL(request.url).origin;

  // Absolute URL
  if (/^https?:\/\//i.test(base)) {
    const apiPrefix = base.endsWith("/api") ? base : `${base}/api`;
    return `${apiPrefix}/contact`;
  }

  // Relative URL prefix (e.g. "/api")
  if (base.startsWith("/")) {
    const apiPrefix = base.endsWith("/api") ? base : `${base}/api`;
    return `${origin}${apiPrefix}/contact`;
  }

  // Host without protocol fallback (rare)
  const withProtocol = `http://${base}`;
  const apiPrefix = withProtocol.endsWith("/api") ? withProtocol : `${withProtocol}/api`;
  return `${apiPrefix}/contact`;
}

/** @param {import("react-router-dom").ActionFunctionArgs} args */
export async function action({ request }) {
  const formData = await request.formData();

  // optional delay (helpful for seeing loading state)
  const delayMs = Math.min(Number(formData.get("_delay") || 0), 2000);
  if (delayMs) { await sleep(delayMs); }

  const raw = formDataToObject(formData);

  // honeypot
  if (raw.company) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  // normalize email
  if (typeof raw.email === "string") { raw.email = raw.email.trim().toLowerCase(); }

  const { values, response } = parseWithZod(ContactSchema, raw);
  if (response) { return response; }

  // Remove non-business fields
  const { company, _delay, ...payload } = values;

  const apiBases = [
    normalizeApiBase(globalThis.process?.env?.API_INTERNAL_URL),
    normalizeApiBase(import.meta.env.VITE_API_URL),
    normalizeApiBase(new URL(request.url).origin)
  ].filter(Boolean);

  if (!apiBases.length) {
    return new Response(JSON.stringify({ ok: false, error: "Server misconfigured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  let resp = null;
  for (const base of [...new Set(apiBases)]) {
    const apiUrl = buildContactApiUrl(base, request);
    try {
      resp = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      break;
    } catch {
      // try next candidate
    }
  }

  if (!resp) {
    return new Response(JSON.stringify({ ok: false, error: "Cannot reach server." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const data = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: data?.error || "Message could not be sent. Please try again."
      }),
      { status: resp.status, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
