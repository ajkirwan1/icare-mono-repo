import { useEffect, useMemo, useState } from "react";
import styles from "./admin-static-screen.module.scss";
import {
    getAdminSystemSettings,
    isAbortError,
    updateAdminSystemSettings
} from "./admin-verifications-api-client";

function toPercentValue(value, fallback = 0) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return Math.max(0, Math.min(100, Number(parsed.toFixed(2))));
}

export default function AdminSystemSettings() {
    const [data, setData] = useState(null);
    const [form, setForm] = useState({
        platformFeePercent: 15,
        bookingServiceFeePercent: 5,
        identityRequired: true,
        rightToWorkRequired: true,
        dbsRequired: false
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadSettings() {
            setLoading(true);
            setError("");
            try {
                const payload = await getAdminSystemSettings({ signal: controller.signal });
                setData(payload || null);
                setForm({
                    platformFeePercent: toPercentValue(payload?.payments?.platformFeePercent, 15),
                    bookingServiceFeePercent: toPercentValue(payload?.payments?.bookingServiceFeePercent, 5),
                    identityRequired: Boolean(payload?.verification?.identityRequired ?? true),
                    rightToWorkRequired: Boolean(payload?.verification?.rightToWorkRequired ?? true),
                    dbsRequired: Boolean(payload?.verification?.dbsRequired ?? false)
                });
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load settings.");
            } finally {
                setLoading(false);
            }
        }

        loadSettings();
        return () => {
            controller.abort();
        };
    }, []);

    const updatedAt = useMemo(() => {
        const raw = data?.meta?.updatedAt;
        if (!raw) {
            return "-";
        }
        const parsed = new Date(raw);
        if (Number.isNaN(parsed.getTime())) {
            return "-";
        }
        return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(parsed);
    }, [data?.meta?.updatedAt]);

    async function handleSave(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const payload = await updateAdminSystemSettings({
                platformFeePercent: toPercentValue(form.platformFeePercent, 15),
                bookingServiceFeePercent: toPercentValue(form.bookingServiceFeePercent, 5),
                identityRequired: Boolean(form.identityRequired),
                rightToWorkRequired: Boolean(form.rightToWorkRequired),
                dbsRequired: Boolean(form.dbsRequired)
            });

            setData((prev) => ({
                ...(prev || {}),
                payments: payload?.payments || prev?.payments || {},
                verification: payload?.verification || prev?.verification || {},
                meta: payload?.meta || prev?.meta || {}
            }));
            setSuccess("System settings were saved.");
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : "Could not save settings.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h1>System Settings</h1>
                <p>Configure fee policy and onboarding requirements persisted in database.</p>
            </header>

            <article className={styles.panel}>
                <h2>Configuration</h2>
                {loading ? <p>Loading...</p> : null}
                {error ? <p>{error}</p> : null}
                {success ? <p style={{ color: "#166534" }}>{success}</p> : null}

                {!loading && !error ? (
                    <form onSubmit={handleSave} style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
                        <label>
                            Platform fee percent
                            <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={form.platformFeePercent}
                                onChange={(event) => setForm((prev) => ({ ...prev, platformFeePercent: event.target.value }))}
                                style={{ marginLeft: "8px", padding: "8px 10px", width: "130px" }}
                            />
                        </label>

                        <label>
                            Booking service fee percent
                            <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={form.bookingServiceFeePercent}
                                onChange={(event) => setForm((prev) => ({ ...prev, bookingServiceFeePercent: event.target.value }))}
                                style={{ marginLeft: "8px", padding: "8px 10px", width: "130px" }}
                            />
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={form.identityRequired}
                                onChange={(event) => setForm((prev) => ({ ...prev, identityRequired: event.target.checked }))}
                                style={{ marginRight: "8px" }}
                            />
                            Identity verification required
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={form.rightToWorkRequired}
                                onChange={(event) => setForm((prev) => ({ ...prev, rightToWorkRequired: event.target.checked }))}
                                style={{ marginRight: "8px" }}
                            />
                            Right to Work required
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={form.dbsRequired}
                                onChange={(event) => setForm((prev) => ({ ...prev, dbsRequired: event.target.checked }))}
                                style={{ marginRight: "8px" }}
                            />
                            DBS required
                        </label>

                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <button
                                type="submit"
                                disabled={saving}
                                style={{ padding: "8px 12px", border: "1px solid #0f172a", borderRadius: "8px", background: "#0f172a", color: "#fff" }}
                            >
                                {saving ? "Saving..." : "Save Settings"}
                            </button>
                            <span style={{ color: "#475569" }}>Last updated: {updatedAt}</span>
                        </div>
                    </form>
                ) : null}
            </article>

            {!loading ? (
                <article className={styles.panel}>
                    <h2>Runtime Snapshot</h2>
                    <ul className={styles.list}>
                        <li>Stripe configured: {data?.platform?.stripeConfigured ? "Yes" : "No"}</li>
                        <li>Environment: {data?.platform?.apiEnvironment || "-"}</li>
                        <li>Total users: {Number(data?.platform?.totalUsers || 0)}</li>
                        <li>Active users: {Number(data?.platform?.activeUsers || 0)}</li>
                        <li>Pending verifications: {Number(data?.platform?.pendingVerifications || 0)}</li>
                    </ul>
                </article>
            ) : null}
        </section>
    );
}
