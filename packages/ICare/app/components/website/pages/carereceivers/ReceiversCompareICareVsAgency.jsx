import React from "react";
import ICareWaitlistForm from "./icare-waitinglist-form";
import styles from "./receivers-compare-icare-vs-agency.module.scss";

export default function ICareLaunchingSoonClients() {
    return (
        <section
            id="icare-waitlist"
            aria-label="ICare launching soon"
            className={styles.section}
        >
            <div className={styles.inner}>
                <div className={styles.anchor} />

                <div className={styles.grid}>
                    {/* LEFT COPY */}
                    <div className={styles.left}>
                        <div className={styles.topMini}>Launching soon — early access</div>

                        <h2 className={styles.title}>
                            Find trusted care — without agency stress.
                        </h2>

                        <p className={styles.sub}>
                            ICare is preparing verified caregivers and a calm, transparent
                            matching process.
                            <br />
                            Join the waiting list and answer a few quick questions - we’ll
                            prioritise better matches in your area.
                        </p>

                        <ul className={styles.bullets}>
                            <li className={styles.bullet}>
                                <span className={styles.tick}>✓</span>
                                <span>Verified profiles + clear information.</span>
                            </li>
                            <li className={styles.bullet}>
                                <span className={styles.tick}>✓</span>
                                <span>Transparent pricing and secure messaging built-in.</span>
                            </li>
                            <li className={styles.bullet}>
                                <span className={styles.tick}>✓</span>
                                <span>Early access to matches when we launch near you.</span>
                            </li>
                        </ul>
                    </div>

                    {/* RIGHT CARD */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.formTitle}>JOIN THE WAITING LIST</div>
                            <div className={styles.formSub}>
                                30 seconds — your answers help us launch in the right places
                                with the right caregivers.
                            </div>
                        </div>

                        <div className={styles.hr} />

                        <ICareWaitlistForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
