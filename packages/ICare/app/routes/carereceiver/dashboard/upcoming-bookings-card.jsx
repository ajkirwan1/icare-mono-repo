import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import styles from "../carereceiver-dashboard.module.scss";
import { getUpcomingBookings } from "./dashboard-api-client";

function statusLabel(status) {
    if (status === "in_progress") {
        return "In Progress";
    }

    return "Confirmed";
}

export default function UpcomingBookingsCard() {
    const [state, setState] = useState({ loading: true, bookings: [], totalCount: 0, error: "" });

    const loadCard = useCallback(async (signal) => {
        setState((prev) => ({ ...prev, loading: true, error: "" }));
        const result = await getUpcomingBookings({ signal });
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

    const headerLabel = useMemo(() => {
        const count = state.totalCount || state.bookings.length;
        return `View all ${count} →`;
    }, [state.bookings.length, state.totalCount]);

    return (
        <section className={`${styles.card} ${styles.blackTitleCard}`.trim()}>
            <div className={styles.sectionHead}>
                <h2>Upcoming Bookings</h2>
                <Link to="/carereceiver/bookings?tab=upcoming" className={styles.viewAllLink}>{headerLabel}</Link>
            </div>
            <p className={styles.sectionSubTitle}>Next 7 days</p>

            {state.error ? <p className={styles.cardError}>{state.error}</p> : null}

            <div className={styles.list}>
                {state.loading ? (
                    <>
                        <article className={`${styles.bookingItem} ${styles.skeletonItem}`.trim()} aria-hidden="true" />
                        <article className={`${styles.bookingItem} ${styles.skeletonItem}`.trim()} aria-hidden="true" />
                    </>
                ) : null}

                {!state.loading && state.bookings.length === 0 ? (
                    <div className={styles.cardMessage}>
                        <p className={styles.cardEmpty}>No upcoming bookings.</p>
                        <Link className={styles.detailsAction} to="/carereceiver/search">Find a Caregiver</Link>
                    </div>
                ) : null}

                {!state.loading ? state.bookings.map((booking) => (
                    <article key={booking.id} className={styles.bookingItem}>
                        <div className={styles.avatar}>
                            <img src={booking.caregiverPhotoUrl} alt={booking.caregiverName} />
                        </div>

                        <div className={styles.meta}>
                            <p>{booking.caregiverName}</p>
                            <small>{booking.dateLabel}</small>
                            <span className={booking.status === "in_progress" ? styles.inProgress : styles.confirmed}>
                                {statusLabel(booking.status)}
                            </span>
                        </div>

                        <div className={styles.rowActions}>
                            <Link className={styles.detailsAction} to={`/carereceiver/bookings/${booking.id}`}>
                                View Details
                            </Link>

                            {booking.conversationId ? (
                                <Link className={styles.secondaryActionLink} to={`/carereceiver/messages/${booking.conversationId}`}>
                                    Message Caregiver
                                </Link>
                            ) : (
                                <Link className={styles.secondaryActionLink} to={`/carereceiver/bookings/${booking.id}`}>
                                    View Booking
                                </Link>
                            )}
                        </div>
                    </article>
                )) : null}
            </div>
        </section>
    );
}
