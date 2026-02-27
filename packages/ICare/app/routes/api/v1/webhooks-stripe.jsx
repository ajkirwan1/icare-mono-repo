import { createHmac, timingSafeEqual } from "node:crypto";

const FIVE_MINUTES = 300;

function getWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET_TEST || "";
}

function parseStripeSignatureHeader(header) {
  const pairs = String(header || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const index = part.indexOf("=");
      if (index <= 0) {
        return null;
      }
      return [part.slice(0, index), part.slice(index + 1)];
    })
    .filter(Boolean);

  const timestamp = Number(pairs.find(([key]) => key === "t")?.[1] || 0);
  const signatures = pairs.filter(([key]) => key === "v1").map(([, value]) => value);

  return { timestamp, signatures };
}

function verifyStripeSignature({ payload, header, secret }) {
  const { timestamp, signatures } = parseStripeSignatureHeader(header);

  if (!timestamp || !signatures.length) {
    return { ok: false, reason: "Missing Stripe signature components." };
  }

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > FIVE_MINUTES) {
    return { ok: false, reason: "Stripe signature timestamp outside tolerance." };
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac("sha256", secret).update(signedPayload).digest("hex");

  const matches = signatures.some((signature) => {
    try {
      const left = Buffer.from(signature, "hex");
      const right = Buffer.from(expected, "hex");
      return left.length === right.length && timingSafeEqual(left, right);
    } catch {
      return false;
    }
  });

  if (!matches) {
    return { ok: false, reason: "Stripe signature mismatch." };
  }

  return { ok: true };
}

function logStripeEvent(event) {
  const type = event?.type || "unknown";
  const id = event?.id || "unknown";

  if (type === "setup_intent.succeeded") {
    console.info(`[stripe-webhook] setup_intent.succeeded id=${id}`);
    return;
  }

  if (type === "payment_intent.amount_capturable_updated") {
    console.info(`[stripe-webhook] payment authorized id=${id}`);
    return;
  }

  if (type === "payment_intent.payment_failed") {
    console.warn(`[stripe-webhook] payment failed id=${id}`);
    return;
  }

  if (type === "payment_intent.succeeded") {
    console.info(`[stripe-webhook] payment captured id=${id}`);
    return;
  }

  if (type === "charge.refunded") {
    console.info(`[stripe-webhook] charge refunded id=${id}`);
    return;
  }

  console.info(`[stripe-webhook] event received type=${type} id=${id}`);
}

export async function action({ request }) {
  const secret = getWebhookSecret();
  if (!secret) {
    return new Response(JSON.stringify({ ok: false, error: "Webhook secret not configured." }), {
      status: 503,
      headers: { "Content-Type": "application/json" }
    });
  }

  const signatureHeader = request.headers.get("stripe-signature") || "";
  const rawBody = await request.text();

  const verification = verifyStripeSignature({
    payload: rawBody,
    header: signatureHeader,
    secret
  });

  if (!verification.ok) {
    return new Response(JSON.stringify({ ok: false, error: verification.reason }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON payload." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  logStripeEvent(event);

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
