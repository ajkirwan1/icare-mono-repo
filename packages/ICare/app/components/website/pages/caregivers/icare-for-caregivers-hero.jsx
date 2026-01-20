import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-caregivers.jpg";
import ICareNavbar from "../shared/icare-navbar";
import styles from "./icare-for-caregivers-hero.module.scss";

export default function ICareForCaregiversHero() {
    return (
        <>
            <ICareNavbar />
            <section
                aria-label="ICare for Caregivers hero"
                className={styles.hero}
            >
                <img
                    src={heroImage}
                    alt="Care support background"
                    className={styles.image}
                />
                <div className={styles.overlay} />
                <div className={styles.content}>
                    <div>
                        <h1 className={styles.heading}>
                            ICare for Caregivers
                        </h1>

                        <div className={styles.copy}>

                            <p className={styles.copyPrimary}>
                                Work directly with families.
                            </p>

                            <p className={styles.copyList}>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                No agencies.
                            </p>
                            <p className={styles.copyList}>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                No unfair commissions.
                            </p>
                            <p className={styles.copyList}>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Fair pay. Transparent terms.
                            </p>
                            <p className={styles.copyList}>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                You choose who you work with.
                            </p>
                        </div>

                    </div>
                </div>
                <p className={styles.subheading}>
                    <span>No hidden fees.</span>{" "}
                    <span>One clear, fair model.</span>
                    <span>Built around people, not margins.</span>

                </p>

                <div style={{ display: "flex", gap: "2vw", height: "20vh", background: "#fff9ef", alignItems: "center" }} className={styles.section}>
                    <h2 className={styles.title}>
                        A platform for caregivers and care receivers to connect in a safe,
                        secure, and trusted place
                    </h2>
                    <img
                        src="/images/logo/logo-cropped.png"
                        alt="ICare"
                        style={{
                            height: 120,
                            width: "auto"
                            // display: "block"
                        }}
                    />
                </div>
            </section>
            {/* <div style={{ display: "flex", gap: "2vw", height: "20vh", background: "#fff9ef", alignItems: "center" }} className={styles.section}>
        <h2 className={styles.title}>
          ICare provides a unified platform to find your next care-giving role, and arrange and manage your contracts.
        </h2>
      </div> */}
        </>
    );
}
