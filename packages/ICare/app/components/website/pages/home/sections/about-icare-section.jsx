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
                    src="/images/web/homepage/lipstickoldwoman.jpg"
                    alt="Older woman putting on lipstick at home"
                    className={styles.image}
                />

                <div>
                    <h2 id="about-icare-heading" className={styles.title}>
                        Built locally, for families here
                    </h2>

                    <p className={styles.subtitle}>
                        ICare started in Cheltenham with one simple idea: finding the right person matters just as much as finding the right help.
                    </p>

                    <p className={styles.subtitle}>
                        Many families do not want a large agency process. They want to speak to someone local, take their time, and make a choice that feels calm and personal.
                    </p>

                    <p className={styles.subtitle}>
                        ICare makes those introductions directly between families and independent caregivers, so the relationship stays personal from the start.
                    </p>
                </div>
            </div>

            <div className={styles.badgeGrid} aria-label="ICare support highlights">
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">
                            <FontAwesomeIcon icon={faListCheck} />
                        </span>
                        Open and direct care
                    </p>
                    <p className={styles.badgeText}>
                        You speak with caregivers yourself, with no agency sitting in the middle.
                    </p>
                </div>
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">
                            <FontAwesomeIcon icon={faSliders} />
                        </span>
                        Care agreed together
                    </p>
                    <p className={styles.badgeText}>
                        Hours, routines and visits can be agreed in a way that fits real life.
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
                        Families can ask questions, talk things through, and decide when they are ready.
                    </p>
                </div>
                <div className={styles.badge}>
                    <p className={styles.badgeTitle}>
                        <span className={styles.badgeIcon} aria-hidden="true">
                            <FontAwesomeIcon icon={faComments} />
                        </span>
                        Local and personal
                    </p>
                    <p className={styles.badgeText}>
                        Locally run, rooted in the Cotswolds, and built around real people.
                    </p>
                </div>
            </div>
        </section>
    );
}
