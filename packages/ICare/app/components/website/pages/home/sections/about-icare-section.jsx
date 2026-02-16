import React from "react";
import styles from "./about-icare-section.module.scss";

export default function AboutICareSection() {
    return (
        <section
            className={styles.section}
            aria-labelledby="about-icare-heading"
        >
            <div className={styles.gridSplit}>
                <img
                    src="images/web/homepage/oldwoman.png"
                    alt="Person receiving care at home"
                    className={styles.image}
                />

                <div>
                    <h2 id="about-icare-heading" className={styles.title}>
                        Support that works around your life
                    </h2>

                    <p className={styles.subtitle}>
                        Across the UK, families balance care alongside work, distance and everyday responsibilities.
                        Support needs change over time, and not every situation calls for intensive or long-term care.
                    </p>

                    <p className={styles.subtitle}>
                        That's why ICare focuses on companionship and everyday support that fits naturally into daily life.
                    </p>

                    <p className={styles.subtitle}>
                        We bring families and independent caregivers together, making it easier to talk openly and agree
                        arrangements that feel right.
                    </p>

                    <p className={styles.subtitle}>
                        Caregivers on ICare work directly with families, offer flexible arrangements, and are supported by real
                        people when questions arise.
                    </p>

                    <p className={styles.subtitle}>
                        Before appearing on ICare, every caregiver completes a basic verification process, helping families
                        explore care options with greater confidence.
                    </p>
                </div>
            </div>

            <div className={styles.badgeGrid} aria-label="ICare support highlights">
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <rect x="4.5" y="4.5" width="15" height="15" rx="2.5" />
                                <path d="M8 9.5h8M8 13h5" />
                                <path d="M8.2 16.1l1.4 1.4 3.3-3.3" />
                            </svg>
                        </span>
                        Transparent arrangements
                    </p>
                    <p className={styles.badgeText}>
                        Clear expectations, direct conversations and no hidden layers.
                    </p>
                </div>
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="7.5" />
                                <path d="M12 8v4.4l2.8 1.6" />
                            </svg>
                        </span>
                        Care on your terms
                    </p>
                    <p className={styles.badgeText}>
                        Support that adjusts as life changes.
                    </p>
                </div>
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M4.5 7.5h10M4.5 12h15M4.5 16.5h9" />
                                <circle cx="16.5" cy="7.5" r="2" />
                                <circle cx="9.5" cy="12" r="2" />
                                <circle cx="14.5" cy="16.5" r="2" />
                            </svg>
                        </span>
                        Time to choose
                    </p>
                    <p className={styles.badgeText}>
                        Conversations first, decisions at your pace.
                    </p>
                </div>
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M4.5 14.5v-5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-6.8L6.5 20v-2.5h-1a1 1 0 0 1-1-1z" />
                                <circle cx="9" cy="12" r="0.9" />
                                <circle cx="12" cy="12" r="0.9" />
                                <circle cx="15" cy="12" r="0.9" />
                            </svg>
                        </span>
                        Support that feels human
                    </p>
                    <p className={styles.badgeText}>
                        A real point of contact when you need reassurance.
                    </p>
                </div>
            </div>
        </section>
    );
}
