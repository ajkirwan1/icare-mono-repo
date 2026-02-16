import heroImage from "/images/heros/who-we-are-2.jpg";
import styles from "./who-we-are-hero.module.scss";
import NavigationButton from "../../../common/buttons/navigation-buttons/navigation-button";

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
                className={styles.image}
            />
            <div className={styles.overlay} aria-hidden="true" />
            <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.headingBlock}>
                        <h1 className={styles.title}>Who we are</h1>
                    </div>
                    <div className={styles.copyBlock}>
                        <p className={styles.lead}>
                            <strong>Fair pay for caregivers - fair prices for families.</strong>
                        </p>
                        <p className={styles.copy}>
                            We connect families and caregivers directly<br />
                            with clarity, dignity and privacy by design.
                        </p>
                        <div className={styles.ctaRow}>
                            <NavigationButton to="/how-it-works">How ICare works</NavigationButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
