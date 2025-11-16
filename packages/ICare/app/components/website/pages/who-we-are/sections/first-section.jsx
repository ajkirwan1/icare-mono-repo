import React from "react";
import { InfoCard } from "../cards/info-card";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/first-section.module.scss";

export function FirstSection() {
  return (
    <section
      id="foundation"
      aria-label="Our foundation and mission"
      className={styles.section}
    >
      <div className={styles.grid}>
        {/* === Foundation === */}
        <InfoCard title="Our Foundation" accent="left" variant="green">
          <p className={styles.paragraph}>
            <span className={styles.paragraphLead}>
              Finding the right care shouldn’t be overwhelming.
            </span>
            Families face complex choices — finding trusted caregivers, managing
            costs, and organising day-to-day life. Caregivers deserve respect,
            fair pay, and tools that help them deliver safe, effective care.
          </p>

          <div className={styles.block}>
            <span className={styles.blockTitle}>Families naturally ask:</span>

            <ul className={styles.list}>
              {[
                "How do we start?",
                "Does this caregiver have the right skills?",
                "Will they be fairly paid?",
                "Is our information secure?"
              ].map((q) => (
                <li key={q} className={styles.listItem}>
                  <span className={styles.bullet}>
                    <span className={styles.bulletInner} />
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>

            <p className={styles.closingText}>
              <b>At ICare, we’ve been there.</b> That’s why we built a platform
              grounded in dignity, empathy, and trust — peace of mind for
              families and recognition for caregivers.
            </p>
          </div>
        </InfoCard>

        {/* === Mission === */}
        <InfoCard title="Our Mission" accent="right" variant="white">
          <p className={styles.paragraph}>
            ICare grew from first-hand 24/7 live-in care experience across
            Europe. We combine healthcare and technology expertise to create a
            more compassionate, transparent, and secure way to match families
            and caregivers.
          </p>

          <p className={styles.paragraph}>
            We minimise friction, prioritise privacy, and keep costs fair — so
            great care can start sooner.
          </p>
        </InfoCard>
      </div>
    </section>
  );
}
