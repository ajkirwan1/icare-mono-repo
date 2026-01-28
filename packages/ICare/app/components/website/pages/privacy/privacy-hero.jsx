import React from "react";
import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
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
        <>
            <ICareNavbar />
            <section aria-label={ariaLabel} className={styles.hero}>
                <img
                    src={backgroundSrc}
                    alt={backgroundAlt}
                    className={styles.bgImage}
                />
                <div className={styles.overlay} />
                <header className={styles.headerLayer} />
                <div className={styles.copy}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.lead}>{lead}</p>
                </div>
            </section>
        </>
    );
}
