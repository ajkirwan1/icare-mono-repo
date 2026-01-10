import React from "react";
import styles from "./about-icare-for-caregivers-section.module.scss";
// import NavigationButton from "../../../common/buttons/navigation-buttons/navigation-button";

export default function AboutICareForCaregiversSection() {

  return (
    <section className={styles.section} style={{ background: "rgb(255, 249, 239)" }}>
      <div className={styles.gridThreeQuarter}>
        <div>
          <h2 className={styles.title}>
            Keep more of your hard-earned income
          </h2>
          <p className={styles.subtitle}>
            Your healh in your and hands
          </p>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* <div style={{ marginTop: "2vh" }}>
            <NavigationButton to="/who-we-are">Who we are</NavigationButton>
          </div> */}
        </div>
      </div>
    </section>
  );
}
