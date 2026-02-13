import styles from "../../../../../styles/components/website/pages/who-we-are/sections/first-section.module.scss";

export function OurFoundationSection() {
    return (
        <>
            <section
                id="foundation"
                aria-label="Our foundation and mission"
                className={styles.grid}
            >
                {/* LEFT — OUR FOUNDATION */}
                <div className={styles.colLeft}>
                    <div className={styles.colInner}>
                        <h2 className={styles.heading}>Our foundation</h2>

                        <p className={styles.paragraph}>
                            Care often begins with a simple intention - helping someone stay safe and comfortable at home.
                        </p>

                        <p className={styles.paragraph}>
                            In practice, families quickly face uncertainty: how to find the right person, how to organise support, and how to know what's really happening day to day.
                        </p>

                        <p className={styles.paragraphContinued}>
                            ICare was shaped by first-hand experience of live-in care.
                            We saw how difficult it can be to balance trust, responsibility and everyday life — both for families and for caregivers.
                        </p>

                        <p className={styles.paragraphContinued}>
                            That experience led us to build ICare: a platform that brings structure and clarity to care arrangements, while keeping relationships direct and respectful.
                            Caregivers remain independent. Families gain confidence. Expectations stay clear from the start
                        </p>
                    </div>
                </div>

                {/* RIGHT — OUR MISSION */}
                <div className={styles.colRight}>
                    <div className={styles.colInner}>
                        <h2 className={styles.headingMission}>Our mission</h2>

                        <p className={styles.paragraphSpaced}>
                            We help older adults live with dignity, connection and everyday companionship.
                        </p>
                        <p className={styles.paragraphSpaced}>
                            Across the UK, too many people experience loneliness, while families struggle to find support they can truly trust.
                        </p>
                        <p className={styles.paragraphSpaced}>
                            ICare exists to make finding companionship calmer, clearer and more human - while valuing the caregivers who bring warmth and presence into people's lives.
                        </p>

                        <p className={styles.paragraph}>
                            Our focus is simple: reduce unnecessary stress, make arrangements clearer, and support care that feels respectful and well-organised from the start.
                            <br />
                            By keeping communication direct, information secure and costs transparent, we help care begin on steady, confident terms.
                        </p>
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
