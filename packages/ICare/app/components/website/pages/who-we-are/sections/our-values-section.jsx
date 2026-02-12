import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandsHolding,
    faUserShield,
    faScaleBalanced,
    faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./our-values-section.module.scss";

const faIconStyle = {
    fontSize: 23,
    color: "#000",
    opacity: 0.85,
    lineHeight: 1,
};

const cards = [
    {
        key: "dignity",
        title: "Dignity & Respect",
        description: "Care is organised around people, not transactions.",
        icon: faHandsHolding,
    },
    {
        key: "privacy",
        title: "Privacy by Design",
        description: "Data protection and security are built into the platform from the start.",
        icon: faUserShield,
    },
    {
        key: "fair",
        title: "Fair & Transparent",
        description: "No hidden fees. Clear agreements and upfront expectations.",
        icon: faScaleBalanced,
    },
    {
        key: "trust",
        title: "Trust & Safety",
        description: "Identity verification, secure messaging and clear documentation where required.",
        icon: faShieldHeart,
    },
];

export function OurValuesSection() {
    return (
        <section
            id="standards"
            aria-labelledby="standards-heading"
            className={styles.section}
        >
            <div className={styles.layout}>
                <div className={styles.intro}>
                    <h2 id="standards-heading" className={styles.heading}>
                        Our standards
                    </h2>

                    <p className={styles.lead}>
                        Care is built on trust, responsibility and mutual respect.
                        ICare supports arrangements that treat families and caregivers as equals.
                    </p>

                    <div className={styles.imageWrap}>
                        <img
                            src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
                            alt="Kind caregiver supporting an elderly person"
                            className={styles.image}
                        />
                    </div>
                </div>

                <ul className={styles.valuesList}>
                    {cards.map((card) => (
                        <li key={card.key} className={styles.valuesItem}>
                            <div className={styles.iconWrap}>
                                <FontAwesomeIcon icon={card.icon} style={faIconStyle} />
                            </div>
                            <div className={styles.itemContent}>
                                <h3 className={styles.itemTitle}>{card.title}</h3>
                                <p className={styles.itemDescription}>{card.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
