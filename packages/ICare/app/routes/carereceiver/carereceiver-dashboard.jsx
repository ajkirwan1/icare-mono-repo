import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import styles from "./carereceiver-dashboard.module.scss";

import { MdOutlineSearch, MdOutlineCalendarMonth, MdOutlineChatBubbleOutline, MdOutlineRateReview } from "react-icons/md";
import PendingRequestsCard from "./dashboard/pending-requests-card";
import UpcomingBookingsCard from "./dashboard/upcoming-bookings-card";
import RecentActivityCard from "./dashboard/recent-activity-card";
import { getCurrentUserProfile, getPaymentMethodStatus, getUnreadMessagesCount } from "./dashboard/dashboard-api-client";

function formatTime(date) {
    return new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}

export default function CarereceiverDashboard() {
    const [profile, setProfile] = useState({ loading: true, firstName: "", accountStatus: "active" });
    const [payment, setPayment] = useState({ loading: true, paymentMethodMissing: false });
    const [messages, setMessages] = useState({ loading: true, unreadCount: 0 });

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadProfile() {
            const result = await getCurrentUserProfile({ signal: controller.signal });
            if (mounted) {
                setProfile({
                    loading: false,
                    firstName: result.firstName || "",
                    accountStatus: result.accountStatus || "active"
                });
            }
        }

        loadProfile();
        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadPaymentStatus() {
            const result = await getPaymentMethodStatus({ signal: controller.signal });
            if (mounted) {
                setPayment({
                    loading: false,
                    paymentMethodMissing: Boolean(result.paymentMethodMissing)
                });
            }
        }

        loadPaymentStatus();
        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        async function loadUnreadCount() {
            const result = await getUnreadMessagesCount({ signal: controller.signal });
            if (mounted) {
                setMessages({
                    loading: false,
                    unreadCount: Number(result.unreadCount || 0)
                });
            }
        }

        loadUnreadCount();
        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return undefined;
        }

        const onNewMessage = (event) => {
            const detail = event?.detail || {};
            const explicitTotal = Number(
                detail?.unreadCountTotal ??
                detail?.totalUnreadCount ??
                detail?.unreadCount ??
                NaN
            );

            setMessages((current) => ({
                loading: false,
                unreadCount: Number.isFinite(explicitTotal) ? explicitTotal : current.unreadCount + 1
            }));
        };

        window.addEventListener("carereceiver:new_message", onNewMessage);
        return () => window.removeEventListener("carereceiver:new_message", onNewMessage);
    }, []);

    const lastUpdated = useMemo(() => formatTime(new Date()), []);
    const unreadCount = messages.unreadCount;

    return (
        <div className={styles.page}>
            <div className={styles.shell}>
                <header className={styles.header}>
                    <h1>{profile.firstName ? `Welcome back, ${profile.firstName}` : "Welcome back"}</h1>
                    <p>Last updated: Today at {lastUpdated}</p>
                </header>

                {!profile.loading && profile.accountStatus !== "active" ? (
                    <section className={styles.alertBanner}>
                        <span className={styles.alertIcon}>!</span>
                        <div>
                            <p className={styles.alertTitle}>Your account status is: {profile.accountStatus}</p>
                            <p className={styles.alertSub}>Some actions may be limited until your account is fully active.</p>
                        </div>
                    </section>
                ) : null}

                {!payment.loading && payment.paymentMethodMissing ? (
                    <section className={styles.alertBanner}>
                        <span className={styles.alertIcon}>!</span>
                        <div>
                            <p className={styles.alertTitle}>Add a payment method to request bookings</p>
                            <p className={styles.alertSub}>You'll need to add a card before you can book caregivers</p>
                            <Link to="/carereceiver/settings/payment" className={styles.alertCta}>
                                Add Payment Method
                            </Link>
                        </div>
                    </section>
                ) : null}

                <div className={styles.quickActionRow}>
                    <Link to="/carereceiver/search" className={`${styles.ctaCard} ${styles.ctaPrimary}`}>
                        <div className={styles.ctaIcon}><MdOutlineSearch /></div>
                        <p className={styles.ctaTitle}>Find a Caregiver</p>
                        <span className={styles.ctaButton}>Search Now</span>
                    </Link>

                    <Link to="/carereceiver/bookings" className={`${styles.ctaCard} ${styles.ctaSecondary}`}>
                        <div className={styles.ctaIcon}><MdOutlineCalendarMonth /></div>
                        <p className={styles.ctaTitle}>View All Bookings</p>
                        <span className={styles.ctaButton}>View Bookings</span>
                    </Link>

                    <Link to="/carereceiver/messages" className={`${styles.ctaCard} ${styles.ctaSecondary}`}>
                        <div className={styles.ctaIcon}><MdOutlineChatBubbleOutline /></div>
                        <p className={styles.ctaTitle}>
                            Messages
                            {!messages.loading && unreadCount > 0 ? <span className={styles.ctaBadge}>{unreadCount}</span> : null}
                        </p>
                        <span className={styles.ctaButton}>View Messages</span>
                    </Link>

                    <Link to="/carereceiver/bookings/bk-2026-1203/review" className={`${styles.ctaCard} ${styles.ctaReview}`}>
                        <div className={styles.ctaIcon}><MdOutlineRateReview /></div>
                        <p className={styles.ctaTitle}>Leave a Review</p>
                        <span className={styles.ctaButton}>Review a Caregiver</span>
                    </Link>
                </div>

                <PendingRequestsCard />
                <UpcomingBookingsCard />
                <RecentActivityCard />
            </div>
        </div>
    );
}
