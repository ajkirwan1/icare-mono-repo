import { NavLink } from "react-router";
import { DashboardShell, StatusPill } from "~/components/application/kasia";
import styles from "./caregiver-onboarding.module.scss";

export default function CaregiverOnboarding() {
  return (
    <DashboardShell>
      <div className={styles.page}>
        <div className={styles.headerCard}>
          <div className={styles.brandRow}>
            <img src="/images/logo/icareblack.svg" alt="ICare" />
          </div>

          <div className={styles.topRow}>
            <h1>Caregiver Onboarding</h1>
            <div className={styles.ctaGroup}>
              <NavLink className={styles.cta} to="/caregiver/onboarding/right-to-work">
                Continue to Right to Work
              </NavLink>
              <NavLink className={styles.ctaSecondary} to="/caregiver/onboarding/dbs-submission">
                Open DBS Submission
              </NavLink>
            </div>
          </div>

          <p className={styles.subtitle}>
            Onboarding flow overview for caregiver verification and setup.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          <article className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <h2>Right to Work Verification</h2>
              <StatusPill label="Required" variant="info" />
            </div>
            <p>Confirm legal right to work in the UK and upload required evidence.</p>
            <NavLink className={styles.stepAction} to="/caregiver/onboarding/right-to-work">
              Open Right to Work
            </NavLink>
          </article>

          <article className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <h2>DBS Check Submission</h2>
              <StatusPill label="Optional" variant="info" />
            </div>
            <p>Upload a DBS certificate to earn the DBS Verified badge on your profile.</p>
            <NavLink className={styles.stepAction} to="/caregiver/onboarding/dbs-submission">
              Open DBS Submission
            </NavLink>
          </article>

          <article className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <h2>Profile Preview</h2>
              <StatusPill label="Available" variant="pending" />
            </div>
            <p>Review how your profile appears to families before going live.</p>
            <NavLink className={styles.stepActionMuted} to="/caregiver/profile/preview">
              View Profile Preview
            </NavLink>
          </article>
        </div>
      </div>
    </DashboardShell>
  );
}
