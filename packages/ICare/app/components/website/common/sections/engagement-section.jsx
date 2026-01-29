import { useFetcher } from "react-router";
import SubmitButton from "~/components/website/common/buttons/submit-buttons/submit-button";
import NavigationButton from "~/components/website/common/buttons/navigation-buttons/navigation-button";
import classes from "./engagement-section.module.scss";

export default function EngagementSection({
    delayMs = 600, // optional: change per usage
    subscribeLabel = "Subscribe to our newsletter",
    contributeTo = "/contribute"
}) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const result = fetcher.data;

    return (
        <section className={classes.engagement}>
            <div className={classes.engagementInner}>
                {/* Newsletter */}
                <div className={classes.newsletterBlock}>
                    <h2 className={classes.newsletterTitle}>Get monthly care insights</h2>

                    <p className={classes.newsletterText}>
                        Evidence-led updates on aging, in-home care, workforce pressures, and
                        care costs across the UK and Europe. No spam — unsubscribe anytime.
                    </p>

                    <fetcher.Form
                        className={classes.newsletterForm}
                        method="post"
                        action="/newsletter/subscribe"
                    >
                        {/* Honeypot */}
                        <div className={classes.hpWrap} aria-hidden="true">
                            <label className={classes.hpLabel} htmlFor="company">
                                Company
                            </label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                tabIndex={-1}
                                autoComplete="off"
                                className={classes.hpInput}
                            />
                        </div>

                        {/* Optional artificial delay (dev/testing) */}
                        <input type="hidden" name="_delay" value={String(delayMs)} />

                        <label className={classes.srOnly} htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className={classes.newsletterInput}
                            autoComplete="email"
                        />

                        <SubmitButton variant="tertiary" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className={classes.btnSpinnerWrap}>
                                    <span className={classes.spinner} aria-hidden="true" />
                                    Subscribing…
                                </span>
                            ) : (
                                subscribeLabel
                            )}
                        </SubmitButton>

                        {/* Inline feedback (only once) */}
                        {result?.ok && !isSubmitting && (
                            <p className={classes.newsletterFinePrint}>Thanks — you’re subscribed.</p>
                        )}
                        {result?.ok === false && !isSubmitting && (
                            <p className={classes.newsletterFinePrintError}>{result.error}</p>
                        )}
                    </fetcher.Form>

                    <p className={classes.newsletterFinePrint}>
                        Unsubscribe anytime. We respect your privacy.
                    </p>
                </div>

                {/* Contribute */}
                <div className={classes.contributeBlock}>
                    <h2>Have something to contribute?</h2>
                    <p>
                        We welcome insights from carers, healthcare professionals, researchers,
                        and people with lived experience of in-home care.
                    </p>
                    <p>
                        If you have data, case studies, or stories that could help families,
                        we’d love to hear from you.
                    </p>

                    <NavigationButton to={contributeTo}>Submit an article</NavigationButton>
                </div>
            </div>
        </section>
    );
}
