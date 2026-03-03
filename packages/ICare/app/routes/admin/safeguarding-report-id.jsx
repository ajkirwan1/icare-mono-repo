import { Link, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
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

export default function SafeguardingReportId() {
    const params = useParams();
    const reportId = String(params.reportId || "").trim();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadReports() {
            setLoading(true);
            setError("");

            try {
                const payload = await getAdminReportedIssues({ limit: 200, signal: controller.signal });
                setItems(Array.isArray(payload?.items) ? payload.items : []);
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load safeguarding report.");
            } finally {
                setLoading(false);
            }
        }

        loadReports();
        return () => {
            controller.abort();
        };
    }, []);

    const report = useMemo(
        () => items.find((item) => String(item?.id || "") === reportId),
        [items, reportId]
    );

    return (
        <section>
            <h1>Safeguarding Report</h1>
            <p><Link to="/admin/safegaurding">Back to safeguarding queue</Link></p>

            {loading ? <p>Loading report...</p> : null}
            {error ? <p>{error}</p> : null}
            {!loading && !error && !report ? <p>Report not found for ID: {reportId || "-"}</p> : null}

            {!loading && !error && report ? (
                <article style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px" }}>
                    <p><strong>ID:</strong> {report.id}</p>
                    <p><strong>Severity:</strong> {report.severity}</p>
                    <p><strong>Source:</strong> {report.source}</p>
                    <p><strong>Status:</strong> {report.status}</p>
                    <p><strong>Title:</strong> {report.title}</p>
                    <p><strong>Description:</strong> {report.description || "-"}</p>
                    <p><strong>Created:</strong> {formatDateTime(report.createdAt)}</p>
                </article>
            ) : null}
        </section>
    );
}
