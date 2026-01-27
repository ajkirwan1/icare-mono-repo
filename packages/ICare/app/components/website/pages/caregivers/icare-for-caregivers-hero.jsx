import heroImage from "/images/heros/icare-for-caregivers.jpg";
import ICareNavbar from "../shared/icare-navbar";
import styles from "./icare-for-caregivers-hero.module.scss";

export default function ICareForCaregiversHero() {
    const scrollToHowItWorks = () => {
        const section = document.getElementById(
            "how-icare-works-caregivers"
        );
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <ICareNavbar />

            <section
                aria-label="ICare for Caregivers hero"
                className={styles.hero}
            >
                <img
                    src={heroImage}
                    alt="Care support background"
                    className={styles.image}
                />

                <div className={styles.overlay} />

                <div className={styles.content}>
                    <div>
                        <h1 className={styles.heading}>
                            ICare for Caregivers
                        </h1>

                        <div className={styles.copy}>
                            <p className={styles.copyPrimary}>
                                Care work that puts you in control.
                            </p>

                            <p className={styles.copyList}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Work directly with families
                            </p>

                            <p className={styles.copyList}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Set your own availability and rates
                            </p>

                            <p className={styles.copyList}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Keep more of what you earn
                            </p>

                            <p className={styles.copyList}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                You choose who you work with
                            </p>

                            <a href="#how-it-works" style={{ textDecoration: "none" }}>
                                <button
                                    type="button"
                                    className={styles.cta}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .getElementById("how-it-works")
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    how it works for caregivers
                                </button>
                            </a>

                        </div>
                    </div>
                </div>

                {/* STRIP BELOW HERO */}
                <div
                    className={styles.section}
                    style={{
                        display: "flex",
                        gap: "2vw",
                        height: "20vh",
                        background: "#fff9ef",
                        alignItems: "center",
                        padding: "0 5vw",
                    }}
                >
                    <h2 className={styles.title}>
                        A platform for caregivers and care receivers to connect in a safe,
                        secure, and trusted place
                    </h2>

                    <img
                        src="/images/logo/logo-cropped.png"
                        alt="ICare"
                        style={{ height: 120, width: "auto" }}
                    />
                </div>
            </section>
        </>
    );
}
