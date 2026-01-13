import React from "react";
import heroImage from "/images/heros/who-we-are.jpg";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/who-we-are-hero.module.scss";
import ICareNavbar from "../../shared/icare-navbar";
import NavigationButton from "../../../common/buttons/navigation-buttons/navigation-button";

export function WhoWeAreHero() {
  return (
    <>
      <ICareNavbar />
      <section
        id="hero"
        className={styles.hero}
        aria-label="Who We Are hero"
      >
        <img
          src={heroImage}
          alt="Care coordination background"
          className={styles.image}
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.inner}>
            <span className={`${styles.block} ${styles.headingBlock}`}>
              <h1 className={styles.title}>Who we are</h1>
            </span>
            <span className={`${styles.block} ${styles.copyBlock}`}>
              <span className={styles.leadWrap}>
                <strong className={styles.leadStrong}>
                  Fair pay for caregivers — fair prices for families.
                </strong>
              </span>
              <p className={styles.copy}>
                We connect people directly and remove middlemen — with clarity,
                dignity and privacy by design.
              </p>

              <div className={styles.ctaRow}>
                <NavigationButton to="/">How ICare works</NavigationButton>
              </div>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
