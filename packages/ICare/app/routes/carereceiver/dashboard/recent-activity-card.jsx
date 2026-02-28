import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "../carereceiver-dashboard.module.scss";
import { getRecentActivity } from "./dashboard-api-client";

export default function RecentActivityCard() {
    const [state, setState] = useState({ loading: true, items: [], error: "" });

    const loadCard = useCallback(async (signal) => {
        setState((prev) => ({ ...prev, loading: true, error: "" }));
        const result = await getRecentActivity({ signal });
        setState({
            loading: false,
            items: result.items || [],
            error: ""
        });
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function initLoad() {
            try {
                await loadCard(controller.signal);
            } catch {
                if (mounted) {
                    setState((prev) => ({ ...prev, loading: false }));
                }
            }
        }

        initLoad();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [loadCard]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return undefined;
        }

        const onBookingStatusChanged = () => {
            loadCard();
        };

        window.addEventListener("carereceiver:booking_status_changed", onBookingStatusChanged);
        return () => window.removeEventListener("carereceiver:booking_status_changed", onBookingStatusChanged);
    }, [loadCard]);

    return (
        <section className={`${styles.card} ${styles.blackTitleCard}`.trim()}>
            <h2>Recent Activity</h2>

            {state.error ? <p className={styles.cardError}>{state.error}</p> : null}

            <div className={styles.activityList}>
                {state.loading ? (
                    <>
                        <div className={styles.skeletonActivity} aria-hidden="true" />
                        <div className={styles.skeletonActivity} aria-hidden="true" />
                    </>
                ) : null}

                {!state.loading && state.items.length === 0 ? (
                    <p className={styles.cardEmpty}>No recent activity.</p>
                ) : null}

                {!state.loading ? state.items.map((item) => (
                    <div key={item.id} className={styles.activityItem}>
                        <div>
                            <p className={styles.activityText}>{item.text}</p>
                            <small className={styles.activityTime}>{item.time}</small>
                        </div>
                        <Link to={item.to} className={styles.activityAction}>{item.actionLabel} →</Link>
                    </div>
                )) : null}
            </div>
        </section>
    );
}
