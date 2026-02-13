import heroImage from "/images/heros/icare-receivers-hero.webp";
import styles from "./icare-for-care-receivers-hero.module.scss";

export default function ICareForCareReceiversHero() {
    return (
        <section aria-label="ICare for Care Receivers hero" className={styles.hero}>
            <img
              src={heroImage}
              alt=""
              role="presentation"
              className={styles.image}
            />
            <div aria-hidden="true" className={styles.overlay} />

            <div className={styles.content}>
                <div>
                    <h1 className={styles.title}>
                        ICare for care receivers
                    </h1>

                    <p className={styles.subtitle}>
                        Get personalised help for your family.
                    </p>

                    <ul className={styles.copy}>
                        <li className={styles.copyList}>
                            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                            Verified caregiver profiles
                        </li>

                        <li className={styles.copyList}>
                            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                            Clear terms agreed upfront
                        </li>

                        <li className={styles.copyList}>
                            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                            No agency markups or pressure
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
