import React from "react";
import ICareNavbar from "~/components/website/pages/shared/ICareNavbar";
import styles from "./privacy-hero.module.scss";

export default function PrivacyHero({
  backgroundSrc,
  title,
  lead,
  navItems,
  ariaLabel = "Privacy hero",
  backgroundAlt = "Privacy background"
}) {
  return (
    <section aria-label={ariaLabel} className={styles.hero}>
      {/* Background */}
      <img
        src={backgroundSrc}
        alt={backgroundAlt}
        className={styles.bgImage}
      />

      {/* Overlay */}
      <div className={styles.overlay} />

      <ICareNavbar />

      {/* Header layer */}
      <header className={styles.headerLayer} />

      {/* Hero Copy */}
      <div className={styles.copy}>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.lead}>{lead}</p>

        <div className={styles.navWrap} aria-label={`${title} on-page navigation`}>
          {navItems.map(([href, label]) => (
            <a key={href} href={href} className={styles.pillLink}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
