import { useEffect, useMemo, useState } from "react";
import Card from "~/components/application/data-display/card/card";
import styles from "./admin-dashboard.module.scss";
import { getAdminVerificationQueue, isAbortError } from "./admin-verifications-api-client";

const footerLinks = [
    { to: "/admin/verifications", label: "Review queue" }
];

function verificationLabel(type) {
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

    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(parsed);
}

function getAverageWaitHours(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return 0;
    }

    const nowMs = Date.now();
    const deltas = items
        .map((item) => new Date(item?.submittedAt || "").getTime())
        .filter((ts) => Number.isFinite(ts) && ts > 0)
        .map((ts) => Math.max(0, (nowMs - ts) / (1000 * 60 * 60)));

    if (deltas.length === 0) {
        return 0;
    }

    const total = deltas.reduce((sum, value) => sum + value, 0);
    return total / deltas.length;
}

function queueSlaClass(avgWaitHours) {
    if (avgWaitHours >= 24) {
        return styles.breached;
    }
    if (avgWaitHours >= 6) {
        return styles.warning;
    }
    return styles.healthy;
}

function queueSlaLabel(avgWaitHours) {
    if (avgWaitHours >= 24) {
        return "SLA Breached";
    }
    if (avgWaitHours >= 6) {
        return "SLA Warning";
    }
    return "SLA Healthy";
}

export default function AdminDashboard() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadPendingQueue() {
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

        loadPendingQueue();

        return () => {
            controller.abort();
        };
    }, []);

    const pendingCount = items.length;
    const pendingIdentity = useMemo(
        () => items.filter((item) => String(item?.verificationType || "").toLowerCase() === "identity").length,
        [items]
    );
    const pendingRightToWork = useMemo(
        () => items.filter((item) => String(item?.verificationType || "").toLowerCase() === "right_to_work").length,
        [items]
    );
    const pendingDbs = useMemo(
        () => items.filter((item) => String(item?.verificationType || "").toLowerCase() === "dbs").length,
        [items]
    );
    const averageWaitHours = useMemo(() => getAverageWaitHours(items), [items]);
    const recentItems = useMemo(() => items.slice(0, 5), [items]);

    return (
        <div className={styles.grid}>
            <div className={styles.leftColumn}>
                <Card
                    title={"Verification Queue"}
                    subtitle={"Live data from caregiver submissions"}
                    cta={"Review Now"}
                    footerLinks={footerLinks}
                >
                    <div className={styles.container}>
                        {loading ? <p className={styles.infoText}>Loading queue...</p> : null}
                        {error ? <p className={styles.errorText}>{error}</p> : null}
                        {!loading && !error ? (
                            <div>
                                <dl className={styles.statsList}>
                                    <dt>Pending verifications:</dt>
                                    <dd>{pendingCount}</dd>
                                    <dt>Identity:</dt>
                                    <dd>{pendingIdentity}</dd>
                                    <dt>Right to Work:</dt>
                                    <dd>{pendingRightToWork}</dd>
                                    <dt>DBS (voluntary):</dt>
                                    <dd>{pendingDbs}</dd>
                                </dl>
                            </div>
                        ) : null}

                        {!loading && !error ? (
                            <div>
                                <div className={`${styles.slaStatus} ${queueSlaClass(averageWaitHours)}`}>
                                    {queueSlaLabel(averageWaitHours)}
                                </div>
                                <dl className={styles.statsList}>
                                    <dt>Average wait time:</dt>
                                    <dd>{averageWaitHours.toFixed(1)} hours</dd>
                                </dl>
                            </div>
                        ) : null}
                    </div>
                </Card>

                <Card title={"Recent Verification Activity"} subtitle={"Latest pending submissions"}>
                    <div className={styles.container}>
                        {loading ? <p className={styles.infoText}>Loading activity...</p> : null}
                        {error ? <p className={styles.errorText}>Activity unavailable.</p> : null}
                        {!loading && !error && recentItems.length === 0 ? (
                            <p className={styles.infoText}>No pending verification submissions.</p>
                        ) : null}
                        {!loading && !error && recentItems.length > 0 ? (
                            <ol className={styles.timeline}>
                                {recentItems.map((item) => {
                                    const type = verificationLabel(item?.verificationType);
                                    const caregiver = item?.caregiverName || item?.caregiverEmail || item?.caregiverId || item?.caregiverKey || "caregiver";

                                    return (
                                        <li key={item?.id || `${caregiver}-${type}`}>
                                            <span className={styles.timelineDot} />
                                            <div>
                                                <p className={styles.timelineText}>
                                                    {type} verification submitted by <strong>{caregiver}</strong>
                                                </p>
                                                <time className={styles.timelineTime}>{formatDateTime(item?.submittedAt)}</time>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        ) : null}
                    </div>
                </Card>
            </div>

            <div className={styles.rightColumn}>
                <Card title={"Safeguarding Reports"} subtitle={"Live feed"}>
                    <p className={styles.infoText}>No safeguarding data source connected yet.</p>
                </Card>
                <Card title={"Platform Overview"} subtitle={"Live feed"}>
                    <p className={styles.infoText}>No platform metrics data source connected yet.</p>
                </Card>
                <Card title={"Bookings"} subtitle={"Live feed"}>
                    <p className={styles.infoText}>No bookings metrics data source connected yet.</p>
                </Card>
            </div>
        </div>
    );
}
