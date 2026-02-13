import styles from "./contract-card.module.scss";

export function ContactCard() {
    return (
        <section aria-labelledby="contact-heading" className={styles.section}>
            <div className={styles.wrap}>
                <h2 id="contact-heading" className={styles.heading}>
                    Want to learn more or partner with us?
                </h2>

                <p className={styles.text}>
                    We're happy to talk. Tell us about your needs — we'll get back within
                    1–2 business days.
                </p>

                <div className={styles.ctaWrap}>
                    <a
                        href="mailto:hello@icare.example"
                        className={styles.ctaLink}
                    >
                        Email us
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
