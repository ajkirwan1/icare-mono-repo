import NavigationButton from "~/components/website/common/buttons/navigation-buttons/navigation-button";
import styles from "./home-page-care-cta.module.scss";

export default function WhoIsICareForSection() {
    return (
        <section aria-label="Who ICare is for" className={styles.section}>
            <div className={styles.container}>
                {/* HEADER */}
                <header className={styles.header}>
                    <h2 className={styles.h2}>
                        A calmer home support marketplace
                        <br />
                        for families and caregivers
                    </h2>

                    <p className={styles.sub}>
                        ICare connects families with independent caregivers through clear profiles,
                        direct messaging and a guided process - so both sides can agree support with
                        confidence.
                    </p>
                </header>

                {/* TWO COLUMNS */}
                <div className={styles.card}>
                    {/* FOR FAMILIES */}
                    <div className={styles.col}>
                        <div>
                            <h3 className={styles.h3}>For families &amp; care receivers</h3>

                            <p className={styles.lead}>
                                Find companionship that fits your home - without agency pressure or
                                uncertainty.
                            </p>

                            <ul className={styles.list}>
                                <li>
                                    Clear caregiver profiles showing experience, availability and key details
                                    upfront.
                                </li>
                                <li>
                                    Direct, secure messaging to agree routines, schedules and start dates.
                                </li>
                            </ul>
                        </div>

                        <div className={styles.ctaWrap}>
                            <NavigationButton
                                to="#waitlist"
                                variant="outline"
                                className={`${styles.ctaButton} ${styles.ctaButtonOutline}`}
                            >
                                I require care
                            </NavigationButton>

                            <p className={styles.ctaNote}>We’ll notify you when ICare opens in your area.</p>
                        </div>
                    </div>

                    {/* FOR CAREGIVERS */}
                    <div className={styles.col}>
                        <div>
                            <h3 className={styles.h3}>For caregivers</h3>

                            <p className={styles.lead}>
                                Build trust faster and reduce back-and-forth with a profile designed for
                                clarity.
                            </p>

                            <ul className={styles.list}>
                                <li>Secure messaging to align expectations before work begins.</li>
                                <li>
                                    A clear profile highlighting your experience, availability and optional
                                    video introduction.
                                </li>
                            </ul>
                        </div>

                        <div className={styles.ctaWrap}>
                            <NavigationButton to="/icare-for-caregivers" className={`${styles.ctaButton} ${styles.ctaButtonFill}`}>
                                I&apos;m a caregiver
                            </NavigationButton>

                            <p className={styles.ctaNote}>Learn how ICare supports independent caregivers.</p>
                        </div>
                    </div>
                </div>

                {/* LEGAL NOTE */}
                <p className={styles.legal}>
                    ICare is a matching platform. We don’t provide care services or manage care
                    delivery.
                </p>
            </div>
        </section>
    );
}
