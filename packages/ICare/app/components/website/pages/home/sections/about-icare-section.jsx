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
                    src="images/web/homepage/elderly1.png"
                    alt="Image"
                    className={styles.image}
                />
                <div>
                    <h2 className={styles.title}>
                        Care shaped by real needs
                    </h2>

                    <p className={styles.subtitle} style={{ maxWidth: "480px" }}>
                        Care arrangements shape everyday life - <br />routines, comfort and peace of mind.<br />
                        ICare brings families and caregivers together in one place, with direct communication,
                        clear expectations and fair, transparent costs.
                    </p>

                    <div style={{ marginTop: "3vh" }}>
                        <NavigationButton to="/who-we-are">Who we are</NavigationButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
