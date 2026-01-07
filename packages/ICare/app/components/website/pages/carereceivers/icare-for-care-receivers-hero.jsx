import heroImage from "/images/heros/icare-for-carereceivers.jpg";
import ICareNavbar from "../shared/ICareNavbar";
import styles from "./icare-for-care-receivers-hero.module.scss";

export default function ICareForCareReceiversHero() {
  return (
    <>
      <ICareNavbar />
      <section aria-label="Page hero" className={styles.hero}>
        <img
          src={heroImage}
          alt=""
          className={styles.image}
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.title}>Find trusted caregivers</h1>
          <p className={styles.description}>
            <span className={styles.lead}>
              Get personalised help for your family.
            </span>
            Verified caregivers, clear terms, no agency markups.
          </p>
        </div>
      </section>
      <div style={{ display: "flex", gap: "2vw", height: "20vh", background: "#fff9ef", alignItems: "center" }} className={styles.section}>
        <h2 className={styles.title}>
          ICare provides a unified platform to find your next care-giving role, and arrange and manage your contracts.
        </h2>
      </div>
    </>
  );
}
