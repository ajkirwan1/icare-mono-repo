import React from "react";
import styles from "./about-icare-section.module.scss";
import NavigationButton from "../../../common/buttons/navigation-buttons/navigation-button";

export default function AboutICareSection() {

  return (
    <section className={styles.section}>
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
      <div className={styles.gridSplit}>
        <img
          src="images/web/icare-for-carereceivers/browse2.png"
          alt="Image"
          className={styles.image}
        />
        <div>
          <h2 className={styles.title}>
            ICare - Your health in your hands
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
          <div style={{ marginTop: "2vh" }}>
            <NavigationButton to="/who-we-are">Who we are</NavigationButton>
          </div>
        </div>
      </div>
    </section>
  );
}
