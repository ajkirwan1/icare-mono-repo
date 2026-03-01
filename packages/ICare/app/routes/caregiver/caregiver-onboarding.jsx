import { useEffect, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import { DashboardShell, StatusPill } from "~/components/application/kasia";
import styles from "./caregiver-onboarding.module.scss";

export default function CaregiverOnboarding() {
  const [searchParams] = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const isRightToWorkComplete = useMemo(
    () => searchParams.get("rtw") === "complete" || searchParams.get("verification") === "complete",
    [searchParams]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const primaryCta = isRightToWorkComplete
    ? {
        label: "View profile preview",
        to: "/caregiver/profile/preview"
      }
    : {
        label: "Continue verification",
        to: "/caregiver/onboarding/right-to-work"
      };

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
                aria-disabled={!isRightToWorkComplete}
                className={`${styles.ctaSecondary} ${!isRightToWorkComplete ? styles.ctaDisabled : ""}`}
                onClick={(event) => {
                  if (!isRightToWorkComplete) {
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

          <div className={styles.progressRow} aria-label="Go-live checklist status">
            <p className={styles.progressItem}>
              <strong>To go live:</strong> Right to Work verification
              <span className={styles.badgeRequired}>Required</span>
            </p>
            <p className={styles.progressItem}>
              <strong>Optional:</strong> DBS (adds a badge)
              <span className={styles.badgeOptional}>Optional</span>
            </p>
            <p className={styles.progressItem}>
              <strong>Preview:</strong> see how families will view your profile
              <span className={styles.badgeAvailable}>
                {isRightToWorkComplete ? "Available" : "Available after verification"}
              </span>
            </p>
          </div>
        </div>

        <div className={styles.stepsGrid}>
          <article className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <h2>Right to Work Verification</h2>
              <StatusPill label="Required" variant="info" />
            </div>
            <p>Confirm legal right to work in the UK and upload required evidence.</p>
            <NavLink className={styles.stepAction} to="/caregiver/onboarding/right-to-work">
              Continue verification
            </NavLink>
          </article>

          <article className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <h2>DBS Check Submission</h2>
              <StatusPill label="Optional" variant="info" />
            </div>
            <p>Upload a DBS certificate if you have one. You can still be visible to families without it.</p>
            <NavLink className={styles.stepActionMuted} to="/caregiver/onboarding/dbs-submission">
              Open DBS submission
            </NavLink>
          </article>

          <article className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <h2>Profile Preview</h2>
              <StatusPill label="Available" variant="pending" />
            </div>
            <p>This is how families will see your profile once verification is complete.</p>
            {!isRightToWorkComplete ? (
              <p className={styles.helperText}>Available after Right to Work verification.</p>
            ) : null}
            <NavLink
              aria-disabled={!isRightToWorkComplete}
              className={`${styles.stepActionMuted} ${!isRightToWorkComplete ? styles.ctaDisabled : ""}`}
              onClick={(event) => {
                if (!isRightToWorkComplete) {
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
