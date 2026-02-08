import React from "react";
import { Link } from "react-router";
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
                            <Link
                                to="#waitlist"
                                className={`${styles.btn} ${styles.btnOutline}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById("waitlist");
                                    if (!el) return;

                                    const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
                                    window.scrollTo({ top: y, behavior: "smooth" });

                                    window.history.pushState(null, "", "#waitlist");
                                }}
                            >
                                Join the waiting list
                            </Link>

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
                            <Link to="/icare-for-caregivers" className={`${styles.btn} ${styles.btnFill}`}>
                                I’m a caregiver
                            </Link>

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
