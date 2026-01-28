/** FormData -> plain object (keeps strings, ignores File unless you want them) */
export function formDataToObject(formData) {
  const obj = {};
  for (const [k, v] of formData.entries()) {
    // If you expect multiple inputs with same name, upgrade this to arrays.
    obj[k] = v instanceof File ? v : String(v);
  }
  return obj;
}

/** Standardized { ok:false, errors } response for React Router actions */
export function badRequest(errors) {
  return new Response(JSON.stringify({ ok: false, errors }), {
    status: 400,
    headers: { "Content-Type": "application/json" }
  });
}

/** Parse + validate with a Zod schema and return { values } or a Response */
export function parseWithZod(schema, raw) {
  const result = schema.safeParse(raw);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { response: badRequest(errors) };
  }
  return { values: result.data };
}
