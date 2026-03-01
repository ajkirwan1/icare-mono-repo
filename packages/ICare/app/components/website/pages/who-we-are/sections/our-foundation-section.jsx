import styles from "../../../../../styles/components/website/pages/who-we-are/sections/first-section.module.scss";

export function OurFoundationSection() {
    return (
        <>
            <section
                id="foundation"
                aria-label="Our foundation and mission"
                className={styles.grid}
            >
                <div className={styles.colLeft}>
                    <div className={styles.colInner}>
                        <h2 className={styles.heading}>The people behind ICare</h2>
                        <p className={styles.descriptor}>FOUNDERS</p>
                        <div className={styles.mobileFounders}>
                            <div className={styles.foundersStack}>
                                <div className={styles.founderRow}>
                                    <div className={styles.founderImageWrap}>
                                        <img
                                            src="/images/kasia2.png"
                                            alt="Kasia Kruk-Kirwan — Founder of ICare"
                                            className={`${styles.founderImage} ${styles.founderImageKasia}`}
                                        />
                                    </div>
                                    <p className={styles.founderName}>Kasia Kruk-Kirwan</p>
                                </div>

                                <div className={styles.founderRow}>
                                    <div className={styles.founderImageWrap}>
                                        <img
                                            src="/images/mx.jpeg"
                                            alt="Maximilian Herbst — Founder of ICare"
                                            className={styles.founderImage}
                                        />
                                    </div>
                                    <p className={styles.founderName}>Maximilian Herbst</p>
                                </div>
                            </div>
                        </div>
                        <p className={styles.paragraph}>
                            ICare didn't start with a business plan.
                            <br />
                            It started with noticing how often care becomes
                            complicated, rushed, or impersonal - at the very moment when people need calm and
                            understanding the most.
                        </p>
                        <p className={styles.paragraph}>
                            We've spent time close to care.
                            <br />
                            Listening to families trying to do the right thing.
                            Speaking with caregivers who care deeply about their work, and who often carry more than
                            people realise. Kasia has worked as a caregiver herself, and that experience
                            quietly shaped how we see trust, responsibility, and dignity.
                        </p>
                        <p className={styles.paragraph}>
                            Over time, those conversations began to connect. ICare grew slowly, from real moments and
                            real needs - not from an idea of how care should look, but from how it actually feels.
                        </p>
                        <p className={styles.paragraph}>
                            What matters to us is simple.
                            <br />
                            Care should feel human. Clear. Grounded in trust.
                        </p>
                        <p className={styles.paragraph}>
                            That's where ICare begins.
                        </p>
                    </div>
                </div>

                <div className={styles.colRight}>
                    <div className={styles.colInner}>
                        <div className={styles.desktopFounders}>
                            <div className={styles.foundersStack}>
                            <div className={styles.founderRow}>
                                <div className={styles.founderImageWrap}>
                                    <img
                                        src="/images/kasia2.png"
                                        alt="Kasia Kruk-Kirwan — Founder of ICare"
                                        className={`${styles.founderImage} ${styles.founderImageKasia}`}
                                    />
                                </div>
                                <p className={styles.founderName}>Kasia Kruk-Kirwan</p>
                            </div>

                            <div className={styles.founderRow}>
                                <div className={styles.founderImageWrap}>
                                <img
                                    src="/images/mx.jpeg"
                                    alt="Maximilian Herbst — Founder of ICare"
                                    className={styles.founderImage}
                                />
                            </div>
                                <p className={styles.founderName}>Maximilian Herbst</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT WE'RE BUILDING */}
            <section
                id="what-were-building"
                aria-label="What we're building"
                className={styles.buildingSection}
            >
                <div className={styles.buildingInner}>
                    <h2 className={styles.heading}>What we are building</h2>

                    <p className={styles.paragraph}>
                        ICare is a UK-based platform designed to connect families with trusted companions for older adults.
                        We're starting with <strong>companionship</strong>, because meaningful human connection is where care truly begins.
                    </p>

                    <p className={styles.paragraph}>
                        For families, ICare helps you find someone who can spend unhurried, quality time with your loved one - for conversation, shared activities, walks, or simply being present.
                        Clear profiles and direct communication support confident choices.
                    </p>

                    <p className={styles.paragraphLast}>
                        For caregivers, ICare offers flexibility, respect and the opportunity to build genuine relationships.
                        Caregivers remain independent, choose who they work with, and are valued for the connection and presence they provide.
                    </p>
                </div>
            </section>
        </>
    );
}
