import React from "react";
import styles from "@styles/components/website/pages/who-we-are/sections/fourth-section.module.scss";

export function FourthSection() {
  const metrics = [
    {
      n: "2.3×",
      l: "Faster Matching",
      d: "From first contact to confirmed start date"
    },
    {
      n: "94%",
      l: "5-Star Feedback",
      d: "From families & caregivers who matched successfully"
    },
    {
      n: "−18%",
      l: "Lower Total Cost",
      d: "Compared to traditional care agencies"
    },
    {
      n: "100%",
      l: "Profiles Verified",
      d: "Every caregiver verified by ID and references"
    }
  ];

  return (
    <section
      id="impact"
      aria-label="Impact metrics"
      className={styles.section}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>Our Impact</h2>

        <p className={styles.subheading}>
          We measure what matters — safer matches, fairer pay, and faster starts.
        </p>

        <div aria-hidden="true" className={styles.divider} />

        <div className={styles.grid}>
          {metrics.map((k) => (
            <div key={k.l} className={styles.metricCard}>
              <div className={styles.metricValue}>{k.n}</div>
              <div className={styles.metricLabel}>{k.l}</div>
              <div className={styles.metricDescription}>{k.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
