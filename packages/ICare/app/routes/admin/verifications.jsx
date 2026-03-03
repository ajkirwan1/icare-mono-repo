import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { getAdminVerificationQueue, isAbortError } from "./admin-verifications-api-client";
import styles from "./verifications.module.scss";

const TYPE_OPTIONS = [
    { value: "", label: "All types" },
    { value: "right_to_work", label: "Right to Work" },
    { value: "identity", label: "Identity" },
    { value: "dbs", label: "DBS" }
];

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" }
];

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
    return "Unknown";
}

function formatDateTime(value) {
    if (!value) {
        return "-";
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(parsed);
}

function queueStatusClass(status) {
    const normalized = String(status || "").trim().toLowerCase();
    if (normalized === "approved") {
        return styles.statusApproved;
    }
    if (normalized === "rejected") {
        return styles.statusRejected;
    }
    return styles.statusPending;
}

export default function AdminVerifications() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("pending");

    useEffect(() => {
        const controller = new AbortController();

        async function loadQueue() {
            setLoading(true);
            setError("");

            try {
                const payload = await getAdminVerificationQueue({
                    type: typeFilter,
                    status: statusFilter,
                    limit: 100,
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
    }, [typeFilter, statusFilter]);

    const queueCount = useMemo(() => items.length, [items]);

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h1>Verification Queue</h1>
                <p>Submissions from caregiver onboarding are listed here for admin review.</p>
            </header>

            <div className={styles.filters}>
                <label className={styles.filterField}>
                    <span>Type</span>
                    <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                        {TYPE_OPTIONS.map((option) => (
                            <option key={option.value || "all"} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className={styles.filterField}>
                    <span>Status</span>
                    <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>

                <div className={styles.countPill}>
                    {queueCount} item{queueCount === 1 ? "" : "s"}
                </div>
            </div>

            {loading ? <p className={styles.info}>Loading queue...</p> : null}
            {error ? <p className={styles.error} role="alert">{error}</p> : null}
            {!loading && !error && items.length === 0 ? (
                <p className={styles.info}>No verification submissions for current filters.</p>
            ) : null}

            {!loading && !error && items.length > 0 ? (
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Submitted</th>
                                <th>Type</th>
                                <th>Caregiver</th>
                                <th>Details</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                const payload = item?.payload || {};
                                const caregiverLabel = item?.caregiverName || item?.caregiverEmail || item?.caregiverId || item?.caregiverKey || "-";
                                const method = String(payload.method || "").trim();
                                const fileName = String(payload.fileName || "").trim();
                                const fileSize = Number(payload.fileSize || 0);

                                return (
                                    <tr key={item?.id || `${item?.caregiverKey || "caregiver"}-${item?.verificationType || "type"}`}>
                                        <td>{formatDateTime(item?.submittedAt)}</td>
                                        <td>
                                            {item?.id ? (
                                                <Link to={`/admin/verifications/${item.id}`}>
                                                    {typeLabel(item?.verificationType)}
                                                </Link>
                                            ) : typeLabel(item?.verificationType)}
                                        </td>
                                        <td>{caregiverLabel}</td>
                                        <td>
                                            <div className={styles.detailsCell}>
                                                {method ? <span>Method: {method}</span> : <span>Method: -</span>}
                                                {fileName ? <span>File: {fileName}</span> : <span>File: -</span>}
                                                {fileSize > 0 ? <span>Size: {Math.round(fileSize / 1024)} KB</span> : <span>Size: -</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.statusPill} ${queueStatusClass(item?.status)}`}>
                                                {String(item?.status || "pending")}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </section>
    );
}
