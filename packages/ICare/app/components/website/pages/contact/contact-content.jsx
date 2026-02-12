import React from "react";
import { NavLink } from "react-router";
import styles from "./contact-content.module.scss";

const company = {
    brand: "ICare",
    email: "hello@icare-app.co.uk",
    lastUpdated: "January 28, 2026",
};

export default function ContactContent() {
    return (
        <section className={styles.page} aria-label="Contact Us">
            <div className={styles.container}>
                {/* HEADER */}
                <header className={styles.header}>
                    <h1 className={styles.h1}>Contact Us</h1>

                    <div className={styles.metaRow}>
                        <span className={styles.metaItem}>
                            Last updated: <strong>{company.lastUpdated}</strong>
                        </span>
                    </div>

                    <p className={styles.lead}>
                        We want to hear from you. Whether you're a family member exploring companionship care for a loved one, a caregiver
                        interested in joining our community, or just someone with a question about what we're building, we're here to help.
                    </p>

                    <p className={styles.note}>
                        We're still in our early stages, building a platform that connects families with trusted companions for elderly adults
                        across the UK. Your questions, feedback, and ideas help shape what we're creating.
                    </p>
                </header>

                <div className={styles.separator} />

                {/* INTRODUCTION */}
                <section className={styles.section} aria-label="Introduction">
                    <h2 className={styles.h2}>Introduction</h2>

                    <p className={styles.paragraph}>
                        We want to hear from you. Whether you're a family member exploring companionship care for a loved one, a caregiver
                        interested in joining our community, or just someone with a question about what we're building, we're here to help.
                    </p>

                    <p className={styles.paragraph}>
                        We're still in our early stages, building a platform that connects families with trusted companions for elderly adults
                        across the UK. Your questions, feedback, and ideas help shape what we're creating.
                    </p>
                </section>

                <div className={styles.separator} />

                {/* GENERAL INQUIRIES */}
                <section className={styles.section} aria-label="General inquiries">
                    <h2 className={styles.h2}>General Inquiries</h2>

                    <p className={styles.paragraph}>
                        For general questions about {company.brand}, our vision, or how the platform will work:
                    </p>

                    <p className={styles.paragraph}>
                        <strong>Email:</strong>{" "}
                        <a className={styles.inlineLink} href={`mailto:${company.email}`}>
                            {company.email}
                        </a>
                    </p>

                    <p className={styles.paragraph}>
                        We read every message and aim to respond within <strong>2 business days</strong>. Please bear with us during this
                        pre-launch phase — we're a small team working hard to get everything right.
                    </p>
                </section>

                <div className={styles.separator} />

                {/* FOR FAMILIES */}
                <section className={styles.section} aria-label="For families">
                    <h2 className={styles.h2}>For Families</h2>

                    <p className={styles.paragraph}>
                        If you're seeking companionship care for an elderly parent or loved one, we'd love to hear about your situation.
                    </p>

                    <p className={styles.paragraph}>
                        While we're not yet operational, understanding your needs helps us build something that truly serves families. Feel
                        free to share your story, ask questions about our safety approach, or let us know what matters most to you when
                        choosing care.
                    </p>

                    <p className={styles.paragraph}>
                        We'll keep you updated on our progress and notify you when we're ready to welcome our first families.
                    </p>

                    <div className={styles.callout} role="note" aria-label="Join the waitlist">
                        <strong>Join the Waitlist:</strong> Be among the first families to access the platform when we launch.
                    </div>
                </section>

                <div className={styles.separator} />

                {/* FOR CAREGIVERS */}
                <section className={styles.section} aria-label="For caregivers">
                    <h2 className={styles.h2}>For Caregivers</h2>

                    <p className={styles.paragraph}>
                        If you're a caregiver interested in offering companionship services through {company.brand}, we want to hear from you
                        too.
                    </p>

                    <p className={styles.paragraph}>
                        Tell us about your experience, what you're looking for in a platform, or what would make care work more rewarding for
                        you. Your insights directly influence how we design the caregiver experience.
                    </p>

                    <p className={styles.paragraph}>
                        Whether you're an experienced carer frustrated with agencies or someone exploring a meaningful career change, we're
                        building this with you in mind.
                    </p>

                    <div className={styles.callout} role="note" aria-label="Join caregiver waitlist">
                        <strong>Join the Caregiver Waitlist:</strong> Get early access when we launch and help shape the platform.
                    </div>
                </section>

                <div className={styles.separator} />

                {/* PRESS & PARTNERSHIPS */}
                <section className={styles.section} aria-label="Press and partnerships">
                    <h2 className={styles.h2}>Press and Partnerships</h2>

                    <p className={styles.paragraph}>
                        For media inquiries, partnership opportunities, or business-related questions:
                    </p>

                    <p className={styles.paragraph}>
                        <strong>Email:</strong>{" "}
                        <a className={styles.inlineLink} href={`mailto:${company.email}`}>
                            {company.email}
                        </a>{" "}
                        <span className={styles.muted}>
                            (please mark &quot;Press&quot; or &quot;Partnership&quot; in the subject line)
                        </span>
                    </p>

                    <p className={styles.paragraph}>
                        We're open to conversations with organisations who share our commitment to improving elderly care and tackling
                        loneliness.
                    </p>
                </section>

                <div className={styles.separator} />

                {/* SOCIAL MEDIA */}
                <section className={styles.section} aria-label="Social media">
                    <h2 className={styles.h2}>Social Media</h2>

                    <p className={styles.paragraph}>We're building in public and sharing our journey as we go.</p>

                    <p className={styles.paragraph}>
                        Follow along for updates, care guidance content, and behind-the-scenes insights:
                    </p>

                    <ul className={styles.ul}>
                        <li>
                            <strong>Facebook:</strong> Coming Soon
                        </li>
                        <li>
                            <strong>LinkedIn:</strong> Coming Soon
                        </li>
                        <li>
                            <strong>Instagram:</strong> Coming Soon
                        </li>
                    </ul>

                    <p className={styles.paragraph}>
                        For now, the best way to stay connected is to join our waitlist or subscribe to our Care Guidance newsletter.
                    </p>
                </section>

                <div className={styles.separator} />

                {/* RESPONSE TIMES */}
                <section className={styles.section} aria-label="Response times">
                    <h2 className={styles.h2}>Response Times</h2>

                    <p className={styles.paragraph}>
                        We're a small team building something meaningful. While we aim to respond to all inquiries within{" "}
                        <strong>2 business days</strong>, some questions may take longer as we're focused on getting the platform ready for
                        launch.
                    </p>

                    <p className={styles.paragraph}>Thank you for your patience and for your interest in {company.brand}.</p>
                </section>

                <div className={styles.separator} />

                {/* FOOT LINKS */}
                <section className={styles.section} aria-label="Links">
                    <h2 className={styles.h2}>Quick links</h2>

                    <p className={styles.paragraph}>
                        <NavLink to="/#waitlist" className={styles.inlineLink}>
                            Join the Waitlist
                        </NavLink>{" "}
                        <span className={styles.muted}>|</span>{" "}
                        <NavLink to="/care-knowledge" className={styles.inlineLink}>
                            Care Guidance
                        </NavLink>{" "}
                        <span className={styles.muted}>|</span>{" "}
                        <NavLink to="/privacy" className={styles.inlineLink}>
                            Privacy Policy
                        </NavLink>
                    </p>
                </section>

                {/* BIG bottom padding so it breathes above the footer */}
                <div className={styles.pageBottomSpace} aria-hidden="true" />
            </div>
        </section>
    );
}
