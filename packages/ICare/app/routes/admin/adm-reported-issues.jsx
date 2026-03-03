import { useEffect, useState } from "react";
import styles from "./admin-static-screen.module.scss";
import { getAdminReportedIssues, isAbortError } from "./admin-verifications-api-client";

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

const SOURCE_OPTIONS = [
    { value: "", label: "All" },
    { value: "moderation_event", label: "Moderation Event" },
    { value: "flagged_message", label: "Flagged Message" },
    { value: "low_rating", label: "Low Rating" }
];

export default function AdminReportedIssues({
    title = "Reported Issues",
    description = "Consolidated queue from moderation events, flagged messages and low ratings.",
    fixedSource = "",
    fixedSeverity = ""
} = {}) {
    const [severity, setSeverity] = useState(fixedSeverity || "");
    const [source, setSource] = useState(fixedSource || "");
    const [items, setItems] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const effectiveSeverity = fixedSeverity || severity;
    const effectiveSource = fixedSource || source;

    useEffect(() => {
        setSeverity(fixedSeverity || "");
    }, [fixedSeverity]);

    useEffect(() => {
        setSource(fixedSource || "");
    }, [fixedSource]);

    useEffect(() => {
        const controller = new AbortController();

        async function loadIssues() {
            setLoading(true);
            setError("");

            try {
                const payload = await getAdminReportedIssues({
                    severity: effectiveSeverity,
                    source: effectiveSource,
                    limit: 120,
                    signal: controller.signal
                });
                setItems(Array.isArray(payload?.items) ? payload.items : []);
                setSummary(payload?.summary || null);
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load reported issues.");
            } finally {
                setLoading(false);
            }
        }

        loadIssues();

        return () => {
            controller.abort();
        };
    }, [effectiveSeverity, effectiveSource]);

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h1>{title}</h1>
                <p>{description}</p>
            </header>

            <article className={styles.panel}>
                <h2>Filters</h2>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
                    {!fixedSeverity ? (
                        <label>
                            Severity{" "}
                            <select value={severity} onChange={(event) => setSeverity(event.target.value)} style={{ padding: "8px 10px" }}>
                                <option value="">All</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </label>
                    ) : null}
                    {!fixedSource ? (
                        <label>
                            Source{" "}
                            <select value={source} onChange={(event) => setSource(event.target.value)} style={{ padding: "8px 10px" }}>
                                {SOURCE_OPTIONS.map((option) => (
                                    <option key={option.value || "all"} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </label>
                    ) : (
                        <p style={{ margin: 0, color: "#475569" }}>Source filter fixed: <strong>{fixedSource}</strong></p>
                    )}
                </div>
                {summary ? (
                    <p style={{ marginTop: "10px", color: "#475569" }}>
                        Total: {Number(summary?.total || 0)}, Critical: {Number(summary?.bySeverity?.critical || 0)}, High: {Number(summary?.bySeverity?.high || 0)}
                    </p>
                ) : null}
            </article>

            <article className={styles.panel}>
                <h2>Open Issues</h2>
                {loading ? <p>Loading...</p> : null}
                {error ? <p>{error}</p> : null}
                {!loading && !error && items.length === 0 ? <p>No issues found.</p> : null}
                {!loading && !error && items.length > 0 ? (
                    <ul className={styles.list}>
                        {items.map((item) => (
                            <li key={item?.id || `${item?.source || "issue"}-${item?.createdAt || ""}`}>
                                <strong>{String(item?.severity || "medium").toUpperCase()}</strong> [{item?.source || "-"}] {item?.title || "-"}
                                <br />
                                {item?.description || "-"}
                                <br />
                                <small>{formatDateTime(item?.createdAt)}</small>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </article>
        </section>
    );
}
