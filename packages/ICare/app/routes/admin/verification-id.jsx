import { Link, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import {
    getAdminVerificationDetail,
    isAbortError,
    updateAdminVerificationStatus
} from "./admin-verifications-api-client";

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

export default function VerificationId() {
    const params = useParams();
    const verificationId = String(params.verificationId || "").trim();

    const [item, setItem] = useState(null);
    const [onboarding, setOnboarding] = useState(null);
    const [reviewNotes, setReviewNotes] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    const loadDetails = useCallback(async (signal) => {
        if (!verificationId) {
            setError("Missing verificationId in route.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const payload = await getAdminVerificationDetail(verificationId, { signal });
            setItem(payload?.item || null);
            setOnboarding(payload?.onboarding || null);
            setReviewNotes(String(payload?.item?.reviewNotes || ""));
        } catch (loadError) {
            if (isAbortError(loadError) || signal?.aborted) {
                return;
            }
            setError(loadError instanceof Error ? loadError.message : "Could not load verification detail.");
        } finally {
            setLoading(false);
        }
    }, [verificationId]);

    useEffect(() => {
        const controller = new AbortController();
        loadDetails(controller.signal);
        return () => {
            controller.abort();
        };
    }, [loadDetails]);

    async function handleReview(status) {
        if (!verificationId) {
            return;
        }

        setActionLoading(true);
        setError("");

        try {
            await updateAdminVerificationStatus(verificationId, {
                status,
                reviewNotes
            });
            await loadDetails(undefined);
        } catch (reviewError) {
            setError(reviewError instanceof Error ? reviewError.message : "Could not update verification status.");
        } finally {
            setActionLoading(false);
        }
    }

    const status = String(item?.status || "").toLowerCase();
    const isPending = status === "pending";

    return (
        <section>
            <h1>Verification Detail</h1>
            <p><Link to="/admin/verifications">Back to verification queue</Link></p>

            {loading ? <p>Loading verification...</p> : null}
            {error ? <p>{error}</p> : null}

            {!loading && !error && item ? (
                <>
                    <article style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px", marginBottom: "14px" }}>
                        <h2 style={{ marginTop: 0 }}>Queue Item #{item.id || "-"}</h2>
                        <p>Type: {item.verificationType || "-"}</p>
                        <p>Status: {item.status || "-"}</p>
                        <p>Caregiver: {item.caregiverName || item.caregiverEmail || item.caregiverId || "-"}</p>
                        <p>Submitted: {formatDateTime(item.submittedAt)}</p>
                        <p>Reviewed: {formatDateTime(item.reviewedAt)}</p>
                    </article>

                    <article style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px", marginBottom: "14px" }}>
                        <h2 style={{ marginTop: 0 }}>Submitted Payload</h2>
                        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>{JSON.stringify(item.payload || {}, null, 2)}</pre>
                    </article>

                    <article style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px", marginBottom: "14px" }}>
                        <h2 style={{ marginTop: 0 }}>Onboarding Snapshot</h2>
                        <p>Identity: {onboarding?.identity?.status || "-"}</p>
                        <p>Right to Work: {onboarding?.rightToWork?.status || "-"}</p>
                        <p>DBS: {onboarding?.dbs?.status || "-"}</p>
                        <p>Payout: {onboarding?.payout?.status || "-"}</p>
                    </article>

                    <article style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px" }}>
                        <h2 style={{ marginTop: 0 }}>Review Decision</h2>
                        <textarea
                            value={reviewNotes}
                            onChange={(event) => setReviewNotes(event.target.value)}
                            placeholder="Optional review notes"
                            rows={4}
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                        />
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <button
                                type="button"
                                disabled={!isPending || actionLoading}
                                onClick={() => handleReview("approved")}
                                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #16a34a", background: "#16a34a", color: "#fff" }}
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                disabled={!isPending || actionLoading}
                                onClick={() => handleReview("rejected")}
                                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #dc2626", background: "#dc2626", color: "#fff" }}
                            >
                                Reject
                            </button>
                            {!isPending ? <p style={{ margin: 0, color: "#475569" }}>This verification is already reviewed.</p> : null}
                        </div>
                    </article>
                </>
            ) : null}
        </section>
    );
}
