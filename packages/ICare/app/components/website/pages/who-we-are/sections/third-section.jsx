import React from "react";
import styles from "@styles/components/website/pages/who-we-are/sections/third-section.module.scss";
import { HowWeWorkCard } from "../cards/how-we-work-card";

export function ThirdSection() {
  const steps = [
    {
      step: 1,
      title: "Brief & preferences",
      description:
        "Tell us your needs, schedule and preferred skills. We minimise data — only what’s necessary.",
      variant: "green"
    },
    {
      step: 2,
      title: "Direct matching",
      description:
        "We show verified profiles that fit your brief — you speak directly with candidates.",
      variant: "blue"
    },
    {
      step: 3,
      title: "Agree & start",
      description:
        "You agree terms directly with the caregiver. We provide guidance and safer-practice templates.",
      variant: "orange"
    }
  ];

  return (
    <section id="howwework" aria-label="How We Work" className={styles.section}>
      <h2 className={styles.heading}>How We Work</h2>

      <p className={styles.subheading}>
        A clear, privacy-first process that connects families and caregivers directly.
      </p>

      <div aria-hidden="true" className={styles.divider} />

      <div className={styles.grid}>
        {steps.map((s) => (
          <HowWeWorkCard
            key={s.step}
            step={s.step}
            title={s.title}
            description={s.description}
            variant={s.variant}
          />
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <a href="/how-it-works" className={styles.ctaButton}>
          Explore full process
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
