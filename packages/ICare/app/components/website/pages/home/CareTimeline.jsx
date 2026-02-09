import React, { useEffect, useRef } from "react";
import styles from "./care-timeline.module.scss";

export default function HowItWorksThreeSteps() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll(`.${styles.hiwCard}`);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cards.forEach((card) => card.classList.add(styles.isVisible));
                    observer.disconnect();
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const steps = [
        {
            n: "1",
            t: "Browse and choose a companion",
            d: "View clear caregiver profiles and choose someone who feels right for your home.",
        },
        {
            n: "2",
            t: "Talk and agree the details",
            d: "Message directly to agree routines, hours and start dates with confidence.",
        },
        {
            n: "3",
            t: "Begin companionship calmly",
            d: "Start support knowing everything is clear and agreed — without agency pressure.",
        },
    ];

    return (
        <section
            id="how-it-works"
            aria-label="How ICare works"
            className={styles.hiwSection}
            ref={sectionRef}
        >
            <div className={styles.hiwContainer}>
                <div className={styles.hiwHeader}>
                    <h2 className={styles.hiwTitle}>
                        A calmer way to arrange companionship
                    </h2>
                    <p className={styles.hiwSub}>
                        Simple steps to help you make a big decision with clarity and confidence.
                    </p>
                </div>

                <div className={styles.hiwGrid}>
                    {steps.map((x) => (
                        <div key={x.t} className={styles.hiwCard}>
                            <div className={styles.hiwCardTop}>
                                <span className={styles.stepNumber}>{x.n}</span>
                                <h3 className={styles.hiwH3}>{x.t}</h3>
                            </div>
                            <p className={styles.hiwP}>{x.d}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.ctaWrap}>
                    <p className={styles.ctaText}>
                        Want early access in your area?
                        <br />
                        Join the waiting list and we’ll let you know when ICare opens near you.
                    </p>

                    <button
                        type="button"
                        className={styles.ctaBtn}
                        onClick={() => {
                            const el = document.getElementById("waitlist");
                            if (!el) return;

                            const y =
                                el.getBoundingClientRect().top +
                                window.pageYOffset -
                                60;
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
