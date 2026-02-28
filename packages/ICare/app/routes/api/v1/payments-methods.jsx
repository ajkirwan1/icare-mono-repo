import { ensureStripeCustomer, isStripeConfigured, listStripePaymentMethods } from "~/lib/stripe-payments.server";

export async function loader({ request }) {
  if (!isStripeConfigured()) {
    return {
      ok: false,
      count: 0,
      paymentMethods: [],
      error: "Stripe is not configured"
    };
  }

  try {
    const { customerId, setCookie } = await ensureStripeCustomer(request);
    const paymentMethods = await listStripePaymentMethods(customerId);

    const payload = {
      ok: true,
      count: paymentMethods.length,
      paymentMethods,
      methods: paymentMethods
    };

    if (!setCookie) {
      return payload;
    }

    return new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": setCookie
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        count: 0,
        paymentMethods: [],
        methods: [],
        error: error?.message || "Failed to load payment methods"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
