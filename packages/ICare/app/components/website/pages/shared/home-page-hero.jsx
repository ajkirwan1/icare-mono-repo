import ICareNavbar from "./ICareNavbar";
import SubmitButton from "../../common/buttons/submit-buttons/submit-button";
import NavigationButton from "../../common/buttons/navigation-buttons/navigation-button";
import styles from "./home-page-hero.module.scss";

export default function HomePageHero({ imgSrc }) {
    return (
        <>
            <ICareNavbar />
            <section aria-label="ICare homepage hero" className={styles.hero}>
                <img src={imgSrc} alt="Care support background" className={styles.backgroundImage} />
                <div aria-hidden="true" className={styles.overlay} />

                <div className={styles.content}>
                    <div className={styles.textWrapper}>
                        {/* <span className={styles.badgeWrapper}>
              <strong className={styles.badge}>Launching soon in Cheltenham</strong>
            </span> */}

                        <div className={styles.copyBlock}>
                            <h1 className={styles.heading}>
                                Find trusted <span>home care</span> in Cheltenham - without agency stress.
                            </h1>

                            <p className={styles.subheading}>
                                <strong>Transparent pricing. Direct communication. A calmer, guided process for families.</strong>
                            </p>

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

                            {/* ✅ Two buttons side-by-side */}
                            {/* <div className={styles.form}>
                <a href="#waitlist" style={{ textDecoration: "none" }}>
                  <SubmitButton>Join waiting list</SubmitButton>
                </a>

                <NavigationButton to="/icare-for-caregivers">I’m a caregiver</NavigationButton>
              </div> */}

                            {/* tiny reassurance */}
                            {/* <p style={{ marginTop: 12, opacity: 0.85 }}>
                One launch email + occasional updates. Unsubscribe anytime.
              </p> */}
                        </div>
                    </div>
                </div>
            </section>
            <div style={{ display: "flex", gap: "2vw", height: "20vh", background: "#fff9ef", alignItems: "center" }} className={styles.section}>
                <h2 className={styles.title}>
                    A platform for caregivers and care receivers to connect in a safe,
                    secure, and trusted place
                </h2>
                {/* <p className={styles.tagline}>
                        A platform for caregivers and care receivers to connect in a safe,
                        secure, and trusted place
                      </p> */}

            </div>
        </>
    );
}
