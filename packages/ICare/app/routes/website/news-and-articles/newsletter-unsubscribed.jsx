import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import NavigationButton from "~/components/website/common/buttons/navigation-buttons/navigation-button";
import styles from "~/styles/pages/news-and-articles/newsletter.module.scss";

export function meta() {
  return [
    { title: "ICare | Unsubscribed" },
    { name: "description", content: "You have been unsubscribed from ICare updates." }
  ];
}

export default function NewsletterUnsubscribed() {
  return (
    <>
      <ICareNavbar />

      <section aria-label="Newsletter unsubscribed" className={styles.wrap}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <div className={styles.statusCard}>
            <div className={styles.statusIcon} aria-hidden="true">&#9993;</div>
            <h1 className={styles.heading}>You&apos;ve been unsubscribed</h1>
            <p className={styles.subtitle}>
              You will no longer receive newsletter emails from ICare. If this
              was a mistake, you can re-subscribe at any time from our articles
              page.
            </p>
            <div className={styles.actions}>
              <NavigationButton to="/care-guidance">
                Browse articles
              </NavigationButton>
              <NavigationButton to="/">
                Back to home
              </NavigationButton>
            </div>
          </div>
        </div>
      </section>

      <ICareFooter />
    </>
  );
}
