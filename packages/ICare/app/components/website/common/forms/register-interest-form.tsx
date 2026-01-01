import * as React from "react";
import { useFetcher } from "react-router";
import styles from "./register-interest-form.module.scss";

export default function RegisterInterestForm() {
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  const fieldErrors = fetcher.data?.fieldErrors ?? {};
  const message = fetcher.data?.message;
  const ok = fetcher.data?.ok;

  const formRef = React.useRef(null);

  React.useEffect(() => {
    if (ok) { formRef.current?.reset(); }
  }, [ok]);

  const errId = (name) => `${name}-error`;
  const hasErr = (name) => Array.isArray(fieldErrors?.[name]) && fieldErrors[name].length > 0;

  return (
    <div className={styles.root}>
      <fetcher.Form ref={formRef} method="post" action="/register-interest" noValidate>
        <fieldset disabled={busy} aria-busy={busy} style={{ border: 0, padding: 0, margin: 0 }}>
          <div className={styles.card}>
            <div className={styles.header}>
              <h3 className={styles.title}>Register your interest</h3>
              <p className={styles.sub}>30 seconds — we’ll email you when we launch near you.</p>
            </div>

            <div className={styles.hr} />

            <div className={styles.grid}>
              <label className={styles.label}>
                <span className={styles.labelText}>First name</span>
                <input
                  className={styles.control}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="First name"
                  aria-invalid={hasErr("firstName") ? "true" : undefined}
                  aria-describedby={hasErr("firstName") ? errId("firstName") : undefined}
                />
                {hasErr("firstName") && (
                  <div id={errId("firstName")} role="alert" className={styles.error}>
                    {fieldErrors.firstName[0]}
                  </div>
                )}
              </label>

              <label className={styles.label}>
                <span className={styles.labelText}>Last name</span>
                <input
                  className={styles.control}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Last name"
                  aria-invalid={hasErr("lastName") ? "true" : undefined}
                  aria-describedby={hasErr("lastName") ? errId("lastName") : undefined}
                />
                {hasErr("lastName") && (
                  <div id={errId("lastName")} role="alert" className={styles.error}>
                    {fieldErrors.lastName[0]}
                  </div>
                )}
              </label>

              <label className={`${styles.label} ${styles.wide}`}>
                <span className={styles.labelText}>Email</span>
                <input
                  className={styles.control}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Email address"
                  aria-invalid={hasErr("email") ? "true" : undefined}
                  aria-describedby={hasErr("email") ? errId("email") : undefined}
                />
                {hasErr("email") && (
                  <div id={errId("email")} role="alert" className={styles.error}>
                    {fieldErrors.email[0]}
                  </div>
                )}
              </label>

              <div className={`${styles.wide} ${styles.checkArea}`}>
                <label className={styles.checkRow}>
                  <input
                    className={styles.checkbox}
                    name="termsAccepted"
                    type="checkbox"
                    aria-invalid={hasErr("termsAccepted") ? "true" : undefined}
                    aria-describedby={hasErr("termsAccepted") ? errId("termsAccepted") : undefined}
                  />
                  <span>I agree to the terms</span>
                </label>
                {hasErr("termsAccepted") && (
                  <div id={errId("termsAccepted")} role="alert" className={styles.error}>
                    {fieldErrors.termsAccepted[0]}
                  </div>
                )}

                <label className={styles.checkRow}>
                  <input
                    className={styles.checkbox}
                    name="futureContact"
                    type="checkbox"
                    aria-invalid={hasErr("futureContact") ? "true" : undefined}
                    aria-describedby={hasErr("futureContact") ? errId("futureContact") : undefined}
                  />
                  <span>You may contact me in the future</span>
                </label>
                {hasErr("futureContact") && (
                  <div id={errId("futureContact")} role="alert" className={styles.error}>
                    {fieldErrors.futureContact[0]}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.btnWrap}>
              <button className={styles.btn} type="submit" disabled={busy}>
                {busy ? "Submitting…" : ok ? "You're on the list ✓" : "Register"}
              </button>
            </div>

            {message && (
              <div className={styles.status} role={ok ? "status" : "alert"} aria-live="polite">
                {message}
              </div>
            )}
          </div>
        </fieldset>
      </fetcher.Form>
    </div>
  );
}
