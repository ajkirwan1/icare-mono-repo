import styles from "./receivers-three-steps.module.scss";

export default function ReceiversThreeStepsStyledLikeHowWeWork() {
    const steps = [
        {
            step: 1,
            title: "Browse or get matched with verified caregiver profiles",
            description:
                "Review key details upfront - experience, availability, and the checks or documents a caregiver chooses to share on their profile.",
            img: "images/web/icare-for-carereceivers/newpic.webp",
            alt: "Browsing caregiver profiles",
        },
        {
            step: 2,
            title: "Message privately in one place",
            description:
                "Ask questions, request references, and check the fit before you agree - directly, without an agency intermediary.",
            img: "images/web/icare-for-carereceivers/privately.png",
            alt: "Messaging and discussing care",
        },
        {
            step: 3,
            title: "Agree the plan upfront",
            description:
                "Confirm tasks, schedule and rate before support starts - with clear terms you agree together.",
            img: "images/web/icare-for-carereceivers/agreed.png",
            alt: "Agreeing a plan and schedule",
        },
    ];

    return (
        <section
            id="receivers-3-steps"
            aria-label="Arrange home support with structure and safety-first tools"
            className={styles.section}
        >
            <div className={styles.container}>
                {/* HEADING BLOCK */}
                <div className={styles.headingBlock}>
                    <h2 className={styles.title}>
                        Care arranged simply with built-in safety
                    </h2>

                    <p className={styles.subtitle}>
                        <span className={styles.subtitleLine}>
                            <strong className={styles.subtitleStrong}>
                                Browse yourself or get matched.
                            </strong>
                        </span>

                        <span className={styles.subtitleText}>
                            Choose to browse yourself or get matched - then arrange support directly with{" "}
                            <strong className={styles.bold}>clear information</strong>,{" "}
                            <strong className={styles.bold}>simple agreements</strong> and{" "}
                            <strong className={styles.bold}>safety-first tools.</strong>
                        </span>
                    </p>
                </div>

                {/* STEPS GRID */}
                <ol className={styles.stepsGrid}>
                    {steps.map((s) => (
                        <li key={s.step} className={styles.stepCard}>
                            <div className={styles.stepCardInner}>
                                <h3 className={styles.stepTitle}>
                                    <span className={styles.stepNo}>{s.step}.</span>
                                    {s.title}
                                </h3>

                                <p className={styles.stepDesc}>{s.description}</p>
                            </div>

                            {/* IMAGE */}
                            <div className={styles.stepMedia}>
                                <div className={styles.stepMediaFrame}>
                                    <img
                                        src={s.img}
                                        alt={s.alt}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        className={styles.stepMediaImg}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>


                {/* reassurance */}
                <p className={styles.reassurance}>
                    <strong>Need support?</strong>
                    ICare is a matching platform - we can help you use the tools, update your search, or change a match,
                    without agency pressure.
                </p>
            </div>
        </section>
    );
}
