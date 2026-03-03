import { useEffect, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import { AlertBanner, DashboardShell, StatusPill } from "~/components/application/kasia";
import { getCaregiverOnboardingSummary, onboardingStatusLabel } from "./caregiver-onboarding-api-client";
import styles from "./caregiver-onboarding.module.scss";

const DEFAULT_SUMMARY = {
    identity: { status: "not_submitted" },
    rightToWork: { status: "not_submitted" },
    dbs: { status: "not_submitted" },
    isProfilePreviewReady: false
};

function statusVariant(status) {
    const normalized = String(status || "").trim().toLowerCase();

    if (normalized === "verified") {
        return "confirmed";
    }

    if (normalized === "pending_review") {
        return "pending";
    }

    if (normalized === "rejected") {
        return "info";
    }

    return "info";
}

function isStepStarted(status) {
    return String(status || "").trim().toLowerCase() !== "not_submitted";
}

export default function CaregiverOnboarding() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(DEFAULT_SUMMARY);
    const [flashMessage, setFlashMessage] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const submitted = String(searchParams.get("submitted") || "").trim().toLowerCase();
        if (!submitted) {
            return;
        }

        if (submitted === "right-to-work") {
            setFlashMessage("Right to Work verification submitted successfully. Your documents were sent to admin review.");
        } else {
            setFlashMessage("Submission sent successfully.");
        }

        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete("submitted");
        setSearchParams(nextParams, { replace: true });
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        const controller = new AbortController();

        async function loadSummary() {
            setLoading(true);
            try {
                const payload = await getCaregiverOnboardingSummary({ signal: controller.signal });
                setSummary({
                    identity: payload?.identity || DEFAULT_SUMMARY.identity,
                    rightToWork: payload?.rightToWork || DEFAULT_SUMMARY.rightToWork,
                    dbs: payload?.dbs || DEFAULT_SUMMARY.dbs,
                    isProfilePreviewReady: Boolean(payload?.isProfilePreviewReady)
                });
            } catch {
                const rightToWorkFromQuery = (
                    searchParams.get("rtw") === "complete" ||
                    searchParams.get("verification") === "complete"
                );

                if (rightToWorkFromQuery) {
                    setSummary((prev) => ({
                        ...prev,
                        rightToWork: { ...prev.rightToWork, status: "pending_review" },
                        isProfilePreviewReady: isStepStarted(prev.identity?.status)
                    }));
                }
            } finally {
                setLoading(false);
            }
        }

        loadSummary();

        return () => {
            controller.abort();
        };
    }, [searchParams]);

    const identityComplete = isStepStarted(summary?.identity?.status);
    const rightToWorkComplete = isStepStarted(summary?.rightToWork?.status);
    const isProfilePreviewReady = Boolean(summary?.isProfilePreviewReady || (identityComplete && rightToWorkComplete));

    const primaryCta = useMemo(() => {
        if (!identityComplete) {
            return {
                label: "Start identity verification",
                to: "/caregiver/onboarding/identity-verification"
            };
        }

        if (!rightToWorkComplete) {
            return {
                label: "Continue right to work",
                to: "/caregiver/onboarding/right-to-work"
            };
        }

        return {
            label: "View profile preview",
            to: "/caregiver/profile/preview"
        };
    }, [identityComplete, rightToWorkComplete]);

    return (
        <DashboardShell>
            <div className={`${styles.page} ${mounted ? styles.pageMounted : ""}`}>
                <div className={styles.headerCard}>
                    <div className={styles.topRow}>
                        <h1>Caregiver Onboarding</h1>
                        <div className={styles.ctaGroup}>
                            <NavLink className={styles.cta} to={primaryCta.to}>
                                {primaryCta.label}
                            </NavLink>
                            <NavLink className={styles.ctaSecondary} to="/caregiver/onboarding/dbs-submission">
                                Open DBS submission
                            </NavLink>
                            <NavLink
                                aria-disabled={!isProfilePreviewReady}
                                className={`${styles.ctaSecondary} ${!isProfilePreviewReady ? styles.ctaDisabled : ""}`}
                                onClick={(event) => {
                                    if (!isProfilePreviewReady) {
                                        event.preventDefault();
                                    }
                                }}
                                to="/caregiver/profile/preview"
                            >
                                View profile preview
                            </NavLink>
                        </div>
                    </div>

                    <p className={styles.subtitle}>
                        Follow these steps to complete verification and prepare your profile for families.
                    </p>

                    {flashMessage ? (
                        <AlertBanner
                            variant="success"
                            title="Submission received"
                            message={flashMessage}
                            icon="i"
                        />
                    ) : null}

                    <div className={styles.progressRow} aria-label="Go-live checklist status">
                        <p className={styles.progressItem}>
                            <strong>Required:</strong> Identity verification
                            <span className={styles.badgeRequired}>{onboardingStatusLabel(summary?.identity?.status)}</span>
                        </p>
                        <p className={styles.progressItem}>
                            <strong>Required:</strong> Right to Work verification
                            <span className={styles.badgeRequired}>{onboardingStatusLabel(summary?.rightToWork?.status)}</span>
                        </p>
                        <p className={styles.progressItem}>
                            <strong>Optional:</strong> DBS (adds a badge)
                            <span className={styles.badgeOptional}>{onboardingStatusLabel(summary?.dbs?.status)}</span>
                        </p>
                        <p className={styles.progressItem}>
                            <strong>Preview:</strong> see how families will view your profile
                            <span className={styles.badgeAvailable}>
                                {isProfilePreviewReady ? "Available" : "Available after required checks"}
                            </span>
                        </p>
                    </div>

                    {loading ? <p className={styles.helperText}>Loading onboarding status...</p> : null}
                </div>

                <div className={styles.stepsGrid}>
                    <article className={styles.stepCard}>
                        <div className={styles.stepHeader}>
                            <h2>Identity Verification</h2>
                            <StatusPill label={onboardingStatusLabel(summary?.identity?.status)} variant={statusVariant(summary?.identity?.status)} />
                        </div>
                        <p>Upload a government-issued ID to verify your identity.</p>
                        <NavLink className={styles.stepAction} to="/caregiver/onboarding/identity-verification">
                            Open identity verification
                        </NavLink>
                    </article>

                    <article className={styles.stepCard}>
                        <div className={styles.stepHeader}>
                            <h2>Right to Work Verification</h2>
                            <StatusPill label={onboardingStatusLabel(summary?.rightToWork?.status)} variant={statusVariant(summary?.rightToWork?.status)} />
                        </div>
                        <p>Confirm legal right to work in the UK and upload required evidence.</p>
                        <NavLink className={styles.stepAction} to="/caregiver/onboarding/right-to-work">
                            Continue verification
                        </NavLink>
                    </article>

                    <article className={styles.stepCard}>
                        <div className={styles.stepHeader}>
                            <h2>DBS Check Submission</h2>
                            <StatusPill label={onboardingStatusLabel(summary?.dbs?.status)} variant={statusVariant(summary?.dbs?.status)} />
                        </div>
                        <p>Upload a DBS certificate if you have one. You can still be visible to families without it.</p>
                        <NavLink className={styles.stepActionMuted} to="/caregiver/onboarding/dbs-submission">
                            Open DBS submission
                        </NavLink>
                    </article>

                    <article className={styles.stepCard}>
                        <div className={styles.stepHeader}>
                            <h2>Profile Preview</h2>
                            <StatusPill label={isProfilePreviewReady ? "Available" : "Locked"} variant={isProfilePreviewReady ? "pending" : "info"} />
                        </div>
                        <p>This is how families will see your profile once required checks are submitted.</p>
                        {!isProfilePreviewReady ? (
                            <p className={styles.helperText}>Complete Identity and Right to Work steps first.</p>
                        ) : null}
                        <NavLink
                            aria-disabled={!isProfilePreviewReady}
                            className={`${styles.stepActionMuted} ${!isProfilePreviewReady ? styles.ctaDisabled : ""}`}
                            onClick={(event) => {
                                if (!isProfilePreviewReady) {
                                    event.preventDefault();
                                }
                            }}
                            to="/caregiver/profile/preview"
                        >
                            View Profile Preview
                        </NavLink>
                    </article>
                </div>

                <aside className={styles.reassuranceBox} aria-label="Document privacy reassurance">
                    <h3>Your documents stay private</h3>
                    <p>Uploads are reviewed to support verification and are never shared with families.</p>
                </aside>
            </div>
        </DashboardShell>
    );
}
