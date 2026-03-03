import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./admin-static-screen.module.scss";
import { getAdminVerificationQueue, isAbortError } from "./admin-verifications-api-client";

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

export default function AdminVerificationQueue() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadQueue() {
            setLoading(true);
            setError("");
            try {
                const payload = await getAdminVerificationQueue({
                    status: "pending",
                    limit: 200,
                    signal: controller.signal
                });
                setItems(Array.isArray(payload?.items) ? payload.items : []);
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load verification queue.");
            } finally {
                setLoading(false);
            }
        }

        loadQueue();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h1>Verification Queue</h1>
                <p>Pending caregiver verification submissions awaiting admin review.</p>
            </header>

            <article className={styles.panel}>
                <h2>Pending Items</h2>
                {loading ? <p>Loading...</p> : null}
                {error ? <p>{error}</p> : null}
                {!loading && !error && items.length === 0 ? <p>No pending verification submissions.</p> : null}
                {!loading && !error && items.length > 0 ? (
                    <ul className={styles.list}>
                        {items.map((item) => {
                            const caregiver = item?.caregiverName || item?.caregiverEmail || item?.caregiverId || item?.caregiverKey || "Caregiver";
                            return (
                                <li key={item?.id || `${caregiver}-${item?.submittedAt || ""}`}>
                                    {item?.id ? <Link to={`/admin/verifications/${item.id}`}>{typeLabel(item?.verificationType)}</Link> : typeLabel(item?.verificationType)} - {caregiver} - submitted {formatDateTime(item?.submittedAt)}
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            </article>
        </section>
    );
}
