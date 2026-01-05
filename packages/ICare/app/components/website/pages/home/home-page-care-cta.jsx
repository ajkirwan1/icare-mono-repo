import React from "react";
import NavigationButton from "../../common/buttons/navigation-buttons/navigation-button";
import CareCtaCard from "./cta-card";
import styles from "./home-page-care-cta.module.scss";

export default function HomePageCareCTA() {
  return (
    <section
      aria-label="ICare caregivers and care receivers"
      className={styles.section}
    >
      {/* ================= CAREGIVERS ================= */}
      <div className={styles.column}>
        <img
          src="images/web/homepage/caregiverbottom2.png"
          alt="Caregiver supporting an elderly person"
          className={styles.bgImage}
        />

        <div className={styles.cardWrap}>
          <CareCtaCard>
            <h2 className={`${styles.h2} ${styles.caregiverTitle}`}>
              ICare for caregivers
            </h2>

            <p className={styles.p}>
              Find fair care jobs, connect directly with families and work on
              your own terms — without agencies.
            </p>
            <div className={styles.ctaRow}>
              <NavigationButton>Find out more</NavigationButton>
            </div>
          </CareCtaCard>
        </div>
      </div>

      {/* ================= CARE RECEIVERS ================= */}
      <div className={styles.column}>
        <img
          src="images/web/homepage/carerceiverbottom.png"
          alt="Diverse family receiving care support"
          className={styles.bgImage}
        />

        <div className={styles.cardWrap}>
          <CareCtaCard>
            <h2 className={`${styles.h2} ${styles.receiverTitle}`}>
              ICare for care receivers
            </h2>

            <p className={styles.p}>
              Find trusted, verified caregivers matched to your family’s real
              needs.
            </p>
            <div className={styles.ctaRow}>
              <NavigationButton>Find out more</NavigationButton>
            </div>
          </CareCtaCard>
        </div>
      </div>
    </section>
  );
}
