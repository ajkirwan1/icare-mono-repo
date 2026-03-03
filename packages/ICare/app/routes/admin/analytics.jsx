import { useEffect, useState } from "react";
import Card from "~/components/application/data-display/card/card";
import { getAdminAnalytics, isAbortError } from "./admin-verifications-api-client";

function formatMoney(value) {
    return `£${Number(value || 0).toFixed(2)}`;
}

function formatPct(value) {
    const numeric = Number(value || 0);
    const sign = numeric > 0 ? "+" : "";
    return `${sign}${numeric.toFixed(1)}%`;
}

export default function Analytics() {
    const [days, setDays] = useState(30);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadAnalytics() {
            setLoading(true);
            setError("");

            try {
                const payload = await getAdminAnalytics({ days, signal: controller.signal });
                setData(payload || null);
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load analytics.");
            } finally {
                setLoading(false);
            }
        }

        loadAnalytics();
        return () => {
            controller.abort();
        };
    }, [days]);

    const users = data?.users || {};
    const bookings = data?.bookings || {};
    const reviews = data?.reviews || {};
    const queue = data?.verificationQueue || {};
    const onboarding = data?.onboarding || {};

    return (
        <section>
            <h1>Admin Analytics</h1>
            <p>Live metrics for users, bookings, revenue and quality.</p>

            <div style={{ marginBottom: "16px" }}>
                <label>
                    Period{" "}
                    <select value={days} onChange={(event) => setDays(Number(event.target.value))} style={{ padding: "8px 10px" }}>
                        <option value={7}>Last 7 days</option>
                        <option value={30}>Last 30 days</option>
                        <option value={90}>Last 90 days</option>
                    </select>
                </label>
            </div>

            {loading ? <p>Loading analytics...</p> : null}
            {error ? <p>{error}</p> : null}

            {!loading && !error ? (
                <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                    <Card title={"Users"}>
                        <p>Total: {Number(users.total || 0)}</p>
                        <p>Active: {Number(users.active || 0)}</p>
                        <p>New period: {Number(users.newCurrent || 0)} ({formatPct(users.growthPct)})</p>
                    </Card>
                    <Card title={"Bookings"}>
                        <p>Created: {Number(bookings.current || 0)}</p>
                        <p>Completed: {Number(bookings.completed || 0)}</p>
                        <p>Growth: {formatPct(bookings.growthPct)}</p>
                    </Card>
                    <Card title={"Revenue"}>
                        <p>GMV (period): {formatMoney(bookings.gmvCurrent)}</p>
                        <p>Platform fees: {formatMoney(bookings.platformFeesCurrent)}</p>
                        <p>Booking service fee: {Number(bookings.serviceFeePercent || 0).toFixed(2)}%</p>
                        <p>Avg booking: {formatMoney(bookings.averageValue)}</p>
                    </Card>
                    <Card title={"Quality"}>
                        <p>Avg rating: {Number(reviews.averageRating || 0).toFixed(2)}</p>
                        <p>Low ratings: {Number(reviews.lowRatings || 0)}</p>
                        <p>Total reviews: {Number(reviews.total || 0)}</p>
                    </Card>
                    <Card title={"Verification Queue"}>
                        <p>Pending: {Number(queue.pending || 0)}</p>
                        <p>Approved: {Number(queue.approved || 0)}</p>
                        <p>Rejected: {Number(queue.rejected || 0)}</p>
                    </Card>
                    <Card title={"Caregiver Onboarding"}>
                        <p>Total records: {Number(onboarding.total || 0)}</p>
                        <p>Ready: {Number(onboarding.readyForActivation || 0)}</p>
                        <p>Completion: {Number(onboarding.completionRatePct || 0).toFixed(1)}%</p>
                    </Card>
                </div>
            ) : null}
        </section>
    );
}
