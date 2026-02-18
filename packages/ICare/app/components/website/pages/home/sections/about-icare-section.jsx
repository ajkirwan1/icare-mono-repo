import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faClock, faSliders, faComments } from "@fortawesome/free-solid-svg-icons";
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
                        That&apos;s why ICare focuses on companionship and everyday support that fits naturally into daily life.
                    </p>

                    <p className={styles.subtitle}>
                        We bring families and independent caregivers together, making it easier to talk openly and agree
                        arrangements that feel right - with flexible support and real people available when questions
                        arise.
                    </p>

                    <p className={styles.subtitle}>
                        Every caregiver on ICare completes a basic verification process, including{" "}
                        <span className={styles.verificationAccent}>DBS checks, references and experience shortlisting</span>.
                    </p>

                    <p className={styles.subtitle}>
                        Built-in safeguards help families explore care options with confidence and a greater sense of
                        control.
                    </p>
                </div>
            </div>

            <div className={styles.badgeGrid} aria-label="ICare support highlights">
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">
                            <FontAwesomeIcon icon={faListCheck} />
                        </span>
                        Transparent arrangements
                    </p>
                    <p className={styles.badgeText}>
                        Clear expectations, direct conversations and no extra layers.
                    </p>
                </div>
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">
                            <FontAwesomeIcon icon={faSliders} />
                        </span>
                        Care on your terms
                    </p>
                    <p className={styles.badgeText}>
                        Support that adapts as life changes.
                    </p>
                </div>
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">

                            <FontAwesomeIcon icon={faClock} />
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
                            <FontAwesomeIcon icon={faComments} />
                        </span>
                        Support that feels human
                    </p>
                    <p className={styles.badgeText}>
                        A real person to speak to, when you need reassurance.
                    </p>
                </div>
            </div>
        </section>
    );
}
