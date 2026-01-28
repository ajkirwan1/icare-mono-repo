import LayoutSection from "../../common/layout/layout-section";
import SplitMediaSection from "../../common/sections/split-image-section";
import styles from "./mobile-mockup-section.module.scss";

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

                <h2 className={styles.myicare}><span>My</span><img src="/images/logo/icareblack.svg" alt="ICare" /><span>app</span>
                </h2>


                <p className={styles.intro}>
                    ICare is built for people receiving care and for families organising it.
                    Everything is designed to feel familiar, calm and easy to navigate, without
                    unnecessary steps or confusing options.
                </p>
                <ul className={styles.list}>
                    {[
                        "Simple, familiar interface — easy to use on any phone",

                        "Care details, messages and profiles in one place",

                        "Clear caregiver profiles with the information that matters",

                        "Support available if you need guidance",
                    ].map((t) => (
                        <li key={t} className={styles.listItem}>
                            <span aria-hidden="true" className={styles.check}>

                            </span>
                            <svg style={{ position: "relative", top: "4px" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>{t}</span>
                        </li>
                    ))}
                </ul>
                <p className={styles.outro}>
                    Whether you are arranging care for yourself or a loved one, ICare keeps the
                    process reassuring so you can focus on the person, not the paperwork.
                </p>
            </SplitMediaSection>
        </LayoutSection>
    );
}
