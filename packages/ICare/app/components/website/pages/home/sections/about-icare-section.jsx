import React from "react";
import styles from "./about-icare-section.module.scss";
import NavigationButton from "../../../common/buttons/navigation-buttons/navigation-button";

export default function AboutICareSection() {

    return (
        <section className={styles.section} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex" }}>
                {/* <div>
          <h2 className={styles.title}>
            Your health in your hands
          </h2>
        </div> */}
                {/* <img
          src="/images/logo/logo-cropped.png"
          alt="ICare"
          style={{
            height: 120,
            width: "auto"
          }}
        /> */}
            </div>
            <div className={styles.gridThreeQuarter}>
                <img
                    src="images/web/icare-for-carereceivers/browse2.png"
                    alt="Image"
                    className={styles.image}
                />
                <div>
                    <h2 className={styles.title}>
                        The ICare idea explained
                    </h2>

                    <p className={styles.subtitle}>
                        Families face big decisions when arranging care — choosing a trusted caregiver,
                        managing costs, and organising everyday life. Caregivers, in turn, deserve respect,
                        fair pay, and tools that help them deliver safe, attentive support.
                    </p>
                    <p className={styles.subtitle}>
                        ICare grew from first-hand 24/7 live-in care experience across Europe.
                        We built this platform around dignity, empathy, and trust — bringing peace of mind
                        to families and recognition to caregivers.
                    </p>
                    <p className={styles.subtitle}>
                        We combine healthcare insight with technology to reduce stress and increase clarity at every step.
                        Privacy is prioritised, communication is simpler, and costs stay fair — so great care can start sooner.
                    </p>
                    <div style={{ marginTop: "2vh" }}>
                        <NavigationButton to="/who-we-are">Who we are</NavigationButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
