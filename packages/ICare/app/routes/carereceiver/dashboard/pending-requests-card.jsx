import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import styles from "../carereceiver-dashboard.module.scss";
import { cancelBookingRequest, getPendingBookingRequests } from "./dashboard-api-client";

function countdownLabel(deadlineIso, minuteTick) {
    void minuteTick;
    if (!deadlineIso) {
        return "Awaiting response";
    }

    const deadline = new Date(deadlineIso).getTime();
    if (!Number.isFinite(deadline)) {
        return "Awaiting response";
    }

    const hours = Math.max(0, Math.ceil((deadline - Date.now()) / 3600000));
    if (hours === 0) {
        return "Response window ending soon";
    }

    return `${hours} hour${hours === 1 ? "" : "s"} remaining`;
}

export default function PendingRequestsCard() {
    const [state, setState] = useState({ loading: true, bookings: [], totalCount: 0, error: "" });
    const [cancellingId, setCancellingId] = useState("");
    const [minuteTick, setMinuteTick] = useState(0);

    const loadCard = useCallback(async (signal) => {
        setState((prev) => ({ ...prev, loading: true, error: "" }));
        const result = await getPendingBookingRequests({ signal });
        setState({
            loading: false,
            bookings: result.bookings || [],
            totalCount: Number(result.totalCount || 0),
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

    useEffect(() => {
        const timer = setInterval(() => setMinuteTick((tick) => tick + 1), 60000);
        return () => clearInterval(timer);
    }, []);

    const headerLabel = useMemo(() => {
        const count = state.totalCount || state.bookings.length;
        return `View all ${count} →`;
    }, [state.bookings.length, state.totalCount]);

    async function handleCancelRequest(bookingId) {
        const approved = window.confirm("Cancel this booking request?");
        if (!approved) {
            return;
        }

        setCancellingId(bookingId);
        try {
            await cancelBookingRequest(bookingId);
            setState((prev) => ({
                ...prev,
                bookings: prev.bookings.filter((booking) => booking.id !== bookingId),
                totalCount: Math.max(0, prev.totalCount - 1)
            }));
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error?.message || "Could not cancel request. Try again."
            }));
        } finally {
            setCancellingId("");
        }
    }

    return (
        <section className={`${styles.card} ${styles.blackTitleCard}`.trim()}>
            <div className={styles.sectionHead}>
                <div className={styles.sectionTitleWrap}>
                    <span className={styles.sectionCount}>{state.totalCount || state.bookings.length}</span>
                    <h2>Pending Requests</h2>
                </div>
                <Link to="/carereceiver/bookings?tab=pending" className={styles.viewAllLink}>{headerLabel}</Link>
            </div>
            <p className={styles.sectionSubTitle}>Awaiting caregiver response</p>

            {state.error ? <p className={styles.cardError}>{state.error}</p> : null}

            <div className={styles.list}>
                {state.loading ? (
                    <>
                        <article className={`${styles.bookingItem} ${styles.skeletonItem}`.trim()} aria-hidden="true" />
                        <article className={`${styles.bookingItem} ${styles.skeletonItem}`.trim()} aria-hidden="true" />
                    </>
                ) : null}

                {!state.loading && state.bookings.length === 0 ? (
                    <p className={styles.cardEmpty}>No pending requests.</p>
                ) : null}

                {!state.loading ? state.bookings.map((booking) => (
                    <article key={booking.id} className={styles.bookingItem}>
                        <div className={styles.avatar}>
                            <img src={booking.caregiverPhotoUrl} alt={booking.caregiverName} />
                        </div>

                        <div className={styles.meta}>
                            <p>{booking.caregiverName}</p>
                            <small>{booking.dateLabel}</small>
                            <span className={styles.requested}>Awaiting response</span>
                            <p className={styles.countdownText}>{countdownLabel(booking.responseDeadline, minuteTick)}</p>
                        </div>

                        <div className={styles.rowActions}>
                            <Link className={styles.detailsAction} to={`/carereceiver/bookings/${booking.id}`}>
                                View Details
                            </Link>
                            <button
                                className={styles.secondaryAction}
                                disabled={cancellingId === booking.id}
                                onClick={() => handleCancelRequest(booking.id)}
                                type="button"
                            >
                                {cancellingId === booking.id ? "Cancelling..." : "Cancel Request"}
                            </button>
                        </div>
                    </article>
                )) : null}
            </div>
        </section>
    );
}
