import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import NavigationButton from "~/components/website/common/buttons/navigation-buttons/navigation-button";
import styles from "~/styles/pages/news-and-articles/newsletter.module.scss";

export function meta() {
  return [
    { title: "ICare | Invalid Link" },
    { name: "description", content: "This newsletter link is invalid or has expired." }
  ];
}

export default function NewsletterInvalid() {
  return (
    <>
      <ICareNavbar />

      <section aria-label="Newsletter invalid link" className={styles.wrap}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <div className={styles.statusCard}>
            <div className={styles.statusIcon} aria-hidden="true">&#9888;</div>
            <h1 className={styles.heading}>Link not valid</h1>
            <p className={styles.subtitle}>
              This confirmation link is invalid or has expired. Links expire
              after 24 hours for your security. You can request a new one below.
            </p>
            <div className={styles.actions}>
              <NavigationButton to="/newsletter/resend">
                Resend confirmation email
              </NavigationButton>
              <NavigationButton to="/" variant="primary">
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
