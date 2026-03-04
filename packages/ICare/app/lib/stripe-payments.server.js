/* global process */
const STRIPE_API_BASE = "https://api.stripe.com/v1";
const SETTINGS_API_BASE = String(process.env.API_INTERNAL_URL || process.env.VITE_API_URL || "http://localhost:4001").replace(/\/$/, "");
const CUSTOMER_COOKIE_NAME = "icare_cr_customer_id";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getStripeSecretKey() {
    return process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY_TEST || "";
}

export function isStripeConfigured() {
    const secretKey = getStripeSecretKey();
    return secretKey.startsWith("sk_test_") || secretKey.startsWith("sk_live_");
}

export function getStripePublishableKey() {
    return process.env.STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY_TEST || "";
}

function parseCookieHeader(cookieHeader) {
    if (!cookieHeader) {
        return {};
    }

    return String(cookieHeader)
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean)
        .reduce((acc, item) => {
            const separator = item.indexOf("=");
            if (separator <= 0) {
                return acc;
            }

            const key = decodeURIComponent(item.slice(0, separator).trim());
            const value = decodeURIComponent(item.slice(separator + 1).trim());
            acc[key] = value;
            return acc;
        }, {});
}

function isUuid(value) {
    return UUID_RE.test(String(value || "").trim());
}

function buildCookie(name, value, requestUrl) {
    const url = new URL(requestUrl);
    const segments = [
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
        "Path=/",
        `Max-Age=${ONE_YEAR_SECONDS}`,
        "HttpOnly",
        "SameSite=Lax"
    ];

    if (url.protocol === "https:") {
        segments.push("Secure");
    }

    return segments.join("; ");
}

function titleCaseBrand(brand) {
    return String(brand || "card")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function cardExpiry(card) {
    const month = String(card?.exp_month || "").padStart(2, "0");
    const year = String(card?.exp_year || "");
    return `${month}/${year.slice(-2)}`;
}

function isCardExpired(card) {
    const now = new Date();
    const month = now.getUTCMonth() + 1;
    const year = now.getUTCFullYear();
    const expMonth = Number(card?.exp_month || 0);
    const expYear = Number(card?.exp_year || 0);

    if (!expMonth || !expYear) {
        return false;
    }

    return expYear < year || (expYear === year && expMonth < month);
}

function toStripeFormBody(values = {}) {
    const body = new URLSearchParams();

    Object.entries(values).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item !== null && item !== undefined && item !== "") {
                    body.append(`${key}[]`, String(item));
                }
            });
            return;
        }

        body.append(key, String(value));
    });

    return body;
}

async function stripeApiRequest(path, options = {}) {
    const secretKey = getStripeSecretKey();

    if (!secretKey) {
        throw new Error("Stripe secret key is not configured.");
    }

    const method = options.method || "GET";
    const headers = {
        Authorization: `Bearer ${secretKey}`
    };

    const requestOptions = { method, headers };

    if (options.form) {
        const body = options.form instanceof URLSearchParams ? options.form : toStripeFormBody(options.form);
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        requestOptions.body = body.toString();
    }

    const response = await fetch(`${STRIPE_API_BASE}${path}`, requestOptions);
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = payload?.error?.message || `Stripe request failed (${response.status}).`;
        const error = new Error(message);
        error.status = response.status;
        error.code = payload?.error?.code;
        throw error;
    }

    return payload;
}

async function readPersistedStripeCustomerId(userId) {
    if (!isUuid(userId) || !SETTINGS_API_BASE) {
        return "";
    }

    try {
        const response = await fetch(`${SETTINGS_API_BASE}/api/v1/carereceiver/settings/payments?userId=${encodeURIComponent(userId)}`, {
            headers: {
                Accept: "application/json",
                "x-user-id": userId
            }
        });

        if (!response.ok) {
            return "";
        }

        const payload = await response.json().catch(() => null);
        const data = payload?.data || payload || {};
        const customerId = String(data?.stripeCustomerId || "").trim();
        return customerId.startsWith("cus_") ? customerId : "";
    } catch {
        return "";
    }
}

async function persistStripeCustomerId(userId, customerId) {
    if (!isUuid(userId) || !String(customerId || "").startsWith("cus_") || !SETTINGS_API_BASE) {
        return;
    }

    try {
        await fetch(`${SETTINGS_API_BASE}/api/v1/carereceiver/settings/payments/stripe-customer`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "x-user-id": userId
            },
            body: JSON.stringify({
                userId,
                stripeCustomerId: customerId
            })
        });
    } catch {
        // Persisting the mapping is best-effort; Stripe flow should still continue.
    }
}

export async function ensureStripeCustomer(request, { userId = "" } = {}) {
    if (!isStripeConfigured()) {
        return { customerId: "", setCookie: null };
    }

    const normalizedUserId = isUuid(userId) ? userId : "";
    const forcedCustomerId = process.env.STRIPE_SANDBOX_CUSTOMER_ID || process.env.STRIPE_TEST_CUSTOMER_ID || "";
    if (forcedCustomerId) {
        if (normalizedUserId) {
            await persistStripeCustomerId(normalizedUserId, forcedCustomerId);
        }
        return { customerId: forcedCustomerId, setCookie: null };
    }

    if (normalizedUserId) {
        const persistedCustomerId = await readPersistedStripeCustomerId(normalizedUserId);
        if (persistedCustomerId) {
            try {
                const customer = await stripeApiRequest(`/customers/${persistedCustomerId}`);
                if (customer?.id && !customer.deleted) {
                    const setCookie = buildCookie(CUSTOMER_COOKIE_NAME, customer.id, request.url);
                    return { customerId: customer.id, setCookie };
                }
            } catch {
                // Fall through to cookie / create flow.
            }
        }
    }

    const cookieHeader = request.headers.get("Cookie");
    const cookies = parseCookieHeader(cookieHeader);
    const existingCustomerId = cookies[CUSTOMER_COOKIE_NAME];

    if (existingCustomerId) {
        try {
            const customer = await stripeApiRequest(`/customers/${existingCustomerId}`);
            if (customer?.id && !customer.deleted) {
                if (normalizedUserId) {
                    await persistStripeCustomerId(normalizedUserId, customer.id);
                }
                return { customerId: customer.id, setCookie: null };
            }
        } catch {
            // Ignore and create a new customer.
        }
    }

    const created = await stripeApiRequest("/customers", {
        method: "POST",
        form: {
            description: "iCare care receiver sandbox customer",
            "metadata[source]": "icare-web"
        }
    });

    const setCookie = buildCookie(CUSTOMER_COOKIE_NAME, created.id, request.url);
    if (normalizedUserId) {
        await persistStripeCustomerId(normalizedUserId, created.id);
    }
    return { customerId: created.id, setCookie };
}

export async function listStripePaymentMethods(customerId) {
    if (!customerId) {
        return [];
    }

    const [paymentMethodsResult, customer] = await Promise.all([
        stripeApiRequest(`/payment_methods?type=card&customer=${encodeURIComponent(customerId)}&limit=100`),
        stripeApiRequest(`/customers/${encodeURIComponent(customerId)}`)
    ]);

    const defaultPaymentMethodId = customer?.invoice_settings?.default_payment_method || "";
    const methods = Array.isArray(paymentMethodsResult?.data) ? paymentMethodsResult.data : [];

    return methods.map((method) => ({
        id: method.id,
        brand: titleCaseBrand(method?.card?.brand),
        last4: method?.card?.last4 || "0000",
        expiry: cardExpiry(method?.card),
        isExpired: isCardExpired(method?.card),
        isDefault: method.id === defaultPaymentMethodId
    }));
}

export async function createStripeSetupCheckoutSession({ customerId, successUrl, cancelUrl }) {
    return stripeApiRequest("/checkout/sessions", {
        method: "POST",
        form: {
            mode: "setup",
            customer: customerId,
            success_url: successUrl,
            cancel_url: cancelUrl,
            billing_address_collection: "required",
            "payment_method_types[]": "card",
            locale: "en-GB"
        }
    });
}

export async function setStripeDefaultPaymentMethod(customerId, paymentMethodId) {
    return stripeApiRequest(`/customers/${encodeURIComponent(customerId)}`, {
        method: "POST",
        form: {
            "invoice_settings[default_payment_method]": paymentMethodId
        }
    });
}

export async function detachStripePaymentMethod(paymentMethodId) {
    return stripeApiRequest(`/payment_methods/${encodeURIComponent(paymentMethodId)}/detach`, {
        method: "POST"
    });
}

function toMinorUnits(amount) {
    return Math.max(0, Math.round(Number(amount || 0) * 100));
}

function fromMinorUnits(amount) {
    const value = Number(amount || 0);
    if (!Number.isFinite(value)) {
        return 0;
    }
    return value / 100;
}

export async function createStripeBookingAuthorization({
    customerId,
    paymentMethodId,
    amount,
    currency = "gbp",
    metadata = {}
}) {
    const minorAmount = toMinorUnits(amount);

    if (!minorAmount) {
        throw new Error("Booking amount must be greater than 0.");
    }

    return stripeApiRequest("/payment_intents", {
        method: "POST",
        form: {
            amount: minorAmount,
            currency,
            customer: customerId,
            payment_method: paymentMethodId,
            off_session: true,
            confirm: true,
            capture_method: "manual",
            description: "iCare booking authorization",
            "metadata[source]": "icare-booking-request",
            ...Object.fromEntries(
                Object.entries(metadata).map(([key, value]) => [`metadata[${key}]`, value])
            )
        }
    });
}

export async function cancelStripePaymentIntent(paymentIntentId) {
    if (!paymentIntentId) {
        return null;
    }

    return stripeApiRequest(`/payment_intents/${encodeURIComponent(paymentIntentId)}/cancel`, {
        method: "POST"
    });
}

export async function createStripeTestPaymentCheckoutSession({
    customerId,
    amount,
    currency = "gbp",
    successUrl,
    cancelUrl
}) {
    const minorAmount = toMinorUnits(amount);
    if (!minorAmount) {
        throw new Error("Test payment amount must be greater than 0.");
    }

    return stripeApiRequest("/checkout/sessions", {
        method: "POST",
        form: {
            mode: "payment",
            customer: customerId,
            success_url: successUrl,
            cancel_url: cancelUrl,
            billing_address_collection: "required",
            "payment_method_types[]": "card",
            locale: "en-GB",
            "line_items[0][quantity]": 1,
            "line_items[0][price_data][currency]": currency,
            "line_items[0][price_data][unit_amount]": minorAmount,
            "line_items[0][price_data][product_data][name]": "ICare sandbox payment test",
            "line_items[0][price_data][product_data][description]": "Local test checkout in Stripe sandbox",
            "metadata[source]": "icare-payment-methods-test"
        }
    });
}

export async function createStripeBookingCheckoutSession({
    customerId,
    amount,
    currency = "gbp",
    successUrl,
    cancelUrl,
    metadata = {}
}) {
    const minorAmount = toMinorUnits(amount);
    if (!minorAmount) {
        throw new Error("Booking amount must be greater than 0.");
    }

    return stripeApiRequest("/checkout/sessions", {
        method: "POST",
        form: {
            mode: "payment",
            customer: customerId,
            success_url: successUrl,
            cancel_url: cancelUrl,
            billing_address_collection: "required",
            "payment_method_types[]": "card",
            locale: "en-GB",
            "line_items[0][quantity]": 1,
            "line_items[0][price_data][currency]": currency,
            "line_items[0][price_data][unit_amount]": minorAmount,
            "line_items[0][price_data][product_data][name]": "ICare booking authorization",
            "line_items[0][price_data][product_data][description]": "Booking hold to be captured after caregiver acceptance",
            "payment_intent_data[capture_method]": "manual",
            "payment_intent_data[description]": "iCare booking authorization",
            "metadata[source]": "icare-booking-checkout",
            "payment_intent_data[metadata][source]": "icare-booking-request",
            ...Object.fromEntries(
                Object.entries(metadata).flatMap(([key, value]) => ([
                    [`metadata[${key}]`, value],
                    [`payment_intent_data[metadata][${key}]`, value]
                ]))
            )
        }
    });
}

export async function getStripeCheckoutSessionWithPayment(sessionId) {
    const id = String(sessionId || "").trim();
    if (!id.startsWith("cs_")) {
        throw new Error("Invalid Stripe checkout session id.");
    }

    const result = await stripeApiRequest(
        `/checkout/sessions/${encodeURIComponent(id)}?expand[]=payment_intent&expand[]=payment_intent.latest_charge`
    );

    const paymentIntent = result?.payment_intent && typeof result.payment_intent === "object"
        ? result.payment_intent
        : null;
    const latestCharge = paymentIntent?.latest_charge && typeof paymentIntent.latest_charge === "object"
        ? paymentIntent.latest_charge
        : null;

    return {
        id: result?.id || id,
        checkoutStatus: String(result?.status || "").trim().toLowerCase(),
        checkoutPaymentStatus: String(result?.payment_status || "").trim().toLowerCase(),
        paymentStatus: String(result?.payment_status || paymentIntent?.status || "").trim().toLowerCase(),
        paymentIntentStatus: String(paymentIntent?.status || "").trim().toLowerCase(),
        currency: String(result?.currency || paymentIntent?.currency || "gbp").toUpperCase(),
        amountTotal: fromMinorUnits(result?.amount_total || paymentIntent?.amount_received || paymentIntent?.amount || 0),
        amountCaptured: fromMinorUnits(paymentIntent?.amount_received || 0),
        paymentIntentId: paymentIntent?.id || "",
        paymentMethodId: typeof paymentIntent?.payment_method === "string"
            ? paymentIntent.payment_method
            : paymentIntent?.payment_method?.id || "",
        chargeId: latestCharge?.id || "",
        createdAt: Number(result?.created || paymentIntent?.created || 0) > 0
            ? new Date(Number(result?.created || paymentIntent?.created) * 1000).toISOString()
            : null
    };
}
