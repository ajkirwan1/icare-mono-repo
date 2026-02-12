import heroImage from "/images/heros/icare-for-caregivers.webp";
import styles from "./icare-for-caregivers-hero.module.scss";

export default function ICareForCaregiversHero() {
    return (
        <section
            aria-label="ICare for Caregivers hero"
            className={styles.hero}
        >
            <img
                src={heroImage}
                alt=""
                role="presentation"
                className={styles.image}
            />

            <div aria-hidden="true" className={styles.overlay} />

            <div className={styles.content}>
                <div>
                    <h1 className={styles.heading}>
                        ICare for Caregivers
                    </h1>

                    <div className={styles.copy}>
                        <p className={styles.copyPrimary}>
                            Care work that puts you in control.
                        </p>

                        <ul className={styles.benefitsList}>
                            <li className={styles.copyList}>
                                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Work directly with families
                            </li>

                            <li className={styles.copyList}>
                                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Set your own availability and rates
                            </li>

                            <li className={styles.copyList}>
                                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Keep more of what you earn
                            </li>

                            <li className={styles.copyList}>
                                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                You choose who you work with
                            </li>
                        </ul>

                        <button
                            type="button"
                            className={styles.cta}
                            onClick={() => {
                                document
                                    .getElementById("how-it-works")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            How it works for caregivers
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
