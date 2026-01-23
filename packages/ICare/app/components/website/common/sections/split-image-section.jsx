import styles from "./split-image-section.module.scss";

export default function SplitMediaSection({
    imageSrc,
    imageAlt,
    imageSide = "left", // "left" | "right"
    unstyledImage = false,
    children
}) {
    const isRight = imageSide === "right";

    return (
        <div className={styles.container}>
            <div className={`${styles.grid} ${isRight ? styles.reverse : ""}`}>
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className={unstyledImage ? undefined : styles.image}
                    style={{ maxWidth: "550px" }}
                />
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}
