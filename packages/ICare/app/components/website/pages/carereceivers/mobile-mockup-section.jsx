import LayoutSection from "../../common/layout/layout-section";
import SplitMediaSection from "../../common/sections/split-image-section";
import styles from "./mobile-mockup-section.module.scss";

const ITEMS = [
    "Secure messaging and care details organised in one place",
    "Clear caregiver profiles with relevant, practical information",
    "Saved caregivers for comparison and considered decision-making",
    "Availability overview to see when care can start",
    "Simple safety prompts to support informed decisions",
    "Easy ways to share profiles with family members",
    "Direct tools to report concerns if something feels wrong",
];

export default function MobileMockupSection() {
    return (
        <LayoutSection>
            <SplitMediaSection
                ariaLabel="ICare app preview on iPhone"
                imageSrc="images/web/icare-for-carereceivers/mockup-icare3.png"
                imageAlt="ICare app preview on iPhone"
                imageSide="right"
                unstyledImage
            >
                {/* TITLE */}
                <h2 className={styles.myicare}>
                    <span>My</span>
                    <img src="/images/logo/icareblack.svg" alt="ICare" />
                    <span>app.</span>

                </h2>

                {/* INTRO */}
                <p className={styles.intro}>
                    All essentials within one tap.
                </p>

                {/* LIST */}
                <ul className={`${styles.list} ${styles.fadeIn}`}>
                    {ITEMS.map((text, i) => (
                        <li
                            key={text}
                            className={styles.listItem}
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            <span className={styles.dot} aria-hidden />
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>


            </SplitMediaSection>
        </LayoutSection>
    );
}
