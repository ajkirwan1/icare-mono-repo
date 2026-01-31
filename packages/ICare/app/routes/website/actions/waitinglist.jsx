import { formDataToObject, parseWithZod } from "~/utils/validation/validation";
import { WaitinglistSchema } from "~/utils/validation/schemas/waitinglist.schema";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** @param {import("react-router-dom").ActionFunctionArgs} args */
export async function action({ request }) {
  const formData = await request.formData();

  const delayMs = Math.min(Number(formData.get("_delay") || 0), 2000);
  if (delayMs) { await sleep(delayMs); }

  const raw = formDataToObject(formData);

  // Honeypot: if filled, pretend success (don’t leak)
  if (raw.company) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  // Normalize email before validation + sending
  if (typeof raw.email === "string") { raw.email = raw.email.trim().toLowerCase(); }

  const { values, response } = parseWithZod(WaitinglistSchema, raw);
  if (response) { return response; }

  // Remove non-business fields before sending
  const { _delay, company, ...payload } = values;

  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    return new Response(JSON.stringify({ ok: false, error: "Server misconfigured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  let resp;
  try {
    resp = await fetch(`${apiUrl}/api/waitinglist`, {
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

  // Try to parse JSON either way (so we can forward alreadyRegistered/message/errors)
  let data = null;
  try {
    data = await resp.json();
  } catch {
    // ignore parse errors
  }

  if (!resp.ok) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: data?.error || "Waitinglist signup failed.",
        errors: data?.errors || undefined
      }),
      {
        status: resp.status,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  // ✅ Success: forward API semantics + ensure email is present for your modal/newsletter
  return new Response(
    JSON.stringify({
      ok: true,
      email: values.email, // always available client-side
      alreadyRegistered: Boolean(data?.alreadyRegistered),
      message: data?.message
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
