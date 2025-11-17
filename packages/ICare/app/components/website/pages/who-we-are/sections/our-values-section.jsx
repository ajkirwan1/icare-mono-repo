// app/components/website/pages/who-we-are/sections/second-section.tsx
import React from "react";
import styles from "@styles/components/website/pages/who-we-are/sections/second-section.module.scss";
import { ValuesCard } from "../cards/value-card";

export function OurValuesSection() {
  const cards = [
    {
      key: "dignity",
      title: "Dignity & Respect",
      description:
        "We put people first — families and caregivers — in every decision we make.",
      bg: "#E9F6F1",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4C7865"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )
    },
    {
      key: "privacy",
      title: "Privacy by Design",
      description:
        "Built-in data protection and security. Your privacy is never an afterthought.",
      bg: "#F3F1E8",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4C7865"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      key: "fair",
      title: "Fair & Transparent",
      description:
        "No hidden fees, no surprises. All agreements are clear, honest, and accessible.",
      bg: "#EEF3F0",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4C7865"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15V8a2 2 0 0 0-2-2h-5" />
          <path d="M3 8v7a2 2 0 0 0 2 2h5" />
          <path d="M7 10h3" />
          <path d="M14 14h3" />
        </svg>
      )
    },
    {
      key: "trust",
      title: "Trust & Safety",
      description:
        "Verified caregivers, secure payments, and encrypted communication — always.",
      bg: "#E6F2ED",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4C7865"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    }
  ];

  return (
    <section id="values" aria-label="ICare values" className={styles.section}>
      <div className={styles.layout}>
        {/* Left column – text */}
        <header className={styles.leftCol}>
          <h2 className={styles.heading}>Our Values</h2>
          <p className={styles.quote}>
            “Care isn’t a service. It’s a shared human value.”
          </p>
          <p className={styles.bodyText}>
            We build trust through fairness, clarity, and respect — every step of
            the way. Together, we’re shaping a care system built on trust —
            empowering families and caregivers to work as equals.
          </p>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
              alt="Kind caregiver supporting an elderly person"
            />
          </div>
          <div aria-hidden="true" className={styles.divider} />
        </header>
        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <ValuesCard
              key={card.key}
              icon={card.icon}
              title={card.title}
              description={card.description}
              bg={card.bg}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
