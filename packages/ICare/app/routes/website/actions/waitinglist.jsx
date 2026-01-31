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

  // Honeypot: if filled, pretend success (or silently reject)
  if (raw.company) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  // Normalize email
  if (typeof raw.email === "string") { raw.email = raw.email.trim().toLowerCase(); }

  const { values, response } = parseWithZod(WaitinglistSchema, raw);
  if (response) { return response; }

  // Remove non-business fields before sending
  const { _delay, company, ...payload } = values;

  // OPTIONAL: if your API/DB wants numeric years, map enum -> number/range
  // (Only for caregivers)
  // if (payload.userType === "caregiver") {
  //   payload.yearsOfExperience = mapYearsEnum(payload.yearsOfExperience);
  // }

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

  if (!resp.ok) {
    let message = "Waitinglist signup failed.";
    try {
      const data = await resp.json();
      message = data?.error || message;
    } catch { }
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: resp.status,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
