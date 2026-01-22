import React from "react";
import { Link } from "react-router"; // ✅ WŁAŚCIWY IMPORT U CIEBIE
import LayoutSection from "../../common/layout/layout-section";
import SplitMediaSection from "../../common/sections/split-image-section";
import styles from "./receivers-three-steps.module.scss";

export default function ReceiversThreeSteps() {
    return (
        <LayoutSection background="#fff9ef">
            <SplitMediaSection
                ariaLabel="Arrange home care with structure and safeguards"
                imageSrc="images/web/icare-for-carereceivers/browse2.png"
                imageAlt="Caregiver assisting a senior"
                imageSide="right"
            >
                <div className={styles.content}>
                    {/* HEADER */}
                    <header className={styles.header}>
                        <h2 className={styles.title}>
                            Find care with agency-level safeguards — without agency control
                        </h2>
                        <p className={styles.subtitle}>
                            Choose to browse yourself or get matched — then arrange care directly with
                            clear information, structured agreements and support built around safety.
                        </p>
                    </header>

                    {/* STEPS */}
                    <div className={styles.steps} role="list">
                        <div className={styles.step} role="listitem">
                            <div className={styles.badge} aria-hidden="true">1</div>
                            <div className={styles.stepText}>
                                <div className={styles.stepTitle}>
                                    Browse or get matched to vetted caregivers
                                </div>
                                <div className={styles.stepDesc}>
                                    Review profiles with key details upfront — experience, availability,
                                    documents and checks shown clearly.
                                </div>
                            </div>
                        </div>

                        <div className={styles.step} role="listitem">
                            <div className={styles.badge} aria-hidden="true">2</div>
                            <div className={styles.stepText}>
                                <div className={styles.stepTitle}>
                                    Message privately — in one place
                                </div>
                                <div className={styles.stepDesc}>
                                    Ask questions, request references, and understand fit before you commit —
                                    without intermediaries.
                                </div>
                            </div>
                        </div>

                        <div className={styles.step} role="listitem">
                            <div className={styles.badge} aria-hidden="true">3</div>
                            <div className={styles.stepText}>
                                <div className={styles.stepTitle}>
                                    Agree the plan upfront
                                </div>
                                <div className={styles.stepDesc}>
                                    Confirm tasks, schedule and rate before care starts —
                                    with clear terms and transparent pricing (no hidden fees).
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={styles.ctaRow}>
                        <Link to="/signup" className={styles.primaryBtn}>
                            Create your free account
                        </Link>

                        <Link to="/caregivers" className={styles.secondaryBtn}>
                            Browse caregivers
                        </Link>
                    </div>

                    {/* REASSURANCE */}
                    <p className={styles.reassurance}>
                        Need support? ICare can guide the process and help you adjust or change a match —
                        without agency pressure.
                    </p>
                </div>
            </SplitMediaSection>
        </LayoutSection>
    );
}
