import React from "react";
import VideoSection from "../../common/sections/VideoSection";
import styles from "./three-step-guide.module.scss";

export default function ThreeStepGuide() {
    const bullets = [
        "Create a clear profile and describe your needs or availability",
        "Connect instantly with suitable caregivers or families",
        "Agree care details upfront before anything starts",
        "Begin working together with shared expectations"
    ];

    return (
        <section
            id="how-it-works-steps"
            aria-label="Three steps"
            className={styles.section}
        >
            <div className={styles.container}>
                {/* HEADER */}
                <h2 className={styles.heading}>
                    Get started in 3 simple steps
                </h2>

                <p className={styles.lead}>
                    <b className={styles.brandAccent}>A calmer, guided process</b>.
                    <br />
                    Arrange care directly with clarity and built-in safety.
                </p>

                {/* VIDEO + BULLETS GRID */}
                <div className={styles.grid}>
                    {/* VIDEO */}
                    <VideoSection
                        poster="images/web/how-it-works/3-simple-steps.webp"
                        videoSrc="images/web/how-it-works/howitworks.mp4"
                    />

                    {/* RIGHT COLUMN */}
                    <div>

                        <ul className={styles.list}>
                            {bullets.map((text, i) => (
                                <li key={i} className={styles.listItem}>
                                    <span className={styles.dot} />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
}
