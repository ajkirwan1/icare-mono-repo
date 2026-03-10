import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStripe } from "@fortawesome/free-brands-svg-icons";
import { DashboardShell, StatusPill } from "~/components/application/kasia";
import {
    createCaregiverConnectAccount,
    getCaregiverPayoutSetup,
    getCaregiverStripeDashboardLink,
    saveCaregiverPayoutAccount
} from "./caregiver-onboarding-api-client";
import styles from "./caregiver-payout-setup.module.scss";

function formatMoney(value) {
    const numeric = Number(value || 0);
    if (!Number.isFinite(numeric)) {
        return "GBP 0.00";
    }

    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numeric);
}

function formatPayoutDate(value) {
    if (!value) {
        return "No payouts scheduled";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "No payouts scheduled";
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(date);
}

function payoutStatusMeta(status) {
    const normalized = String(status || "").trim().toLowerCase();

    if (normalized === "connected") {
        return {
            label: "Connected",
            variant: "confirmed",
            helper: "Your payout account is connected and ready."
        };
    }

    if (normalized === "pending") {
        return {
            label: "Pending",
            variant: "pending",
            helper: "Finish Stripe onboarding to receive payouts."
        };
    }

    return {
        label: "Not Connected",
        variant: "info",
        helper: "Set up payouts to receive earnings."
    };
}

export default function CaregiverPayoutSetup() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [busyAction, setBusyAction] = useState("");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [data, setData] = useState({
        caregiver: { id: "", email: "" },
        payout: {
            status: "not_connected",
            stripeAccountId: "",
            payoutsEnabled: false,
            chargesEnabled: false
        },
        earnings: {
            totalEarned: 0,
            pendingPayouts: 0,
            nextPayoutDate: null
        },
        platformFeePercent: 15
    });

    const loadPayoutSetup = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const payload = await getCaregiverPayoutSetup();
            setData((prev) => ({ ...prev, ...payload }));
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Could not load payout setup.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPayoutSetup();
    }, [loadPayoutSetup]);

    useEffect(() => {
        const status = String(searchParams.get("status") || "").trim().toLowerCase();
        const accountId = String(searchParams.get("account") || "").trim();

        if (status !== "connect-return" || !accountId) {
            return;
        }

        let cancelled = false;

        async function syncAccount() {
            setBusyAction("sync-account");
            setError("");

            try {
                await saveCaregiverPayoutAccount({
                    accountId,
                    payoutStatus: "pending"
                });

                if (!cancelled) {
                    setNotice("Stripe onboarding returned successfully. Account status has been saved.");
                    await loadPayoutSetup();
                }
            } catch (syncError) {
                if (!cancelled) {
                    setError(syncError instanceof Error ? syncError.message : "Could not save payout account.");
                }
            } finally {
                if (!cancelled) {
                    setBusyAction("");
                }
            }
        }

        syncAccount();

        return () => {
            cancelled = true;
        };
    }, [loadPayoutSetup, searchParams]);

    const statusMeta = useMemo(() => payoutStatusMeta(data?.payout?.status), [data?.payout?.status]);

    async function handleSetupPayouts() {
        setBusyAction("setup");
        setError("");
        setNotice("");

        try {
            const connectPayload = await createCaregiverConnectAccount({
                email: data?.caregiver?.email || undefined,
                country: "GB",
                metadata: {
                    role: "caregiver",
                    caregiverId: data?.caregiver?.id || ""
                }
            });

            const accountId = String(connectPayload?.accountId || "").trim();
            if (!accountId) {
                throw new Error("Stripe did not return account id.");
            }

            await saveCaregiverPayoutAccount({
                accountId,
                payoutStatus: "pending"
            });

            const onboardingUrl = String(connectPayload?.onboardingUrl || "").trim();
            if (onboardingUrl && typeof window !== "undefined") {
                window.location.assign(onboardingUrl);
                return;
            }

            setNotice("Connect account created. You can continue setup in Stripe dashboard.");
            await loadPayoutSetup();
        } catch (setupError) {
            setError(setupError instanceof Error ? setupError.message : "Could not set up payouts.");
        } finally {
            setBusyAction("");
        }
    }

    async function handleOpenDashboard() {
        const accountId = String(data?.payout?.stripeAccountId || "").trim();
        if (!accountId) {
            return;
        }

        setBusyAction("dashboard");
        setError("");
        setNotice("");

        try {
            const response = await getCaregiverStripeDashboardLink(accountId);
            const url = String(response?.url || "").trim();

            if (url && typeof window !== "undefined") {
                window.open(url, "_blank", "noopener,noreferrer");
            }
        } catch (dashboardError) {
            setError(dashboardError instanceof Error ? dashboardError.message : "Could not open Stripe dashboard.");
        } finally {
            setBusyAction("");
        }
    }

    return (
        <DashboardShell fullWidth>
            <div className={styles.page}>
                <header className={styles.header}>
                    <h1>Payout Setup</h1>
                    <p>Connect your bank account to receive earnings from bookings.</p>
                </header>

                <section className={styles.alertWarning}>
                    <h2>Bank account required</h2>
                    <p>You need to add a bank account to receive payouts.</p>
                </section>

                <section className={styles.card}>
                    <div className={styles.cardHeaderRow}>
                        <h2>Payout Status</h2>
                        <StatusPill label={statusMeta.label} variant={statusMeta.variant} />
                    </div>
                    <p className={styles.helperText}>{statusMeta.helper}</p>

                    <div className={styles.actionsRow}>
                        <button
                            className={styles.primaryButton}
                            disabled={busyAction.length > 0 || loading}
                            onClick={handleSetupPayouts}
                            type="button"
                        >
                            <FontAwesomeIcon className={`${styles.buttonIcon} ${styles.stripeIconBadge}`} icon={faStripe} />
                            {busyAction === "setup" ? "Setting up..." : "Set Up Payouts"}
                        </button>

                        {String(data?.payout?.stripeAccountId || "").trim() ? (
                            <button
                                className={styles.secondaryButton}
                                disabled={busyAction.length > 0 || loading}
                                onClick={handleOpenDashboard}
                                type="button"
                            >
                                <FontAwesomeIcon className={`${styles.buttonIcon} ${styles.stripeIconBadge}`} icon={faStripe} />
                                {busyAction === "dashboard" ? "Opening..." : "Open Stripe Dashboard"}
                            </button>
                        ) : null}
                    </div>

                    {String(data?.payout?.stripeAccountId || "").trim() ? (
                        <p className={styles.accountInfo}>Connected account: {data.payout.stripeAccountId}</p>
                    ) : null}
                </section>

                <section className={styles.card}>
                    <h2>Earnings Summary</h2>
                    <div className={styles.earningsGrid}>
                        <article>
                            <p>Total Earned</p>
                            <strong>{formatMoney(data?.earnings?.totalEarned)}</strong>
                        </article>
                        <article>
                            <p>Pending Payouts</p>
                            <strong>{formatMoney(data?.earnings?.pendingPayouts)}</strong>
                        </article>
                        <article>
                            <p>Next Payout</p>
                            <strong>{formatPayoutDate(data?.earnings?.nextPayoutDate)}</strong>
                        </article>
                    </div>
                    <p className={styles.helperText}>Payouts arrive within 2-3 business days after booking completion.</p>
                </section>

                <section className={styles.alertInfo}>
                    <h2>Platform commission: {Number(data?.platformFeePercent || 15)}%</h2>
                    <p>
                        This covers payment processing, insurance, and platform services.
                        You receive {100 - Number(data?.platformFeePercent || 15)}% of each booking total.
                    </p>
                </section>

                <section className={styles.taxInfo}>
                    <p>As a self-employed professional, you are responsible for reporting your earnings to HMRC.</p>
                    <NavLink className={styles.link} to="/frequently-asked-questions">
                        Learn about self-employment tax obligations
                    </NavLink>
                </section>

                <section className={styles.securityRow}>
                    <span>Bank-grade security</span>
                    <span>
                        <span aria-hidden="true" className={styles.stripeWordmark}>stripe</span>
                        Powered by Stripe
                    </span>
                </section>

                {loading ? <p className={styles.muted}>Loading payout setup...</p> : null}
                {error ? <p className={styles.error}>{error}</p> : null}
                {notice ? <p className={styles.notice}>{notice}</p> : null}
            </div>
        </DashboardShell>
    );
}
