import heroImage from "/images/heros/who-we-are-2.jpg";
import styles from "./who-we-are-hero.module.scss";
import NavigationButton from "../../../common/buttons/navigation-buttons/navigation-button";
import heroCopyStyles from "../../../common/sections/hero-copy.module.scss";


export function WhoWeAreHero() {
    return (
        <section
            id="hero"
            className={styles.hero}
            aria-label="Who We Are hero"
        >
            <img
                src={heroImage}
                alt=""
                role="presentation"
                width="3862"
                height="2578"
                className={styles.image}
            />
            <div className={styles.overlay} aria-hidden="true" />


            <div className={styles.content}>
                <div className={heroCopyStyles.textWrapper}>
                    <h1 className={heroCopyStyles.heading}>Who we are</h1>
                    <div className={`${heroCopyStyles.copy} ${styles.copyWide}`}>
                        <p className={heroCopyStyles.copyPrimary}>Fair pay for caregivers - fair prices for families.</p>
                        <p>We connect families and caregivers directly with clarity, dignity and privacy by design.</p>
                    </div>

                    <div className={styles.ctaRow}>
                        <NavigationButton to="/how-it-works">How ICare works</NavigationButton>
                    </div>

                </div>
            </div>
        </section>
    );
}
