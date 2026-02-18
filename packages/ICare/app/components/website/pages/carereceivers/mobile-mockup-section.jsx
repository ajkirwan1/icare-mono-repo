import LayoutSection from "../../common/layout/layout-section";
import SplitMediaSection from "../../common/sections/SplitMediaSection";
import styles from "./mobile-mockup-section.module.scss";

const ITEMS = [
    "Video call caregivers before choosing",
    "Secure private messaging for routines and expectations",
    "Caregiver profiles: experience, rates, availability",
    "Save, shortlist, and compare caregivers",
    "Share shortlisted profiles with family access",
    "Live availability to plan a start date",
    "Built-in safety prompts for informed choices",
    "Tools to flag concerns or request support",
];

export default function MobileMockupSection() {
    return (
        <LayoutSection>
            <SplitMediaSection
                imageSide="right"
                unstyledImage
                media={[
                    {
                        type: "image",
                        src: "images/web/icare-for-carereceivers/mockup-icare-v2.webp",
                        alt: "ICare app preview on iPhone",
                    },
                    {
                        type: "video",
                        src: "images/web/icare-for-carereceivers/voice-call.mp4",
                        captionTrackSrc: "/captions/carereceivers-voice-call.vtt",
                    },
                    {
                        type: "video",
                        src: "images/web/icare-for-carereceivers/senior1.mp4",
                        poster: "images/web/icare-for-carereceivers/senior-placeholder.webp",
                        captionTrackSrc: "/captions/carereceivers-senior1.vtt",
                    },
                ]}
            >
                {/* TITLE */}
                <h2 className={styles.myicare}>
                    <span>My</span>
                    <img src="/images/logo/icareblack.svg" alt="ICare" />
                    <span>app.</span>
                </h2>

                {/* INTRO */}
                <p className={styles.intro}>All essentials within one tap.</p>

                {/* LIST */}
                <ul className={`${styles.list} ${styles.fadeIn}`}>
                    {ITEMS.map((text, i) => (
                        <li
                            key={text}
                            className={styles.listItem}
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            <span className={styles.dot} aria-hidden="true" />
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            </SplitMediaSection>
        </LayoutSection>
    );
}
