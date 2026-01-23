import heroImage from "/images/heros/icare-for-carereceivers.jpg";
import ICareNavbar from "../shared/icare-navbar";
import styles from "./icare-for-care-receivers-hero.module.scss";

export default function ICareForCareReceiversHero() {
    return (
        <>
            <ICareNavbar />

            <section aria-label="ICare for Care Receivers hero" className={styles.hero}>
                <img
                    src={heroImage}
                    alt="Home care support background"
                    className={styles.image}
                />
                <div className={styles.overlay} />

                <div className={styles.content}>
                    <div>
                        {/* H1 — WHITE */}
                        <h1 className={styles.title}>
                            Icare for care receivers
                        </h1>

                        {/* H2 — smaller, calm */}
                        <h2 className={styles.subtitle}>
                            Get personalised help for your family.
                        </h2>

                        {/* LIST — same as caregivers */}
                        <div className={styles.copy}>
                            <p className={styles.copyList}>
                                <span className={styles.check} aria-hidden="true" />
                                Verified caregiver profiles
                            </p>


                            <p className={styles.copyList}>
                                <span className={styles.check}>✓</span>
                                Clear terms agreed upfront
                            </p>

                            <p className={styles.copyList}>
                                <span className={styles.check}>✓</span>
                                No agency markups or pressure
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
