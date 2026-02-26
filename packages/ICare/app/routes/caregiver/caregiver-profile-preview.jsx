import { NavLink } from "react-router";
import { DashboardShell, SectionCard } from "~/components/application/kasia";
import styles from "./caregiver-profile-preview.module.scss";

const services = [
  "Companionship (conversation, activities, outings)",
  "Light housework and cleaning",
  "Shopping and errands",
  "Meal preparation (no feeding assistance)",
  "Transportation (requires own vehicle)",
  "Own vehicle (insured for passenger transport)"
];

export default function CaregiverProfilePreview() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>My Profile <span>&gt;</span> <strong>Public Preview</strong></div>

      <DashboardShell
        title="Public Profile Preview"
        subtitle="This is how families will see your profile."
        main={(
          <>
            <div className={styles.previewNotice}>
              Preview mode: this view is read-only and mirrors what families see.
            </div>

            <SectionCard title="Caregiver Overview">
              <div className={styles.heroGrid}>
                <div className={styles.hero}>
                  <img src="/images/avatars/female.webp" alt="Profile" />
                  <div>
                    <h3>Sarah Johnson</h3>
                    <p>5 years experience • SW1A area • £18/hour</p>
                    <div className={styles.verifyBadges}>
                      <span>DBS Verified</span>
                      <span>ID Verified</span>
                      <span>References Verified</span>
                    </div>
                  </div>
                </div>
                <div className={styles.heroStats}>
                  <div>
                    <small>Availability</small>
                    <p>Weekdays</p>
                  </div>
                  <div>
                    <small>Response time</small>
                    <p>Within 24h</p>
                  </div>
                  <div>
                    <small>Travel range</small>
                    <p>10 miles</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="About">
              <p className={styles.copy}>
                I am a friendly and experienced companion who enjoys meaningful conversations,
                gentle outings, and helping with day-to-day routines.
              </p>
            </SectionCard>

            <SectionCard title="Languages & Interests">
              <div className={styles.tagBlocks}>
                <div>
                  <p className={styles.blockLabel}>Languages</p>
                  <div className={styles.tags}>
                    <span>English</span>
                    <span>Polish</span>
                  </div>
                </div>
                <div>
                  <p className={styles.blockLabel}>Interests</p>
                  <div className={styles.tags}>
                    <span>Gardening</span>
                    <span>Reading</span>
                    <span>Walking</span>
                    <span>Cooking</span>
                    <span>Board games</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Services Offered">
              <ul className={styles.serviceList}>
                {services.map((item) => (
                  <li key={item}>
                    <span className={styles.check}>v</span>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>

            <div className={styles.footerActions}>
              <NavLink to="/caregiver/profile" className={styles.editBtn}>Back to Edit Profile</NavLink>
            </div>
          </>
        )}
        aside={null}
      />
    </div>
  );
}
