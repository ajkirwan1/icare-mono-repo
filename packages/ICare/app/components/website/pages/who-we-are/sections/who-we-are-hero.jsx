import React from "react";
import heroImage from "/images/heros/who-we-are.jpg";
import { NavLink } from "react-router";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/who-we-are-hero.module.scss";

export function WhoWeAreHero() {
  return (
    <section id="hero" className={styles.heroWrap} aria-label="Who We Are hero">
      <img
        src={heroImage}
        alt="Care coordination background"
        className={styles.heroImg}
      />

      <div className={styles.heroOverlay} />

      <header className={styles.headerOverlay}>
        <NavLink to="/" className={styles.brand}>
          ICare
        </NavLink>
      </header>

      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.copyBlock}>
            <span className={styles.badge}>who we are</span>

            <h1 className={styles.title}>
              We build <span className={styles.highlight}>direct</span> and safe
              care.
            </h1>

            <p className={styles.lead}>
              <b>Fair pay for caregivers — fair prices for families.</b>
            </p>
            <p className={styles.lead}>
              We connect people directly and remove middlemen — with clarity,
              dignity and privacy by design.
            </p>

            <div className={styles.ctaRow}>
              <a href="/how-it-works" className={styles.ctaLink}>
                How it works
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
