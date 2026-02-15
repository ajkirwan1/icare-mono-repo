import React from "react";
import VideoSection from "../../common/sections/VideoSection";
import styles from "./how-icare-works-for-caregivers.module.scss";

export default function HowICareWorksForCaregiversSystem() {
    const steps = [
        {
            no: "01",
            title: "Create your profile",
            desc: "Tell us about your experience and availability.",
        },
        {
            no: "02",
            title: "Get matched",
            desc: "Families contact you directly.",
        },
        {
            no: "03",
            title: "Start working together",
            desc: "Agree details and begin quality care work.",
        },
    ];

    return (
        <section
            id="how-it-works"
            aria-label="How ICare works for caregivers"
            className={styles.section}
        >
            <div className={styles.container}>
                {/* HEADER */}
                <header className={styles.header}>
                    <h2 className={styles.h2}>
                        How ICare works for caregivers
                    </h2>

                    <p className={styles.lead}>
                        A clearer way to organise care — built around transparency,
                        autonomy and mutual respect.
                    </p>
                </header>

                {/* VIDEO + STEPS */}
                <div className={styles.grid}>
                    {/* LEFT — VIDEO */}
                    <div className={styles.videoWrap}>
                        <VideoSection poster="images/web/icare-for-caregivers/icare-for-caregivers-placeholder.webp" videoSrc="images/web/icare-for-caregivers/voice.mp4" />
                    </div>

                    {/* RIGHT — STEPS */}
                    <div className={styles.stepsWrap}>
                        <ol className={styles.steps}>
                            {steps.map((s) => (
                                <li key={s.no} className={styles.step}>
                                    <div className={styles.stepNo}>{s.no}</div>

                                    <div className={styles.stepText}>
                                        <h3 className={styles.stepTitle}>
                                            {s.title}
                                        </h3>
                                        <p className={styles.stepDesc}>
                                            {s.desc}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
