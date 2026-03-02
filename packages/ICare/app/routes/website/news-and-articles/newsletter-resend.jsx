import { useFetcher } from "react-router";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import NavigationButton from "~/components/website/common/buttons/navigation-buttons/navigation-button";
import SubmitButton from "~/components/website/common/buttons/submit-buttons/submit-button";
import styles from "~/styles/pages/news-and-articles/newsletter.module.scss";

export function meta() {
  return [
    { title: "ICare | Resend Confirmation" },
    { name: "description", content: "Resend your ICare newsletter confirmation email." }
  ];
}

export default function NewsletterResend() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  return (
    <>
      <ICareNavbar />

      <section aria-label="Resend confirmation" className={styles.wrap}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <div className={styles.statusCard}>
            <div className={styles.statusIcon} aria-hidden="true">&#9993;</div>
            <h1 className={styles.heading}>Resend confirmation</h1>
            <p className={styles.subtitle}>
              Enter your email address and we&apos;ll send a fresh confirmation
              link to complete your subscription.
            </p>

            <fetcher.Form method="post" action="/newsletter/resend-action" className={styles.form}>
              <label className={styles.label} htmlFor="resend-email">
                Email address
              </label>
              <input
                id="resend-email"
                className={styles.input}
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
              <div className={styles.btnWrap}>
                <SubmitButton loading={isSubmitting} loadingText="Sending\u2026">
                  Resend confirmation
                </SubmitButton>
              </div>
            </fetcher.Form>

            {fetcher.data?.ok && (
              <div className={styles.successMsg}>
                If that email is in our system, a new confirmation link has been sent.
                Check your inbox and spam folder.
              </div>
            )}

            <div className={styles.actions} style={{ marginTop: 20 }}>
              <NavigationButton to="/care-guidance">
                Browse articles
              </NavigationButton>
            </div>
          </div>
        </div>
      </section>

      <ICareFooter />
    </>
  );
}
