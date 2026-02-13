import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import NavigationButton from "~/components/website/common/buttons/navigation-buttons/navigation-button";
import styles from "~/styles/pages/news-and-articles/newsletter.module.scss";

export function meta() {
  return [
    { title: "ICare | Subscription Confirmed" },
    { name: "description", content: "Your ICare newsletter subscription has been confirmed." }
  ];
}

export default function NewsletterConfirmed() {
  return (
    <>
      <ICareNavbar />

      <section aria-label="Subscription confirmed" className={styles.wrap}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <div className={styles.statusCard}>
            <div className={styles.statusIcon} aria-hidden="true">&#10003;</div>
            <h1 className={styles.heading}>You&apos;re subscribed</h1>
            <p className={styles.subtitle}>
              Thanks for confirming your email. You&apos;ll receive monthly care
              insights, industry updates, and helpful resources from ICare
              straight to your inbox.
            </p>
            <div className={styles.actions}>
              <NavigationButton to="/care-knowledge">
                Read our latest articles
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
