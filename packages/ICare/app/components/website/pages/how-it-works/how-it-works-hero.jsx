import React from "react";
import whoWeAreHeroSrc from "/images/heros/who-we-are.jpg";
import ICareNavbar from "../shared/ICareNavbar";
import styles from "./how-it-works-hero.module.scss";
import NavigationButton from "../../common/buttons/navigation-buttons/navigation-button";

export default function HowItWorksHero() {
  return (
    <>
      <ICareNavbar />
      <section aria-label="How it works hero" className={styles.hero}>
        <img
          src={whoWeAreHeroSrc}
          alt="Care coordination background"
          className={styles.image}
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>How it works</h1>
            <p className={styles.lead}>
              <b className={styles.leadStrong}>A simple way to find care locally.</b>
              <br />
              Browse profiles, message, and agree terms directly.
            </p>
            <div className={styles.ctaRow}>
              <NavigationButton to="/">Get started</NavigationButton>
            </div>
          </div>
        </div>
      </section>
    </>

  );
}
