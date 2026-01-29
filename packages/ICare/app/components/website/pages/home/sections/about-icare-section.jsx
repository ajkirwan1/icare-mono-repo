import React from "react";
import styles from "./about-icare-section.module.scss";
import NavigationButton from "../../../common/buttons/navigation-buttons/navigation-button";
import { Link } from "react-router";

export default function AboutICareSection() {
    return (
        <section
            className={styles.section}
            style={{ display: "flex", justifyContent: "center" }}
        >
            <div className={styles.gridThreeQuarter}>
                <img
                    src="images/web/homepage/oldwoman.png"
                    alt="Person receiving care at home"
                    className={styles.image}
                />

                <div>
                    <h2 className={styles.title}>
                        Care that fits real life
                    </h2>

                    <p className={styles.subtitle} style={{ maxWidth: "520px" }}>
                        Across the UK and Europe, populations are ageing and more people are
                        living longer with changing support needs. At the same time, families
                        often balance care alongside work, distance and everyday
                        responsibilities.
                    </p>

                    <p className={styles.subtitle} style={{ maxWidth: "520px" }}>
                        This has increased the need for care that works around real life —
                        not only long-term or intensive support, but also flexible,
                        part-time and practical help that fits daily routines.
                    </p>

                    <p className={styles.subtitle} style={{ maxWidth: "520px" }}>
                        ICare brings families and independent caregivers together in one
                        place, supporting direct communication, clear expectations and
                        transparent costs.
                    </p>

                    {/* CARE GUIDANCE LINK */}
                    <p className={styles.subtitle} style={{ maxWidth: "520px" }}>
                        <Link
                            to="/care-knowledge"
                            style={{
                                color: "#5a5656",
                                textDecoration: "underline",
                                textUnderlineOffset: "2px",
                                fontWeight: 400,
                                fontSize: "1.2rem",
                                transition: "0.3s"


                            }}
                        >
                            Learn more in Care guidance
                        </Link>
                    </p>

                    <div style={{ marginTop: "3vh" }}>
                        {/* intentionally empty */}
                    </div>
                </div>
            </div>
        </section>
    );
}
