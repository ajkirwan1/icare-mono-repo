import { useMemo, useState } from "react";
import { useFetcher } from "react-router";
import classes from "./forms.module.scss";
import SubmitButton from "../buttons/submit-buttons/submit-button";
import CustomSelect from "../../../../forms/inputs/CustomSelect";

export default function ContactUsForm({
    action = "/contact",
    method = "post",
    delayMs = 3000
}) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const result = fetcher.data;

    const [topic, setTopic] = useState("general");

    const fieldErrors = result?.ok === false && result?.errors ? result.errors : {};
    const hasErrors = useMemo(() => Object.keys(fieldErrors || {}).length > 0, [fieldErrors]);

    const describedBy = (name) => (fieldErrors?.[name] ? `${name}-error` : undefined);

    const FieldError = ({ name }) =>
        fieldErrors?.[name] ? (
            <div id={`${name}-error`} role="alert" className={classes.error}>
                {fieldErrors[name]}
            </div>
        ) : null;

    const topicOptions = [
        { value: "general", label: "General question" },
        { value: "care", label: "Care needs" },
        { value: "caregiver", label: "Caregiver onboarding" },
        { value: "safety", label: "Trust & safety" },
        { value: "billing", label: "Billing / payments" },
        { value: "other", label: "Other" },
    ];

    return (
        <div className={classes.card}>
            <p className={classes.subtitle}>
                Send us a message about care needs, availability, pricing, or anything else and we will reply as soon as possible.
            </p>

            <fetcher.Form method={method} action={action} className={classes.form} noValidate>
                {/* Honeypot */}
                <div aria-hidden="true" className={classes.honeypot}>
                    <label className={classes.label} htmlFor="company">Company</label>
                    <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <input type="hidden" name="_delay" value={String(delayMs)} />

                <div className={classes.row2}>
                    <div className={classes.field}>
                        <label className={classes.label} htmlFor="contact-email">Email</label>
                        <input
                            id="contact-email"
                            className={classes.control}
                            type="email"
                            name="email"
                            required
                            placeholder="you@email.com"
                            disabled={isSubmitting}
                            aria-invalid={fieldErrors.email ? "true" : "false"}
                            aria-describedby={describedBy("email")}
                            autoComplete="email"
                        />
                        <FieldError name="email" />
                    </div>

                    <div className={classes.field}>
                        <label className={classes.label} htmlFor="contact-subject">Subject</label>
                        <input
                            id="contact-subject"
                            className={classes.control}
                            name="subject"
                            required
                            placeholder="How can we help?"
                            disabled={isSubmitting}
                            aria-invalid={fieldErrors.subject ? "true" : "false"}
                            aria-describedby={describedBy("subject")}
                        />
                        <FieldError name="subject" />
                    </div>
                </div>

                <div className={classes.field}>
                    <label className={classes.label} id="contact-topic-label">Topic</label>
                    <CustomSelect
                        id="contact-topic"
                        name="topic"
                        labelId="contact-topic-label"
                        value={topic}
                        onChange={setTopic}
                        options={topicOptions}
                        placeholder="Select topic"
                        disabled={isSubmitting}
                        invalid={Boolean(fieldErrors.topic)}
                        describedBy={describedBy("topic")}
                        className={classes.customSelect}
                        controlClassName={`${classes.control} ${classes.customSelectControl}`}
                    />
                    <FieldError name="topic" />
                </div>

                <div className={classes.field}>
                    <label className={classes.label} htmlFor="contact-message">Message</label>
                    <textarea
                        id="contact-message"
                        className={classes.textarea}
                        name="message"
                        required
                        placeholder="Tell us what’s going on…"
                        disabled={isSubmitting}
                        aria-invalid={fieldErrors.message ? "true" : "false"}
                        aria-describedby={describedBy("message")}
                    />
                    <FieldError name="message" />
                </div>

                <div className={classes.actions}>
                    <SubmitButton disabled={isSubmitting || result?.ok} className={`${classes.button} ${classes.contactButton}`}>
                        {isSubmitting ? (
                            <span className={classes.spinnerWrap}>
                                <span className={classes.spinner} aria-hidden="true" />
                                Submitting…
                            </span>
                        ) : (
                            result?.ok ? "Request submitted ✓" : "Submit request"
                        )}
                    </SubmitButton>

                    {hasErrors && result?.ok === false ? (
                        <p className={`${classes.note} ${classes.noteError}`} role="alert">
                            {result?.error || "Please check the highlighted fields."}
                        </p>
                    ) : null}

                    <p className={classes.note}>
                        We’ll only use your details to reply. We don’t sell personal data.
                    </p>
                </div>
            </fetcher.Form>
        </div>
    );
}
