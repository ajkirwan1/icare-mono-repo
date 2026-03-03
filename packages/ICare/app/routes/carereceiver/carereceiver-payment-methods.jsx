import { Form, Link, useActionData, useLoaderData, useNavigation, redirect } from "react-router";
import {
    createStripeTestPaymentCheckoutSession,
    createStripeSetupCheckoutSession,
    detachStripePaymentMethod,
    ensureStripeCustomer,
    getStripeCheckoutSessionWithPayment,
    getStripePublishableKey,
    isStripeConfigured,
    listStripePaymentMethods,
    setStripeDefaultPaymentMethod
} from "~/lib/stripe-payments.server";
import { useState } from "react";
import "./carereceiver-pages.css";

function parseTestAmount(raw) {
    const normalized = String(raw || "").replace(",", ".").trim();
    const value = Number(normalized);
    if (!Number.isFinite(value)) {
        return null;
    }
    if (value <= 0 || value > 5000) {
        return null;
    }
    return Number(value.toFixed(2));
}

function formatCurrency(value, currency = "GBP") {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: String(currency || "GBP").toUpperCase()
    }).format(Number(value || 0));
}

function messageFromQuery(url) {
    const setup = url.searchParams.get("setup");
    const pm = url.searchParams.get("pm");

    if (setup === "success") {
        return { type: "success", text: "Card setup completed. Your payment methods were refreshed." };
    }

    if (setup === "cancel") {
        return { type: "info", text: "Card setup was cancelled. No changes were made." };
    }

    if (pm === "default") {
        return { type: "success", text: "Default payment method updated." };
    }

    if (pm === "removed") {
        return { type: "success", text: "Payment method removed." };
    }

    return null;
}

function redirectWithCookie(path, setCookie) {
    if (setCookie) {
        return redirect(path, { headers: { "Set-Cookie": setCookie } });
    }

    return redirect(path);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const configured = isStripeConfigured();
    const publishableKey = getStripePublishableKey();
    const paymentTestStatus = String(url.searchParams.get("payment_test") || "").trim().toLowerCase();
    const paymentTestSessionId = String(url.searchParams.get("session_id") || "").trim();

    if (!configured) {
        return {
            stripeConfigured: false,
            publishableKey,
            cards: [],
            notice: messageFromQuery(url),
            testPayment: null,
            error: "Stripe is not configured yet. Add sandbox keys to enable real payment methods."
        };
    }

    try {
        const { customerId, setCookie } = await ensureStripeCustomer(request);
        const cards = await listStripePaymentMethods(customerId);
        let testPayment = null;

        if (paymentTestStatus === "success" && paymentTestSessionId.startsWith("cs_")) {
            try {
                const session = await getStripeCheckoutSessionWithPayment(paymentTestSessionId);
                testPayment = {
                    ok: true,
                    amount: session.amountTotal,
                    amountLabel: formatCurrency(session.amountTotal, session.currency),
                    currency: session.currency,
                    paymentStatus: session.paymentStatus,
                    paymentIntentId: session.paymentIntentId,
                    chargeId: session.chargeId,
                    createdAt: session.createdAt
                };
            } catch (error) {
                testPayment = {
                    ok: false,
                    message: error?.message || "Could not verify Stripe test payment session."
                };
            }
        } else if (paymentTestStatus === "cancel") {
            testPayment = {
                ok: false,
                message: "Sandbox payment was cancelled."
            };
        }

        const payload = {
            stripeConfigured: true,
            publishableKey,
            customerId,
            cards,
            notice: messageFromQuery(url),
            testPayment,
            error: null
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
        return {
            stripeConfigured: true,
            publishableKey,
            cards: [],
            notice: messageFromQuery(url),
            testPayment: null,
            error: error?.message || "Could not load payment methods from Stripe."
        };
    }
}

export async function action({ request }) {
    const formData = await request.formData();
    const intent = String(formData.get("intent") || "");
    const configured = isStripeConfigured();

    if (!configured) {
        return {
            ok: false,
            error: "Stripe is not configured yet."
        };
    }

    try {
        const { customerId, setCookie } = await ensureStripeCustomer(request);

        if (intent === "start_setup") {
            const currentUrl = new URL(request.url);
            const successUrl = `${currentUrl.origin}/carereceiver/settings/payment?setup=success`;
            const cancelUrl = `${currentUrl.origin}/carereceiver/settings/payment?setup=cancel`;
            const session = await createStripeSetupCheckoutSession({ customerId, successUrl, cancelUrl });

            return redirectWithCookie(session.url, setCookie);
        }

        if (intent === "start_test_payment") {
            const currentUrl = new URL(request.url);
            const amount = parseTestAmount(formData.get("testAmount"));

            if (!amount) {
                return {
                    ok: false,
                    error: "Enter a valid test payment amount (e.g. 1.00)."
                };
            }

            const successUrl = `${currentUrl.origin}/carereceiver/settings/payment?payment_test=success&session_id={CHECKOUT_SESSION_ID}`;
            const cancelUrl = `${currentUrl.origin}/carereceiver/settings/payment?payment_test=cancel`;
            const session = await createStripeTestPaymentCheckoutSession({
                customerId,
                amount,
                currency: "gbp",
                successUrl,
                cancelUrl
            });

            return redirectWithCookie(session.url, setCookie);
        }

        const paymentMethodId = String(formData.get("paymentMethodId") || "").trim();
        if (!paymentMethodId.startsWith("pm_")) {
            return {
                ok: false,
                error: "Invalid payment method id."
            };
        }

        const cards = await listStripePaymentMethods(customerId);
        const target = cards.find((card) => card.id === paymentMethodId);

        if (!target) {
            return {
                ok: false,
                error: "Payment method not found for this account."
            };
        }

        if (intent === "set_default") {
            await setStripeDefaultPaymentMethod(customerId, paymentMethodId);
            return redirectWithCookie("/carereceiver/settings/payment?pm=default", setCookie);
        }

        if (intent === "remove") {
            await detachStripePaymentMethod(paymentMethodId);

            if (target.isDefault) {
                const remaining = cards.filter((card) => card.id !== paymentMethodId);
                if (remaining[0]) {
                    await setStripeDefaultPaymentMethod(customerId, remaining[0].id);
                }
            }

            return redirectWithCookie("/carereceiver/settings/payment?pm=removed", setCookie);
        }

        return {
            ok: false,
            error: "Unsupported action."
        };
    } catch (error) {
        return {
            ok: false,
            error: error?.message || "Stripe operation failed."
        };
    }
}

function statusChip(card) {
    if (card.isExpired) {
        return { className: "cr-chip cr-chip--orange", label: "Expired" };
    }

    if (card.isDefault) {
        return { className: "cr-chip cr-chip--green", label: "Default" };
    }

    return { className: "cr-chip cr-chip--blue", label: "Saved" };
}

export default function CarereceiverPaymentMethods() {
    const loaderData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const [cardholderName, setCardholderName] = useState("");
    const [cardPostcode, setCardPostcode] = useState("");

    const [testAmount, setTestAmount] = useState("1.00");
    const { cards, notice, error, stripeConfigured, publishableKey, testPayment } = loaderData;
    const expiredCard = cards.find((card) => card.isExpired);

    return (
        <div className="cr-page">
            <div className="cr-shell">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb navigation">
                    <Link to="/carereceiver/dashboard">Dashboard</Link>
                    <span>›</span>
                    <Link to="/carereceiver/settings/payment">Settings</Link>
                    <span>›</span>
                    <strong>Payment Methods</strong>
                </nav>

                <header className="cr-header">
                    <h1>Payment Methods</h1>
                    <p>Manage your payment cards for booking payments.</p>
                </header>

                {expiredCard ? (
                    <section className="cr-alert" role="alert">
                        <p style={{ fontWeight: 700, marginBottom: "6px" }}>Card expired</p>
                        <p>Your card ending in {expiredCard.last4} has expired. Please update or remove this card and add a new one.</p>
                    </section>
                ) : null}

                {notice ? (
                    <section className="cr-alert" role="status">
                        <p>{notice.text}</p>
                    </section>
                ) : null}

                {error ? (
                    <section className="cr-alert" role="alert">
                        <p>{error}</p>
                    </section>
                ) : null}

                {actionData?.error ? (
                    <section className="cr-alert" role="alert">
                        <p>{actionData.error}</p>
                    </section>
                ) : null}

                {testPayment ? (
                    <section className="cr-alert" role="status">
                        {testPayment.ok ? (
                            <>
                                <p style={{ fontWeight: 700, marginBottom: "6px" }}>Sandbox payment completed</p>
                                <p>Amount charged by Stripe: <strong>{testPayment.amountLabel}</strong></p>
                                <p className="cr-muted">Status: {testPayment.paymentStatus || "succeeded"}</p>
                                {testPayment.paymentIntentId ? (
                                    <p className="cr-muted">Payment Intent: {testPayment.paymentIntentId}</p>
                                ) : null}
                            </>
                        ) : (
                            <p>{testPayment.message || "Sandbox payment did not complete."}</p>
                        )}
                    </section>
                ) : null}

                <section className="cr-card">
                    <h2 style={{ margin: 0 }}>Saved Cards</h2>

                    {cards.length === 0 ? (
                        <p className="cr-muted">No payment methods saved yet.</p>
                    ) : (
                        <ul className="cr-list">
                            {cards.map((card) => {
                                const status = statusChip(card);
                                return (
                                    <li key={card.id} className="cr-row">
                                        <div>
                                            <p className="cr-row-title">{card.brand} •••• {card.last4}</p>
                                            <p className="cr-row-sub">Expires {card.expiry}</p>
                                            <span className={status.className}>{status.label}</span>
                                        </div>

                                        <div className="cr-inline">
                                            <Form method="post">
                                                <input type="hidden" name="intent" value="set_default" />
                                                <input type="hidden" name="paymentMethodId" value={card.id} />
                                                <button type="submit" className="cr-button cr-button--secondary" disabled={card.isDefault || isSubmitting}>
                                                    Default
                                                </button>
                                            </Form>

                                            <Form method="post">
                                                <input type="hidden" name="intent" value="remove" />
                                                <input type="hidden" name="paymentMethodId" value={card.id} />
                                                <button type="submit" className="cr-button cr-button--orange-outline" disabled={isSubmitting}>
                                                    Remove
                                                </button>
                                            </Form>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>

                <section className="cr-card">
                    <h2>Add New Card</h2>
                    <Form method="post" className="cr-add-card-grid">
                        <input type="hidden" name="intent" value="start_setup" />

                        <label className="cr-muted" htmlFor="card-number">Card number *</label>
                        <input id="card-number" className="cr-input" placeholder="1234 5678 9012 3456" value="" readOnly />

                        <div className="cr-grid cr-grid--1-1">
                            <div>
                                <label className="cr-muted" htmlFor="card-expiry">Expiry date *</label>
                                <input id="card-expiry" className="cr-input" placeholder="MM / YY" value="" readOnly />
                            </div>
                            <div>
                                <label className="cr-muted" htmlFor="card-cvc">CVC *</label>
                                <input id="card-cvc" className="cr-input" placeholder="CVC" value="" readOnly />
                            </div>
                        </div>

                        <label className="cr-muted" htmlFor="cardholder">Cardholder name *</label>
                        <input
                            id="cardholder"
                            className="cr-input"
                            placeholder="e.g., Jane Smith"
                            value={cardholderName}
                            onChange={(event) => setCardholderName(event.target.value)}
                        />

                        <label className="cr-muted" htmlFor="billing-postcode">Billing postcode *</label>
                        <input
                            id="billing-postcode"
                            className="cr-input"
                            placeholder="e.g., SW1A 1AA"
                            value={cardPostcode}
                            onChange={(event) => setCardPostcode(event.target.value)}
                        />

                        <div className="cr-inline" style={{ marginTop: "10px" }}>
                            <button type="submit" className="cr-button cr-button--primary" disabled={!stripeConfigured || isSubmitting}>
                                {isSubmitting ? "Opening Stripe..." : "Save Card"}
                            </button>
                            <button type="reset" className="cr-button cr-button--secondary" onClick={() => { setCardholderName(""); setCardPostcode(""); }}>
                                Cancel
                            </button>
                        </div>
                    </Form>

                    <div className="cr-grid" style={{ gap: "4px", marginTop: "10px" }}>
                        <p className="cr-muted">🔒 256-bit Encrypted</p>
                        <p className="cr-muted">✓ Powered by Stripe</p>
                        <p className="cr-muted">
                            Your card details are securely processed by Stripe. We never store your full card number.
                            {publishableKey ? "" : " (Stripe key missing in this environment.)"}
                        </p>
                    </div>
                </section>

                <section className="cr-card">
                    <h2>Sandbox Test Payment</h2>
                    <p className="cr-muted" style={{ marginTop: 0 }}>
                        Use this to run a real Stripe test checkout and verify charged amount on localhost.
                    </p>
                    <Form method="post" className="cr-add-card-grid">
                        <input type="hidden" name="intent" value="start_test_payment" />

                        <label className="cr-muted" htmlFor="test-amount">Test amount (GBP)</label>
                        <input
                            id="test-amount"
                            name="testAmount"
                            className="cr-input"
                            inputMode="decimal"
                            placeholder="e.g. 1.00"
                            value={testAmount}
                            onChange={(event) => setTestAmount(event.target.value)}
                        />

                        <div className="cr-inline" style={{ marginTop: "10px" }}>
                            <button type="submit" className="cr-button cr-button--primary" disabled={!stripeConfigured || isSubmitting}>
                                {isSubmitting ? "Opening Stripe..." : "Pay Test Amount"}
                            </button>
                        </div>
                    </Form>
                </section>
            </div>
        </div>
    );
}
