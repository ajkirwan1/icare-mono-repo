import { useMemo, useState } from "react";
import styles from "./caregiver-stripe-payments.module.scss";

const DEFAULT_API = "http://localhost:4001";

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || "Request failed");
  }
  return data;
}

export default function CaregiverStripePayments() {
  const apiBase = useMemo(() => (import.meta.env.VITE_API_URL || DEFAULT_API), []);
  const [email, setEmail] = useState("care.receiver@example.com");
  const [subscriptionPriceId, setSubscriptionPriceId] = useState("");
  const [connectedAccountId, setConnectedAccountId] = useState("");
  const [payoutAmountPence, setPayoutAmountPence] = useState("1000");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const start = async (label, fn) => {
    setBusy(label);
    setError("");
    setMessage("");
    try {
      await fn();
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setBusy("");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Stripe Payments</h1>
        <p className={styles.subtitle}>
          Use this page to test Checkout, Subscriptions, and Connect payouts with a 15% platform fee.
        </p>

        <section className={styles.card}>
          <h2>Shared Inputs</h2>
          <label className={styles.field}>
            <span>Customer email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <p className={styles.note}>API base: {apiBase}</p>
          <label className={styles.field}>
            <span>Connected account ID (optional for fee-split checkout/subscriptions)</span>
            <input
              placeholder="acct_..."
              value={connectedAccountId}
              onChange={(e) => setConnectedAccountId(e.target.value)}
            />
          </label>
        </section>

        <section className={styles.card}>
          <h2>Checkout (One-time)</h2>
          <button
            type="button"
            className={styles.actionButton}
            disabled={Boolean(busy)}
            onClick={() =>
              start("checkout", async () => {
                const data = await postJson(`${apiBase}/api/stripe/checkout-session`, {
                  amount: 5000,
                  currency: "gbp",
                  customerEmail: email,
                  connectedAccountId: connectedAccountId.trim() || undefined,
                  metadata: { flow: "one_time_checkout" }
                });

                if (data.url) { window.location.href = data.url; }
              })
            }
          >
            {busy === "checkout" ? "Starting..." : "Start GBP 50 Checkout"}
          </button>
        </section>

        <section className={styles.card}>
          <h2>Subscription</h2>
          <label className={styles.field}>
            <span>Stripe Price ID</span>
            <input
              placeholder="price_..."
              value={subscriptionPriceId}
              onChange={(e) => setSubscriptionPriceId(e.target.value)}
            />
          </label>
          <button
            type="button"
            className={styles.actionButton}
            disabled={Boolean(busy)}
            onClick={() =>
              start("subscription", async () => {
                if (!subscriptionPriceId.trim()) {
                  throw new Error("Enter a Stripe subscription price ID first.");
                }

                const data = await postJson(`${apiBase}/api/stripe/subscription-session`, {
                  priceId: subscriptionPriceId.trim(),
                  customerEmail: email,
                  connectedAccountId: connectedAccountId.trim() || undefined,
                  metadata: { flow: "subscription_checkout" }
                });

                if (data.url) { window.location.href = data.url; }
              })
            }
          >
            {busy === "subscription" ? "Starting..." : "Start Subscription Checkout"}
          </button>
        </section>

        <section className={styles.card}>
          <h2>Connect + Payouts</h2>
          <div className={styles.row}>
            <button
              type="button"
              className={styles.actionButton}
              disabled={Boolean(busy)}
              onClick={() =>
                start("connect", async () => {
                  const data = await postJson(`${apiBase}/api/stripe/connect/account`, {
                    email,
                    country: "GB",
                    metadata: { role: "caregiver" }
                  });
                  setConnectedAccountId(data.accountId);
                  if (data.onboardingUrl) { window.location.href = data.onboardingUrl; }
                })
              }
            >
              {busy === "connect" ? "Creating..." : "Create Connect Account + Onboard"}
            </button>
          </div>

          <label className={styles.field}>
            <span>Connected account ID</span>
            <input
              placeholder="acct_..."
              value={connectedAccountId}
              onChange={(e) => setConnectedAccountId(e.target.value)}
            />
          </label>

          <div className={styles.row}>
            <button
              type="button"
              className={styles.actionButton}
              disabled={Boolean(busy)}
              onClick={() =>
                start("dashboard-link", async () => {
                  if (!connectedAccountId.trim()) {
                    throw new Error("Enter a connected account ID first.");
                  }

                  const data = await postJson(`${apiBase}/api/stripe/connect/dashboard-link`, {
                    accountId: connectedAccountId.trim()
                  });
                  if (data.url) { window.open(data.url, "_blank", "noopener,noreferrer"); }
                })
              }
            >
              {busy === "dashboard-link" ? "Opening..." : "Open Stripe Express Dashboard"}
            </button>

            <label className={styles.inlineField}>
              <span>Payout amount (pence)</span>
              <input
                value={payoutAmountPence}
                onChange={(e) => setPayoutAmountPence(e.target.value)}
              />
            </label>

            <button
              type="button"
              className={styles.actionButton}
              disabled={Boolean(busy)}
              onClick={() =>
                start("payout", async () => {
                  if (!connectedAccountId.trim()) {
                    throw new Error("Enter a connected account ID first.");
                  }
                  const amount = Number(payoutAmountPence);
                  if (!Number.isInteger(amount) || amount <= 0) {
                    throw new Error("Payout amount must be a positive integer in pence.");
                  }

                  const data = await postJson(`${apiBase}/api/stripe/connect/payout`, {
                    accountId: connectedAccountId.trim(),
                    amount,
                    currency: "gbp",
                    description: "ICare test payout"
                  });
                  setMessage(
                    `Gross: ${data.grossAmount}p | Fee (${data.platformFeePercent}%): ${data.platformFeeAmount}p | Caregiver: ${data.caregiverAmount}p`
                  );
                })
              }
            >
              {busy === "payout" ? "Sending..." : "Send Test Payout"}
            </button>
          </div>
        </section>

        {error ? <p className={styles.error}>{error}</p> : null}
        {message ? <p className={styles.success}>{message}</p> : null}
      </div>
    </div>
  );
}
