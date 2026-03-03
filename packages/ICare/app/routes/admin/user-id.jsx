import { Link, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { getAdminUserDetail, isAbortError } from "./admin-verifications-api-client";

function formatDateTime(value) {
    if (!value) {
        return "-";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "-";
    }
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(parsed);
}

export default function UserId() {
    const params = useParams();
    const userId = String(params.userId || "").trim();

    const [payload, setPayload] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadUser() {
            if (!userId) {
                setError("Missing userId in route.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");
            try {
                const response = await getAdminUserDetail(userId, { signal: controller.signal });
                setPayload(response || null);
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load user detail.");
            } finally {
                setLoading(false);
            }
        }

        loadUser();
        return () => {
            controller.abort();
        };
    }, [userId]);

    const user = payload?.user || {};
    const activity = payload?.activity || {};
    const recentBookings = Array.isArray(payload?.recentBookings) ? payload.recentBookings : [];
    const verifications = Array.isArray(payload?.verificationHistory) ? payload.verificationHistory : [];

    const userName = useMemo(
        () => `${String(user.firstName || "").trim()} ${String(user.lastName || "").trim()}`.trim() || "User",
        [user.firstName, user.lastName]
    );

    return (
        <section>
            <h1>User Detail</h1>
            <p><Link to="/admin/users">Back to users</Link></p>

            {loading ? <p>Loading user detail...</p> : null}
            {error ? <p>{error}</p> : null}

            {!loading && !error ? (
                <>
                    <article style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px", marginBottom: "14px" }}>
                        <h2 style={{ marginTop: 0 }}>{userName}</h2>
                        <p>Email: {user.email || "-"}</p>
                        <p>Role: {user.userType || "-"}</p>
                        <p>Status: {user.accountStatus || "-"}</p>
                        <p>Created: {formatDateTime(user.createdAt)}</p>
                        <p>Last login: {formatDateTime(user.lastLoginAt)}</p>
                    </article>

                    <article style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px", marginBottom: "14px" }}>
                        <h2 style={{ marginTop: 0 }}>Activity</h2>
                        <p>Bookings total: {Number(activity?.bookings?.total || 0)}</p>
                        <p>Conversations total: {Number(activity?.conversations?.total || 0)}</p>
                        <p>Reviews given: {Number(activity?.reviews?.givenCount || 0)} (avg {Number(activity?.reviews?.givenAverageRating || 0).toFixed(2)})</p>
                        <p>Reviews received: {Number(activity?.reviews?.receivedCount || 0)} (avg {Number(activity?.reviews?.receivedAverageRating || 0).toFixed(2)})</p>
                    </article>

                    <article style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px", marginBottom: "14px" }}>
                        <h2 style={{ marginTop: 0 }}>Recent Bookings</h2>
                        {recentBookings.length === 0 ? <p>No bookings for this user.</p> : null}
                        {recentBookings.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: "18px" }}>
                                {recentBookings.map((booking) => (
                                    <li key={booking.id}>
                                        {booking.bookingRef || booking.id} - {booking.status || "-"} - {formatDateTime(booking.activityAt)}
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </article>

                    <article style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px" }}>
                        <h2 style={{ marginTop: 0 }}>Verification History</h2>
                        {verifications.length === 0 ? <p>No caregiver verification records for this user.</p> : null}
                        {verifications.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: "18px" }}>
                                {verifications.map((item) => (
                                    <li key={item.id || `${item.verificationType}-${item.submittedAt}`}>
                                        <Link to={`/admin/verifications/${item.id}`}>{item.verificationType || "verification"}</Link> - {item.status || "-"} - {formatDateTime(item.submittedAt)}
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </article>
                </>
            ) : null}
        </section>
    );
}
