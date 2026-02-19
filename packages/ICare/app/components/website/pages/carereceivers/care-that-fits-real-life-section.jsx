import styles from "./care-that-fits-real-life-section.module.scss";
import { Link } from "react-router";

export default function CareThatFitsRealLifeSection() {
    return (
        <section
            aria-labelledby="care-fits-real-life-heading"
            className={styles.section}
        >
            <div className={styles.gridSplit}>
                <img
                    src="images/web/icare-for-carereceivers/care-that-fits-real-life.webp"
                    alt="Person receiving care at home"
                    className={styles.image}
                />

                <div>
                    <h2 id="care-fits-real-life-heading" className={styles.title}>
                        Care that fits real life
                    </h2>

                    <p className={styles.subtitle}>Many families do not need full-time care straight away. They need flexible support that can start small and adapt as routines, health, and confidence change.</p>

                    <p className={styles.subtitle}>That might mean a few hours of companionship each week, help getting out of the house, or regular support that gives relatives breathing space alongside work and family life.</p>

                    <p className={styles.subtitle}>ICare helps families connect directly with independent caregivers so expectations, schedules, and costs can be agreed clearly from the start.</p>


                    {/* CARE GUIDANCE LINK */}
                    <p className={styles.subtitle}>
                        <Link
                            className={styles.link}
                            to="/care-knowledge"
                        >Learn more in Care guidance
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
