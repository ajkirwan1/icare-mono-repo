import { NavLink } from "react-router";
import { INTRODUCTION_PROTECTED_PERIOD_MONTHS } from "~/constants/terms";
import styles from "./terms-content.module.scss";

const company = {
    brand: "ICare",
    supportEmail: "hello@icare-app.co.uk",
    lastUpdated: "March 2026"
};

export default function TermsContent() {
    return (
        <section className={styles.page} aria-label="Terms of Service">
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2 className={styles.h1}>Terms of Service</h2>
                    <div className={styles.metaRow}>
                        <span>
                            Last updated: <strong>{company.lastUpdated}</strong>
                        </span>
                    </div>
                    <p className={styles.lead}>
                        These terms explain how {company.brand} works and what both families and caregivers can expect when using the platform.
                    </p>
                </header>

                <section id="using-icare" className={styles.section} aria-label="Using ICare">
                    <h2 className={styles.h2}>Using ICare</h2>
                    <p className={styles.paragraph}>
                        ICare helps families and caregivers connect, communicate and arrange care support. We ask everyone to use the platform respectfully and keep communication clear.
                    </p>
                </section>

                <section id="responsibilities" className={styles.section} aria-label="User responsibilities">
                    <h2 className={styles.h2}>User responsibilities</h2>
                    <ul className={styles.ul}>
                        <li>Keep profile and contact information accurate.</li>
                        <li>Use respectful communication and avoid misleading content.</li>
                        <li>Follow applicable UK laws and safeguarding expectations.</li>
                    </ul>
                </section>

                <section id="bookings-introductions" className={styles.section} aria-label="Bookings and introductions">
                    <h2 className={styles.h2}>Bookings and Introductions</h2>
                    <p className={styles.paragraph}>
                        ICare introduces care receivers and caregivers so they can build trusted working relationships in a safe environment.
                    </p>
                </section>

                <section
                    id="introduction-fair-use"
                    className={styles.section}
                    aria-label="Introduction and fair use non-circumvention"
                >
                    <h2 className={styles.h2}>Introduction &amp; Fair Use (Non-Circumvention)</h2>
                    <div className={styles.callout}>
                        This section supports fairness, safety and sustainability for all sides of the ICare community.
                    </div>

                    <h3 className={styles.h3}>Definition of Introduction</h3>
                    <p className={styles.paragraph}>
                        An <strong>Introduction</strong> happens when ICare enables a caregiver and care receiver (or their family representative) to discover each other and start contact through profile views, messages, booking requests or related platform features.
                    </p>

                    <h3 className={styles.h3}>Protected Period</h3>
                    <p className={styles.paragraph}>
                        The <strong>Protected Period</strong> is <strong>{INTRODUCTION_PROTECTED_PERIOD_MONTHS} months</strong> from the date of first Introduction.
                    </p>

                    <h3 className={styles.h3}>Off-platform engagement</h3>
                    <p className={styles.paragraph}>
                        Off-platform engagement means arranging or continuing paid care work introduced via ICare outside ICare during the Protected Period.
                    </p>

                    <h3 className={styles.h3}>Introduction Fee</h3>
                    <p className={styles.paragraph}>
                        If off-platform engagement happens during the Protected Period, ICare may apply an <strong>Introduction Fee</strong>. The amount is fixed or capped and communicated clearly in advance. This fee is part of fair platform use and is not a punitive charge.
                    </p>

                    <h3 className={styles.h3}>Exceptions</h3>
                    <ul className={styles.ul}>
                        <li>A verifiable pre-existing relationship before the ICare Introduction.</li>
                        <li>Written consent from ICare confirming that off-platform engagement is allowed.</li>
                    </ul>

                    <h3 className={styles.h3}>Caregiver fair use</h3>
                    <p className={styles.paragraph}>
                        Caregivers must not encourage or request off-platform payment or direct arrangements during the Protected Period for ICare Introductions. If this standard is not followed, account access may be restricted or removed.
                    </p>

                    <h3 className={styles.h3}>Purpose of this clause</h3>
                    <p className={styles.paragraph}>
                        This approach protects carers&apos; time, promotes fairness between participants, and supports the long-term sustainability of ICare.
                    </p>
                </section>

                <section id="contact-legal" className={styles.section} aria-label="Contact us about terms">
                    <h2 className={styles.h2}>Questions about these terms</h2>
                    <p className={styles.paragraph}>
                        If you need clarification, contact us at{" "}
                        <a className={styles.inlineLink} href={`mailto:${company.supportEmail}`}>
                            {company.supportEmail}
                        </a>
                        .
                    </p>
                    <p className={styles.paragraph}>
                        You can also review our <NavLink className={styles.inlineLink} to="/privacy">Privacy Policy</NavLink>.
                    </p>
                </section>
            </div>
        </section>
    );
}
