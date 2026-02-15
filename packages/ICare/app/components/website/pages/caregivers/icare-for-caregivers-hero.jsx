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
                                Work directly with families
                            </li>

                            <li className={styles.copyList}>
                                Set your own availability and rates
                            </li>

                            <li className={styles.copyList}>
                                Keep more of what you earn
                            </li>

                            <li className={styles.copyList}>
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
