import React from "react";
import styles from "./about-icare-section.module.scss";
import NavigationButton from "../../../common/buttons/navigation-buttons/navigation-button";
import { Link } from "react-router";

export default function AboutICareSection() {
    return (
        <section
            className={styles.section}
            aria-labelledby="about-icare-heading"
        >
            <div className={styles.gridThreeQuarter}>
                <img
                    src="images/web/homepage/oldwoman.png"
                    alt="Person receiving care at home"
                    className={styles.image}
                />

                <div>
                    <h2 id="about-icare-heading" className={styles.title}>
                        Care that fits real life
                    </h2>

                    <p className={styles.subtitle}>Across the UK and Europe, populations are ageing and more people are living longer with changing support needs. At the same time, families often balance care alongside work, distance and everyday responsibilities.</p>

                    <p className={styles.subtitle}>This has increased the need for care that works around real life - not only long-term or intensive support, but also companionship and everyday help that fits daily routines.</p>

                    <p className={styles.subtitle}>ICare brings families and independent caregivers together in one place, supporting direct communication, clear expectations and transparent costs</p>


                    {/* CARE GUIDANCE LINK */}
                    <p className={styles.subtitle}>
                        <Link
                            to="/care-knowledge"
                        >Learn more in Care guidance
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
