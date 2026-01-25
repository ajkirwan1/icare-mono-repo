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

            <section
                aria-label="ICare homepage hero"
                className={styles.hero}
                onMouseEnter={() => emit(true)}
            >
                <img
                    src={imgSrc}
                    alt="Care support background"
                    className={styles.backgroundImage}
                />

                <div className={styles.content}>
                    <div className={styles.textWrapper}>
                        <div className={styles.copyBlock}>

                            {/* HEADLINE */}
                            <h1 className={styles.heading}>
                                Direct home care <span>between</span><br />
                                families and caregivers
                            </h1>

                            {/* HERO BULLETS — SHORT & CLEAR */}
                            <ul className={styles.features}>
                                {[
                                    "Browse clear caregiver profiles",
                                    "Talk directly and agree care calmly",
                                    "No agencies. One clear model.",
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

                            {/* CTA */}
                            <div className={styles.form}>
                                <a href="#waitlist" style={{ textDecoration: "none" }}>
                                    <SubmitButton>Join waiting list</SubmitButton>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
