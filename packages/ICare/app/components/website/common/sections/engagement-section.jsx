import { useFetcher } from "react-router";
import SubmitButton from "~/components/website/common/buttons/submit-buttons/submit-button";
import NavigationButton from "~/components/website/common/buttons/navigation-buttons/navigation-button";
import classes from "./engagement-section.module.scss";

export default function EngagementSection({
    delayMs = 600,
    subscribeLabel = "Subscribe",
    contributeTo = "/contribute",
}) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const result = fetcher.data;

    return (
        <section className={classes.engagement}>
            <div className={classes.engagementInner}>
                {/* LEFT: Newsletter */}
                <div className={classes.card}>
                    <div className={classes.cardTop}>
                        <h2 className={classes.cardTitle}>Get monthly care insights</h2>

                        <p className={classes.cardText}>
                            Evidence-led updates on ageing, home care, workforce pressure, and care costs in the UK & Europe.
                        </p>

                        <fetcher.Form
                            className={classes.form}
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

                            <input type="hidden" name="_delay" value={String(delayMs)} />

                            <label className={classes.srOnly} htmlFor="email">
                                Email
                            </label>

                            <div className={classes.inputRow}>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className={classes.input}
                                    autoComplete="email"
                                />
                            </div>

                            {/* Feedback */}
                            {result?.ok && !isSubmitting && (
                                <p className={classes.noteSuccess}>Thanks — you’re subscribed.</p>
                            )}
                            {result?.ok === false && !isSubmitting && (
                                <p className={classes.noteError}>{result.error}</p>
                            )}
                        </fetcher.Form>

                        <p className={classes.finePrint}>No spam. Unsubscribe anytime.</p>
                    </div>

                    {/* ✅ BUTTON anchored to bottom (aligns with right column) */}
                    <div className={classes.cardBottom}>
                        <SubmitButton
                            variant="tertiary"
                            disabled={isSubmitting}
                            form="newsletter-form-fallback"
                            className={classes.ctaBtn}
                        >
                            {isSubmitting ? (
                                <span className={classes.btnSpinnerWrap}>
                                    <span className={classes.spinner} aria-hidden="true" />
                                    Subscribing…
                                </span>
                            ) : (
                                subscribeLabel
                            )}
                        </SubmitButton>
                    </div>
                </div>

                {/* RIGHT: Contribute */}
                <div className={classes.card}>
                    <div className={classes.cardTop}>
                        <h2 className={classes.cardTitle}>Have something to share?</h2>

                        <p className={classes.cardText}>
                            We welcome short articles from carers, clinicians, researchers, and people with lived experience.
                        </p>

                        <ul className={classes.bullets}>
                            <li>Practical guidance</li>
                            <li>Data & research summaries</li>
                            <li>Case studies & lessons learned</li>
                        </ul>

                        <p className={classes.finePrint}>
                            Clear, respectful, evidence-led. We’ll help you shape the draft if needed.
                        </p>
                    </div>

                    {/* ✅ BUTTON anchored to bottom (aligns with left column) */}
                    <div className={classes.cardBottom}>
                        <NavigationButton to={contributeTo} className={classes.ctaBtn}>
                            Submit an article
                        </NavigationButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
