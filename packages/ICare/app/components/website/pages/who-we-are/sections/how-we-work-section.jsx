import { useEffect, useRef } from "react";
import { Link } from "react-router";
import styles from "./how-we-work-section.module.scss";

const steps = [
    {
        step: 1,
        title: "Brief & preferences",
        description:
            "Share your needs, schedule and preferred skills. We only ask for information that helps you find the right match.",
        image: "images/web/who-we-are/brief.jpg",
        imageAlt: "Family filling out care preferences form",
        width: 3712,
        height: 5568,
    },
    {
        step: 2,
        title: "Browse & message",
        description:
            "View caregiver profiles and message people directly when you feel ready.",
        image: "images/web/who-we-are/directmatching.jpg",
        imageAlt: "Browsing caregiver profiles on the platform",
        width: 3840,
        height: 5760,
    },
    {
        step: 3,
        title: "Agree & start",
        description:
            "Discuss tasks, hours and start date directly with the caregiver. We share simple guidance to help you set clear expectations.",
        image: "images/web/who-we-are/icare-agree-and-start.webp",
        imageAlt: "Family and caregiver agreeing on care arrangements",
        width: 1284,
        height: 817,
    },
];

export function HowWeWorkSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll(`.${styles.stepItem}`);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cards.forEach((card) => card.classList.add("is-visible"));
                    observer.disconnect();
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="howwework"
            aria-labelledby="howwework-heading"
            ref={sectionRef}
            className={styles.section}
        >
            <div className={styles.wrap}>
                <header className={styles.headerBlock}>
                    <h2 id="howwework-heading" className={styles.heading}>
                        How we work
                    </h2>

                    <p className={styles.leadText}>
                        <strong className={styles.leadStrong}>
                            A simple, transparent way to arrange companionship at home.
                        </strong>
                        Browse verified caregiver profiles, message directly, and agree support
                        that fits your routine.
                    </p>
                </header>

                <ol className={styles.stepsList}>
                    {steps.map((s) => (
                        <li key={s.step} className={styles.stepItem}>
                            <div className={styles.stepImageWrap}>
                                <div className={styles.stepImageFrame}>
                                    <img
                                        src={s.image}
                                        alt={s.imageAlt}
                                        width={s.width}
                                        height={s.height}
                                        className={styles.stepImage}
                                    />
                                </div>
                            </div>

                            <div className={styles.stepContent}>
                                <h3 className={styles.stepTitle}>
                                    <span className={styles.stepNumber}>{s.step}.</span>
                                    {s.title}
                                </h3>
                                <p className={styles.stepDescription}>
                                    {s.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className={styles.ctaWrap}>
                    <Link to="/how-it-works" className={styles.ctaLink}>
                        Explore full process
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
