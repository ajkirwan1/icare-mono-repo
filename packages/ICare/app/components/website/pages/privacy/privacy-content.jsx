import React from "react";
import { NavLink } from "react-router";
import styles from "./privacy-content.module.scss";

const company = {
    brand: "ICare",
    operator: "ICare (sole trader, United Kingdom)",
    tradingAs: "ICare",
    email: "hello@icare.com",

    lastUpdated: "January 28, 2026",
};

export default function PrivacyContent() {
    return (
        <section className={styles.page} aria-label="Privacy Policy">
            <div className={styles.container}>
                {/* HEADER */}
                <header className={styles.header}>
                    <h1 className={styles.h1}>Privacy Policy</h1>

                    <div className={styles.metaRow}>
                        <span className={styles.metaItem}>
                            Last updated: <strong>{company.lastUpdated}</strong>
                        </span>
                    </div>

                    <p className={styles.lead}>
                        This Privacy Policy explains how <strong>{company.brand}</strong> (“we”, “us”) collects,
                        uses and protects personal data when you use our website and platform marketplace.
                    </p>

                    <div className={styles.callout} role="note" aria-label="Scope note">
                        <strong>Scope:</strong> This policy applies to <strong>care receivers/families</strong> and{" "}
                        <strong>caregivers</strong> using ICare. ICare is an <strong>introductory marketplace</strong>{" "}
                        (not a care agency). Families and caregivers communicate directly and make arrangements between themselves.
                    </div>

                    <p className={styles.note}>
                        Cookies details:{" "}
                        <NavLink to="/cookies" className={styles.inlineLink}>
                            Cookies
                        </NavLink>
                        . Essential cookies may be used to keep the site working securely. We ask for consent for non-essential
                        cookies (if enabled).
                    </p>
                </header>

                <div className={styles.separator} />

                {/* 1) WHO WE ARE */}
                <section className={styles.section} aria-label="Who we are">
                    <h2 className={styles.h2}>1) Who we are</h2>

                    <div className={styles.tableWrap} role="region" aria-label="Who we are table">
                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <th scope="row">Operator</th>
                                    <td>
                                        <strong>{company.operator}</strong> trading as <strong>{company.tradingAs}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Contact</th>
                                    <td>
                                        <a className={styles.inlineLink} href={`mailto:${company.email}`}>
                                            {company.email}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>{company.address}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Our role</th>
                                    <td>
                                        We act as the controller for personal data collected through the ICare website and platform features.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className={styles.paragraph}>
                        Families and caregivers are independent parties. If you share personal data directly with the other party
                        (e.g., in messages, calls or agreements), they will handle that data separately under their own
                        responsibility.
                    </p>
                </section>

                <div className={styles.separator} />

                {/* 2) AT A GLANCE */}
                <section className={styles.section} aria-label="At a glance">
                    <h2 className={styles.h2}>2) At a glance</h2>
                    <p className={styles.paragraph}>
                        This table summarises what we collect, why, the legal basis, and typical retention.
                    </p>

                    <div className={styles.tableWrap} role="region" aria-label="At a glance table">
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th scope="col">What we collect</th>
                                    <th scope="col">Why we collect it</th>
                                    <th scope="col">Legal basis (UK GDPR)</th>
                                    <th scope="col">Typical retention</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Waitlist / enquiry details (email, area/postcode, care preferences, optional notes)</td>
                                    <td>Respond to you, plan platform launch by area, provide requested updates</td>
                                    <td>Contract steps; Legitimate interests; Consent (optional updates)</td>
                                    <td> Platform launch period or until you request deletion / unsubscribe</td>
                                </tr>
                                <tr>
                                    <td>Account & profile info (name, contact details, availability, experience you choose to share)</td>
                                    <td>Provide marketplace features and show relevant profile information</td>
                                    <td>Contract; Legitimate interests</td>
                                    <td>While account is active, then a limited period for safety/legal needs</td>
                                </tr>
                                <tr>
                                    <td>Messages in-platform (content + basic metadata)</td>
                                    <td>Enable direct communication; support safety investigations if needed</td>
                                    <td>Contract; Legitimate interests</td>
                                    <td>While account is active, then limited period for dispute/safety reasons</td>
                                </tr>
                                <tr>
                                    <td>Technical data (IP address, device/browser info, security logs)</td>
                                    <td>Security, fraud prevention, debugging, performance</td>
                                    <td>Legitimate interests; Legal obligations (where applicable)</td>
                                    <td>Short, limited period (security/debugging)</td>
                                </tr>
                                <tr>
                                    <td>Cookies (essential + optional analytics, if enabled)</td>
                                    <td>Run the site securely; understand usage; improve UX</td>
                                    <td>Legitimate interests (essential); Consent (non-essential)</td>
                                    <td>Per cookie settings (see Cookies page)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className={styles.separator} />

                {/* 3) WHAT WE COLLECT */}
                <section className={styles.section} aria-label="Personal data we collect">
                    <h2 className={styles.h2}>3) Personal data we collect</h2>

                    <ul className={styles.ul}>
                        <li>
                            <strong>Waitlist / enquiries:</strong> email, area/postcode, care preferences, optional notes.
                        </li>
                        <li>
                            <strong>Accounts & profiles (if enabled):</strong> name/contact details, location/availability, and
                            information you choose to share (e.g., experience, skills, references).
                        </li>
                        <li>
                            <strong>Messages (if enabled):</strong> content you send via the platform, plus basic metadata.
                        </li>
                        <li>
                            <strong>Technical data:</strong> IP address, device/browser info, approximate location (derived from IP),
                            security logs.
                        </li>
                    </ul>

                    <div className={styles.callout} role="note" aria-label="Sensitive data note">
                        Please avoid sharing unnecessary sensitive details in free-text fields. Where possible, keep medical
                        information minimal and relevant.
                    </div>
                </section>

                <div className={styles.separator} />

                {/* 4) HOW WE USE */}
                <section className={styles.section} aria-label="How we use your data">
                    <h2 className={styles.h2}>4) How we use your data</h2>

                    <ul className={styles.ul}>
                        <li>To record your request and respond to you.</li>
                        <li>To provide marketplace features you use (profiles, messaging, support).</li>
                        <li>To prioritise and plan the platfrom launch by area and care needs (e.g., Cheltenham first).</li>
                        <li>To keep the service secure and prevent misuse.</li>
                        <li>To improve the product (debugging, performance, basic analytics if enabled).</li>
                    </ul>
                </section>

                <div className={styles.separator} />

                {/* 5) SHARING */}
                <section className={styles.section} aria-label="Sharing your data">
                    <h2 className={styles.h2}>5) Sharing your data</h2>

                    <p className={styles.paragraph}>
                        We do not sell your personal data. We share it only where necessary to operate the ICare platform:
                    </p>

                    <ul className={styles.ul}>
                        <li>
                            <strong>Service providers:</strong> hosting, email delivery, security tools, and analytics (if enabled).
                            These providers process data on our behalf under appropriate contractual terms.
                        </li>
                        <li>
                            <strong>Legal reasons:</strong> if required by law, or to protect users, investigate abuse, or prevent
                            misuse.
                        </li>
                    </ul>

                    <p className={styles.paragraph}>
                        If we add payments later, payment providers will process payment data under their own privacy policies. We
                        will update this policy before launching payments.
                    </p>
                </section>

                <div className={styles.separator} />

                {/* 6) EMAILS */}
                <section className={styles.section} aria-label="Emails">
                    <h2 className={styles.h2}>6) Emails (waitlist and updates)</h2>

                    <p className={styles.paragraph}>
                        We use your email address to (1) confirm your request and respond to enquiries, (2) send essential service
                        messages, and (3) send optional launch updates if you opted in.
                    </p>

                    <p className={styles.paragraph}>
                        You can unsubscribe from optional updates at any time. If you unsubscribe, we may still send important
                        service-related emails (e.g., to respond to your enquiry).
                    </p>
                </section>

                <div className={styles.separator} />

                {/* 7) RETENTION */}
                <section className={styles.section} aria-label="Data retention">
                    <h2 className={styles.h2}>7) Data retention</h2>

                    <p className={styles.paragraph}>
                        We keep personal data only as long as needed for the platform service, safety, and legal requirements.
                    </p>

                    <ul className={styles.ul}>
                        <li>
                            <strong>Waitlist:</strong> until the platform launch period ends, you unsubscribe, or you request deletion.
                        </li>
                        <li>
                            <strong>Support enquiries:</strong> as long as needed to respond and resolve issues.
                        </li>
                        <li>
                            <strong>Technical logs:</strong> kept for a limited period for security and debugging.
                        </li>
                    </ul>
                </section>

                <div className={styles.separator} />

                {/* 8) RIGHTS */}
                <section className={styles.section} aria-label="Your rights">
                    <h2 className={styles.h2}>8) Your rights (UK GDPR)</h2>

                    <p className={styles.paragraph}>
                        Depending on your circumstances, you may have rights to request access, correction, deletion, restriction,
                        object to processing, data portability, and to withdraw consent where processing is based on consent.
                    </p>

                    <p className={styles.paragraph}>
                        To exercise your rights, contact us at{" "}
                        <a className={styles.inlineLink} href={`mailto:${company.email}`}>
                            {company.email}
                        </a>
                        .
                    </p>
                </section>

                <div className={styles.separator} />

                {/* 9) SECURITY + CHANGES */}
                <section className={styles.section} aria-label="Security and changes">
                    <h2 className={styles.h2}>9) Security and updates</h2>

                    <p className={styles.paragraph}>
                        We use reasonable technical and organisational measures to protect personal data (e.g., access controls,
                        secure hosting, and monitoring). No method of transmission is 100% secure, so please avoid sharing sensitive
                        personal information unless necessary.
                    </p>

                    <p className={styles.paragraph}>
                        We may update this policy from time to time. The “Last updated” date at the top shows when it was last
                        changed.
                    </p>

                    <p className={styles.paragraph}>
                        If you have concerns, contact us first at{" "}
                        <a className={styles.inlineLink} href={`mailto:${company.email}`}>
                            {company.email}
                        </a>

                    </p>
                </section>

                {/* BIG bottom padding so it breathes above the footer */}
                <div className={styles.pageBottomSpace} aria-hidden="true" />
            </div>
        </section>
    );
}
