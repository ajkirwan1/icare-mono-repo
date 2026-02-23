import WaitinglistForm from "~/components/website/common/forms/waitinglist-form";
import styles from "./icare-early-access.module.scss";

export default function ICareEarlyAccessHomeSection() {
    return (
        <section id="waitlist" aria-label="Join the waiting list" className={styles.wrap}>
            <div className={styles.estimatorHeader}>
                <h2 className={styles.h1}>Join the waiting list</h2>

                <p className={styles.lead}>
                    Leave a few details and we’ll let you know when ICare opens near you.
                    <br />
                    Your answers help us understand where care is needed most, so we can open in&nbsp;the
                    right places first.
                </p>
            </div>

            <div className={styles.container}>
                <div className={styles.layout}>
                    {/* LEFT */}
                    <div className={styles.card}>
                        <WaitinglistForm />
                    </div>

                    <img
                        className={styles.image}
                        src="/images/web/homepage/icare-join-the-waiting-list.webp"
                        alt="Join the waiting list"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
