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
        <h2 className={styles.title}>
          Care that feels simple,
          <br /> clear and human
        </h2>
        <p className={styles.intro}>
          ICare is built for people receiving care — and for families organising it.
          Everything is designed to feel familiar, calm and easy to navigate, without
          unnecessary steps or confusing options.
        </p>
        <ul className={styles.list}>
          {[
            "Comfortable, one-hand use on any phone",
            "The essentials are always one tap away",
            "Clear caregiver profiles with the details that matter",
            "Help and support available whenever you need it"
          ].map((t) => (
            <li key={t} className={styles.listItem}>
              <span aria-hidden="true" className={styles.check}>
                ✓
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className={styles.outro}>
          Whether you’re arranging care for yourself or a loved one, ICare keeps the
          process reassuring — so you can focus on the person, not the paperwork.
        </p>
      </SplitMediaSection>
    </LayoutSection>
  );
}
