import ICareNavbar from "./icare-navbar";
import SubmitButton from "../../common/buttons/submit-buttons/submit-button";
import NavigationButton from "../../common/buttons/navigation-buttons/navigation-button";
import styles from "./home-page-hero.module.scss";

export default function HomePageHero({ imgSrc }) {

    const emit = (active) => {
        window.dispatchEvent(
            new CustomEvent("hero-hover", {
                detail: { active }
            })
        );
    };

    return (
        <>
            <ICareNavbar />
            <section aria-label="ICare homepage hero" className={styles.hero} onMouseEnter={() => emit(true)}>
                <img src={imgSrc} alt="Care support background" className={styles.backgroundImage} />
                <div className={styles.content}>
                    <div className={styles.textWrapper}>
                        <div className={styles.copyBlock}>
                            <h1 className={styles.heading}>
                                Find trusted <span>home care</span><br />without agency stress.
                            </h1>

                            <ul className={styles.features}>
                                {[
                                    "Clear caregiver profiles",
                                    "Structured matching — agree tasks & schedule upfront",
                                    "Safety details shown on profiles",
                                    "No agency markups — simple and transparent"
                                ].map((text) => (
                                    <li key={text} className={styles.featureItem}>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#fff"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.form}>
                                <a href="#waitlist" style={{ textDecoration: "none" }}>
                                    <SubmitButton>Join waiting list</SubmitButton>
                                </a>
                                <NavigationButton to="/icare-for-caregivers">I’m a caregiver</NavigationButton>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={styles.subheading}>
                    <span>Transparent pricing.</span> <span>Direct communication.</span> <span>A calmer, guided process for families.</span>
                </p>
            </section>
        </>
    );
}
