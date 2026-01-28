import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import styles from "./newsletter.module.scss";

export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}

export default function NewsletterConfirmed() {

  return (
    <>
      <ICareNavbar />

      <section aria-label="ICare contact us" className={styles.wrap}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <div className={`icare-2paths ${styles.twoPaths}`}>
            <div className={styles.card}>
              <main>
                <h1>You're subscribed</h1>
                <p>
                  Thanks for confirming your email. You’ll now receive care insights
                  from ICare.
                </p>
                <a href="/care-knowledge">Read our latest articles</a>
              </main>
            </div>
          </div>
        </div>
      </section>

      <ICareFooter />
    </>
  );
}
