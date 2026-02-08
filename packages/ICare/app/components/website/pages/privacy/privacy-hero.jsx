import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import privacySrc from "/images/heros/privacy.jpg";
import styles from "./privacy-hero.module.scss";

export default function PrivacyHero() {
  return (
    <>
      <ICareNavbar />
      <section aria-label="Privacy policy introduction" className={styles.hero}>
        <img
          src={privacySrc}
          alt=""
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
        <div className={styles.headerLayer} />
        <div className={styles.copy}>
          <h1 className={styles.title}>Privacy</h1>
          <p className={styles.lead}>
            Your privacy matters to us. This page explains what personal data we
            collect, why we collect it, and how you can exercise your rights.
          </p>
        </div>
      </section>
    </>
  );
}
