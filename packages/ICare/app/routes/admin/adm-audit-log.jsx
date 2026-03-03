import { useEffect, useState } from "react";
import styles from "./admin-static-screen.module.scss";
import { getAdminAuditLog, isAbortError } from "./admin-verifications-api-client";

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

export default function AdminAuditLog() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadAuditLog() {
            setLoading(true);
            setError("");

            try {
                const payload = await getAdminAuditLog({ limit: 150, signal: controller.signal });
                setItems(Array.isArray(payload?.items) ? payload.items : []);
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load audit log.");
            } finally {
                setLoading(false);
            }
        }

        loadAuditLog();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h1>Audit Log</h1>
                <p>Recent operational events based on real platform activity.</p>
            </header>

            <article className={styles.panel}>
                <h2>Recent Events</h2>
                {loading ? <p>Loading...</p> : null}
                {error ? <p>{error}</p> : null}
                {!loading && !error && items.length === 0 ? <p>No events found.</p> : null}
                {!loading && !error && items.length > 0 ? (
                    <ul className={styles.list}>
                        {items.map((item) => (
                            <li key={item?.id || `${item?.eventType || "event"}-${item?.createdAt || ""}`}>
                                <strong>{String(item?.eventType || "event").replace(/_/g, " ")}</strong>: {item?.message || "-"} ({formatDateTime(item?.createdAt)})
                            </li>
                        ))}
                    </ul>
                ) : null}
            </article>
        </section>
    );
}
