import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import privacySrc from "/images/heros/privacy.webp";
import styles from "./privacy-hero.module.scss";
import heroCopyStyles from "../../common/sections/hero-copy.module.scss";

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

                <div className={styles.content}>
                    <div className={heroCopyStyles.textWrapper}>
                        <h1 className={heroCopyStyles.heading}>Privacy</h1>
                        <div className={heroCopyStyles.copy}>
                            <p className={heroCopyStyles.copyPrimary}>
                                Your privacy matters to us.
                                <br className={styles.breakDesktop} />
                                This page explains what personal data we collect, why we collect it, and how you can exercise your rights.
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}
