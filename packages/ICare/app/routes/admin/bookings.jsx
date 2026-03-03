import { useEffect, useMemo, useState } from "react";
import { getAdminBookings, isAbortError } from "./admin-verifications-api-client";

function formatDateTime(value, isTimeOnly = false) {
    if (!value) {
        return "-";
    }

    if (isTimeOnly) {
        return String(value).slice(0, 5);
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(parsed);
}

export default function Bookings() {
    const [status, setStatus] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadBookings() {
            setLoading(true);
            setError("");
            try {
                const payload = await getAdminBookings({
                    status,
                    limit: 200,
                    signal: controller.signal
                });
                setItems(Array.isArray(payload?.items) ? payload.items : []);
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load bookings.");
            } finally {
                setLoading(false);
            }
        }

        loadBookings();

        return () => {
            controller.abort();
        };
    }, [status]);

    const totals = useMemo(
        () => ({
            all: items.length,
            requested: items.filter((item) => item?.status === "requested").length,
            accepted: items.filter((item) => item?.status === "accepted").length,
            inProgress: items.filter((item) => item?.status === "in_progress").length
        }),
        [items]
    );

    return (
        <section>
            <h1>Booking Management</h1>
            <p>Bookings created from the care receiver panel.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(120px, 1fr))", gap: "12px", marginBottom: "16px" }}>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px" }}><strong>Total:</strong> {totals.all}</div>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px" }}><strong>Requested:</strong> {totals.requested}</div>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px" }}><strong>Accepted:</strong> {totals.accepted}</div>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px" }}><strong>In progress:</strong> {totals.inProgress}</div>
            </div>

            <div style={{ marginBottom: "12px" }}>
                <label>
                    Status:{" "}
                    <select value={status} onChange={(event) => setStatus(event.target.value)} style={{ padding: "8px 10px" }}>
                        <option value="">All</option>
                        <option value="requested">Requested</option>
                        <option value="accepted">Accepted</option>
                        <option value="in_progress">In progress</option>
                        <option value="completed">Completed</option>
                        <option value="payment_released">Payment released</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </label>
            </div>

            {loading ? <p>Loading bookings...</p> : null}
            {error ? <p>{error}</p> : null}
            {!loading && !error && items.length === 0 ? <p>No bookings found.</p> : null}

            {!loading && !error && items.length > 0 ? (
                <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
                    <table style={{ width: "100%", minWidth: "980px", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Booking</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Caregiver</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Service</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Date</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Time</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Status</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Total</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Requested</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{item.bookingRef || item.id}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{item.caregiverName || "-"}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{item.serviceType || "-"}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{item.bookingDate || "-"}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{formatDateTime(item.startTime, true)}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{item.status || "-"}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{`£${Number(item.paymentTotal || 0).toFixed(2)}`}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{formatDateTime(item.requestedAt || item.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </section>
    );
}
