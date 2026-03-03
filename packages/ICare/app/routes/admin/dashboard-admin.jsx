import { useEffect, useMemo, useState } from "react";
import styles from "./admin-static-screen.module.scss";
import { getAdminDashboardSummary, isAbortError } from "./admin-verifications-api-client";

function typeLabel(type) {
    const normalized = String(type || "").trim().toLowerCase();
    if (normalized === "right_to_work") {
        return "Right to Work";
    }
    if (normalized === "identity") {
        return "Identity";
    }
    if (normalized === "dbs") {
        return "DBS";
    }
    return "Verification";
}

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

export default function DashboardAdmin() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadSummary() {
            setLoading(true);
            setError("");
            try {
                const payload = await getAdminDashboardSummary({ signal: controller.signal });
                setSummary(payload || null);
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load dashboard data.");
            } finally {
                setLoading(false);
            }
        }

        loadSummary();

        return () => {
            controller.abort();
        };
    }, []);

    const overview = useMemo(() => {
        const queue = summary?.verificationQueue || {};
        const users = summary?.users || {};
        const bookings = summary?.bookings || {};

        return [
            `Pending verifications: ${Number(queue.pendingTotal || 0)}`,
            `Average queue wait: ${Number(queue.averageWaitHours || 0).toFixed(1)}h`,
            `Registered users: ${Number(users.total || 0)} (active: ${Number(users.active || 0)})`,
            `Bookings created by users: ${Number(bookings.total || 0)}`
        ];
    }, [summary]);

    const recent = Array.isArray(summary?.recentVerifications) ? summary.recentVerifications : [];

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h1>Admin Dashboard</h1>
                <p>High-level operational view for moderation and platform control.</p>
            </header>

            <article className={styles.panel}>
                <h2>Overview</h2>
                {loading ? <p>Loading...</p> : null}
                {error ? <p>{error}</p> : null}
                {!loading && !error ? (
                    <ul className={styles.list}>
                        {overview.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                ) : null}
            </article>

            <article className={styles.panel}>
                <h2>Recent Verification Activity</h2>
                {loading ? <p>Loading...</p> : null}
                {!loading && !error && recent.length === 0 ? <p>No verification submissions yet.</p> : null}
                {!loading && !error && recent.length > 0 ? (
                    <ul className={styles.list}>
                        {recent.map((item) => {
                            const caregiver = item?.caregiverName || item?.caregiverEmail || item?.caregiverId || item?.caregiverKey || "Caregiver";
                            return (
                                <li key={item?.id || `${caregiver}-${item?.submittedAt || ""}`}>
                                    {typeLabel(item?.verificationType)} submitted by {caregiver} at {formatDateTime(item?.submittedAt)}
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            </article>
        </section>
    );
}
