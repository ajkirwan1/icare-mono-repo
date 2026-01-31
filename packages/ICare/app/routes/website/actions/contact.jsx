const API = import.meta.env.VITE_API_URL;

import { ContactSchema } from "~/utils/validation/schemas/contact.schema";
import { formDataToObject, parseWithZod } from "~/utils/validation/validation";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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

  if (!API) {
    return new Response(JSON.stringify({ ok: false, error: "Server misconfigured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Remove non-business fields
  const { company, _delay, ...payload } = values;

  let resp;
  try {
    resp = await fetch(`${API}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch {
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
