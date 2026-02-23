import React from "react";
import styles from "./care-timeline.module.scss";

export default function HowItWorksThreeSteps() {
    const steps = [
        {
            n: "1",
            t: "Browse and compare carers",
            d: "See clear profiles, availability and companionship support — so you can shortlist with confidence.",
        },
        {
            n: "2",
            t: "Message and agree the details",
            d: "Talk directly and confirm tasks, hours, start date and expectations — in one place.",
        },
        {
            n: "3",
            t: "Start care with clarity",
            d: "Begin support knowing what’s agreed. No agency pressure - just a clear arrangement.",
        },
    ];

    return (
        <section
            id="how-it-works"
            aria-label="How ICare works"
            className={styles.hiwSection}
        >
            <div className={styles.hiwContainer}>
                <div className={styles.hiwHeader}>
                    <h2 className={styles.hiwTitle}>A different way to begin care</h2>
                    <p className={styles.hiwSub}>
                        A calmer path through a big decision with clear steps and no pressure.
                    </p>
                </div>

                <ol className={styles.hiwGrid}>
                    {steps.map((x) => (
                        <li key={x.t} className={styles.hiwCard}>
                            <div className={styles.hiwCardTop}>
                                <span className={styles.stepNumber} aria-hidden="true">{x.n}</span>
                                <h3 className={styles.hiwH3}>{x.t}</h3>
                            </div>
                            <p className={styles.hiwP}>{x.d}</p>
                        </li>
                    ))}
                </ol>

                <div className={styles.ctaWrap}>
                    <p className={styles.ctaText}>
                        Want early access in your area?
                        <br />
                        Join the waiting list - we will notify you when ICare opens near you.
                    </p>

                    <button
                        type="button"
                        className={styles.ctaBtn}
                        onClick={() => {
                            const el = document.getElementById("waitlist");
                            if (!el) return;

                            const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
                            window.scrollTo({ top: y, behavior: "smooth" });
                            window.history.pushState(null, "", "#waitlist");
                        }}
                    >
                        Join the waiting list
                    </button>
                </div>
            </div>
        </section>
    );
}
