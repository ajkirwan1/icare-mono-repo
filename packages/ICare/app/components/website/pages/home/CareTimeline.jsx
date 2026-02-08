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
                    observer.disconnect(); // animacja tylko raz
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
            d: "Begin support knowing what’s agreed. No agency pressure — just a clear arrangement.",
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
                    <h2 className={styles.hiwTitle}>What makes ICare different from agencies</h2>
                    <p className={styles.hiwSub}>
                        A calmer path through a big decision with clear steps and no pressure.
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
