import heroImage from "/images/heros/icare-for-caregivers.webp";
import styles from "./icare-for-caregivers-hero.module.scss";
import heroCopyStyles from "../../common/sections/hero-copy.module.scss";

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
                <div className={heroCopyStyles.textWrapper}>
                    <h1 className={heroCopyStyles.heading}>ICare for Caregivers</h1>
                    <div className={heroCopyStyles.copy}>
                        <p className={heroCopyStyles.copyPrimary}>Care work that puts you in control.</p>
                        <ul className={heroCopyStyles.list}>
                            <li>Work directly with families</li>
                            <li>Set your own availability and rates</li>
                            <li>Keep more of what you earn</li>
                            <li>You choose who you work with</li>
                        </ul>

                        <button
                            type="button"
                            className={heroCopyStyles.cta}
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
