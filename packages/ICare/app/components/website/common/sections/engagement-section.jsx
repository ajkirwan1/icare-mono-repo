import { useFetcher } from "react-router";
import SubmitButton from "~/components/website/common/buttons/submit-buttons/submit-button";
import classes from "./engagement-section.module.scss";

export default function EngagementSection({
    delayMs = 600,
    subscribeLabel = "Subscribe",
    contributeTo = "/contribute"
}) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const result = fetcher.data;

    return (
        <section className={classes.engagement}>
            <div className={classes.engagementInner}>
                <div className={classes.card}>
                    <div className={classes.cardTop}>
                        <span className={classes.kicker}>ICare Newsletter</span>

                        <h2 className={classes.cardTitle}>Get monthly care insights</h2>

                        <p className={classes.cardText}>
                            Evidence-led updates on ageing, home care, workforce pressure, and care costs in the UK & Europe.
                        </p>

                        <ul className={classes.bullets}>
                            <li>Clear monthly briefing for families and caregivers</li>
                            <li>Practical guidance, not generic marketing noise</li>
                            <li>Useful links to trusted UK and EU data sources</li>
                        </ul>

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
                        </fetcher.Form>
                        <p className={classes.finePrint}>No spam. Unsubscribe anytime. Your inbox stays in your control.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
