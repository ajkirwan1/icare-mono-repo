import { Form, Link, useActionData, useLoaderData, useNavigation, redirect } from "react-router";
import {
    createStripeSetupCheckoutSession,
    detachStripePaymentMethod,
    ensureStripeCustomer,
    getStripePublishableKey,
    isStripeConfigured,
    listStripePaymentMethods,
    setStripeDefaultPaymentMethod
} from "~/lib/stripe-payments.server";
import "./carereceiver-pages.css";

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

    if (!configured) {
        return {
            stripeConfigured: false,
            publishableKey,
            cards: [],
            notice: messageFromQuery(url),
            error: "Stripe is not configured yet. Add sandbox keys to enable real payment methods."
        };
    }

    try {
        const { customerId, setCookie } = await ensureStripeCustomer(request);
        const cards = await listStripePaymentMethods(customerId);

        const payload = {
            stripeConfigured: true,
            publishableKey,
            customerId,
            cards,
            notice: messageFromQuery(url),
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

    const { cards, notice, error, stripeConfigured, publishableKey } = loaderData;

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

                <section className="cr-card">
                    <div className="cr-inline" style={{ justifyContent: "space-between", marginBottom: "10px" }}>
                        <h2 style={{ margin: 0 }}>Saved Cards</h2>
                        <Form method="post">
                            <input type="hidden" name="intent" value="start_setup" />
                            <button type="submit" className="cr-button cr-button--orange-outline" disabled={!stripeConfigured || isSubmitting}>
                                {isSubmitting ? "Opening Stripe..." : "Add Payment Method"}
                            </button>
                        </Form>
                    </div>

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
                                                    {card.isDefault ? "Default" : "Set default"}
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

                <section className="cr-grid cr-grid--2-1">
                    <article className="cr-card">
                        <h2>Secure Card Setup</h2>
                        <p className="cr-muted">
                            We use Stripe-hosted secure forms for card entry. Card number, CVC and expiry are collected directly by Stripe and never stored on iCare servers.
                        </p>
                        <div className="cr-grid" style={{ marginTop: "10px" }}>
                            <span className="cr-chip cr-chip--green">SCA / 3D Secure supported</span>
                            <span className="cr-chip cr-chip--green">PCI-compliant flow</span>
                            <span className="cr-chip cr-chip--green">Sandbox ready</span>
                        </div>
                    </article>

                    <article className="cr-card">
                        <h3>Stripe Config</h3>
                        <p className="cr-muted">Mode: {stripeConfigured ? "Connected" : "Not configured"}</p>
                        <p className="cr-muted">Publishable key: {publishableKey ? "Present" : "Missing"}</p>
                        <span className={`cr-chip ${stripeConfigured ? "cr-chip--green" : "cr-chip--orange"}`}>
                            {stripeConfigured ? "Powered by Stripe" : "Awaiting Sandbox Keys"}
                        </span>
                    </article>
                </section>
            </div>
        </div>
    );
}
