import React from "react";
import styles from "./icare-for-caregivers-intro.module.scss";

export default function ICareForCaregiversIntroduction() {
    return (
        <section
            id="caregivers-introduction"
            aria-label="Caregivers introduction"
            className={styles.section}
        >
            <div className={styles.dividerTop} />
            <div className={styles.dividerBottom} />

            <div className={styles.container}>
                {/* HEADER */}
                <header className={styles.header}>
                    <h2 className={styles.h2}>
                        Work independently with clarity and control
                    </h2>

                    <p className={styles.lead}>
                        ICare is being built to support caregivers who value clarity,
                        flexibility and respectful working relationships - with families,
                        directly.
                    </p>

                    <div className={styles.chipsRow} aria-label="Key benefits">
                        <span className={styles.chip}>Direct relationships</span>
                        <span className={styles.chip}>Clear working terms</span>
                        <span className={styles.chip}>Independent control</span>
                    </div>
                </header>

                {/* CONTENT */}
                <div className={styles.grid}>
                    <div className={styles.articles}>
                        {/* LEFT */}
                        <article className={styles.card}>
                            <h3 className={styles.sectionTitle}>
                                The reality of care work
                            </h3>

                            <p className={styles.p}>
                                If you’re a caregiver, you know the realities of this work.
                            </p>

                            <p className={styles.p}>
                                Short visits, changing schedules, unpaid travel time — and too
                                often, feeling treated like a task rather than a professional.
                                Most caregivers didn’t choose this work for that.
                            </p>

                            <p className={styles.p}>
                                You chose care to support people properly, build trust, and
                                make a real difference in everyday life.
                            </p>

                            <div className={styles.highlight}>
                                ICare is being built for caregivers who want calm, direct
                                working relationships - with clarity from the start.
                            </div>
                        </article>

                        {/* RIGHT */}
                        <article className={styles.card}>
                            <h3 className={styles.sectionTitle}>
                                What we are creating
                            </h3>

                            <p className={styles.p}>
                                ICare is a platform for caregivers who value quality and
                                human connection.
                            </p>

                            <p className={styles.p}>
                                It’s not a traditional care agency, and it’s not a basic job
                                board. ICare gives you space to build your own independent
                                practice - with control over your availability, who you work
                                with, and how care is agreed.
                            </p>

                            <p className={styles.p}>
                                We’re starting with companionship support, where presence and
                                trust matter most. This means spending real time together:
                                conversation, routines, everyday activities and reassurance.
                            </p>
                        </article>
                    </div>

                    <img
                        src="images/web/icare-for-caregivers/work-independently.webp"
                        alt="ICare work independently"
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
}
