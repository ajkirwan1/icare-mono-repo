import React from "react";
import { Link } from "react-router";
import LayoutSection from "../../common/layout/layout-section";
import SplitMediaSection from "../../common/sections/split-image-section";
import styles from "./receivers-three-steps.module.scss";

export default function ReceiversThreeSteps() {
<<<<<<< HEAD
  return (
    <LayoutSection background="#fff9ef">
      <SplitMediaSection
        ariaLabel="Find your caregiver in 3 steps"
        imageSrc="images/web/icare-for-carereceivers/browse2.png"
        imageAlt="Caregiver assisting a senior"
        imageSide="right"
      >
        <div className={styles.content}>
          <header className={styles.header}>
            <h2 className={styles.title}>Find your caregiver in 3 simple steps</h2>
            <p className={styles.subtitle}>
              A calm, human-centered process designed for clarity, trust and ease.
            </p>
          </header>

          <div className={styles.steps} role="list">
            <div className={styles.step} role="listitem">
              <div className={styles.badge} aria-hidden="true">1</div>
              <div className={styles.stepText}>
                <div className={styles.stepTitle}>Browse trusted caregivers</div>
                <div className={styles.stepDesc}>
                  Compare experience, skills and availability — all clearly presented.
                </div>
              </div>
            </div>

            <div className={styles.step} role="listitem">
              <div className={styles.badge} aria-hidden="true">2</div>
              <div className={styles.stepText}>
                <div className={styles.stepTitle}>Connect privately</div>
                <div className={styles.stepDesc}>
                  Message caregivers directly and get a sense of who feels right.
                </div>
              </div>
            </div>

            <div className={styles.step} role="listitem">
              <div className={styles.badge} aria-hidden="true">3</div>
              <div className={styles.stepText}>
                <div className={styles.stepTitle}>Agree the plan together</div>
                <div className={styles.stepDesc}>
                  Set hours, expectations and rate — openly and transparently.
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <Link to="/signup" className={styles.primaryBtn}>
              Create your free account
            </Link>

            <Link to="/caregivers" className={styles.secondaryBtn}>
              Browse caregivers
            </Link>
          </div>
        </div>
      </SplitMediaSection>
    </LayoutSection>
  );
=======
    return (
        <LayoutSection background="#fff9ef">
            <SplitMediaSection
                ariaLabel="Find your caregiver in 3 steps"
                imageSrc="images/web/icare-for-carereceivers/browse2.png"
                imageAlt="Caregiver assisting a senior"
                imageSide="right"
            >
                <div className={styles.content}>
                    <header className={styles.header}>
                        <h2 className={styles.title}>Find your caregiver in 3 simple steps</h2>
                        <p className={styles.subtitle}>
                            A calm, human-centered process designed for clarity, trust and ease.
                        </p>
                    </header>

                    <div className={styles.steps} role="list">
                        <div className={styles.step} role="listitem">
                            <div className={styles.badge} aria-hidden="true">1</div>
                            <div className={styles.stepText}>
                                <div className={styles.stepTitle}>Browse trusted caregivers</div>
                                <div className={styles.stepDesc}>
                                    Compare experience, skills and availability — all clearly presented.
                                </div>
                            </div>
                        </div>

                        <div className={styles.step} role="listitem">
                            <div className={styles.badge} aria-hidden="true">2</div>
                            <div className={styles.stepText}>
                                <div className={styles.stepTitle}>Connect privately</div>
                                <div className={styles.stepDesc}>
                                    Message caregivers directly and get a sense of who feels right.
                                </div>
                            </div>
                        </div>

                        <div className={styles.step} role="listitem">
                            <div className={styles.badge} aria-hidden="true">3</div>
                            <div className={styles.stepText}>
                                <div className={styles.stepTitle}>Agree the plan together</div>
                                <div className={styles.stepDesc}>
                                    Set hours, expectations and rate — openly and transparently.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.ctaRow}>
                        <Link to="/signup" className={styles.primaryBtn}>
                            Create your free account
                        </Link>

                        <Link to="/caregivers" className={styles.secondaryBtn}>
                            Browse caregivers
                        </Link>
                    </div>
                </div>
            </SplitMediaSection>
        </LayoutSection>
    );
>>>>>>> c18a2bb (commit)
}
