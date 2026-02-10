import heroImage from "/images/heros/icare-receivers-hero.webp";
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
                            ICare for care receivers
                        </h1>

                        {/* H2 — smaller, calm */}
                        <h2 className={styles.subtitle}>
                            Get personalised help for your family.
                        </h2>

                        {/* LIST — same as caregivers */}
                        <div className={styles.copy}>
                            <p className={styles.copyList}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                Verified caregiver profiles
                            </p>


                            <p className={styles.copyList}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                Clear terms agreed upfront
                            </p>

                            <p className={styles.copyList}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                No agency markups or pressure
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
