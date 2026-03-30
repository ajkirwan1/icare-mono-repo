import React from "react";
import styles from "./care-timeline.module.scss";

export default function HowItWorksThreeSteps() {
    const steps = [
        {
            n: "1",
            t: "Browse local caregivers or get matched",
            d: "Look through local profiles in Cheltenham and the Cotswolds, or ask us to help you find a good fit nearby.",
        },
        {
            n: "2",
            t: "Message directly",
            d: "Speak with caregivers yourself, ask questions, and get a feel for the person before anything is agreed.",
        },
        {
            n: "3",
            t: "Agree the details together",
            d: "Decide hours, routines, pay and start dates together, without an agency or middle layer.",
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
                    <h2 className={styles.hiwTitle}>How it works</h2>
                    <p className={styles.hiwSub}>
                        A simple local way to find support, talk things through, and make decisions at your own pace.
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
                    <p className={styles.requirementLead}>
                        Before a caregiver can join ICare, they must provide:
                    </p>

                    <div className={styles.requirementBadges} aria-label="Caregiver requirements">
                        <span className={styles.requirementBadge}>Photo ID and UK right to work</span>
                        <span className={styles.requirementBadge}>DBS check</span>
                        <span className={styles.requirementBadge}>Public liability insurance</span>
                    </div>

                    <p className={styles.ctaText}>
                        Looking for someone local in the Cotswolds?
                        <br />
                        You can start with a quiet look around and get in touch when it feels right.
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
                        Join the local list
                    </button>
                </div>
            </div>
        </section>
    );
}
