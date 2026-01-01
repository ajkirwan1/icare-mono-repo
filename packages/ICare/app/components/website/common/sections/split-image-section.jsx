import styles from "./SplitMediaSection.module.scss";

export default function SplitMediaSection({
  imageSrc,
  imageAlt,
  imageSide = "left", // "left" | "right"
  children,
  ariaLabel,
  background = "#fff9ef"
}) {
  const isRight = imageSide === "right";

  return (
    <section
      aria-label={ariaLabel}
      className={styles.section}
      style={{ background }}
    >
      <div className={styles.container}>
        <div className={`${styles.grid} ${isRight ? styles.reverse : ""}`}>
          <img src={imageSrc} alt={imageAlt} className={styles.image} />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </section>
  );
}
