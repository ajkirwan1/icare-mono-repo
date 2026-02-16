import VideoSection from "../../../common/sections/VideoSection";
import styles from "./our-impact-section.module.scss";

const items = [
    {
        title: "Transparent care choices",
        desc: "Clear caregiver profiles show experience, availability and care style before any conversation begins.",
    },
    {
        title: "Direct communication",
        desc: "Families and caregivers speak directly, without intermediaries shaping decisions.",
    },
    {
        title: "Fair, clear expectations",
        desc: "Care details, schedules and rates are agreed openly between families and caregivers.",
    },
    {
        title: "Freedom on both sides",
        desc: "Caregivers choose who they work with. Families choose who they welcome into their home.",
    },
];

export function OurImpactSection() {
    return (
        <section
            id="impact"
            aria-labelledby="impact-heading"
            className={styles.section}
        >
            <div className={styles.wrap}>
                <header className={styles.headerBlock}>
                    <h2 id="impact-heading" className={styles.heading}>
                        Our approach is built on a few simple principles
                    </h2>
                    <p className={styles.lead}>
                        <strong className={styles.leadStrong}>Care is personal and changes over time.</strong>
                        <br />
                        ICare helps families and caregivers connect with clarity and calm while keeping decisions where they belong: with people.
                    </p>
                </header>

                <div className={styles.grid}>
                    <ul className={styles.itemsList}>
                        {items.map((item) => (
                            <li key={item.title} className={styles.item}>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                                <p className={styles.itemDesc}>{item.desc}</p>
                            </li>
                        ))}
                    </ul>

                    <div>
                        <div className={styles.mediaCard}>
                            <VideoSection
                                poster="images/web/who-we-are/who-we-are-placeholder.webp"
                                videoSrc="images/web/who-we-are/who-we-are.mp4"
                                posterWidth={1600}
                                posterHeight={900}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
