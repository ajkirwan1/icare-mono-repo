import { NavLink, useFetcher } from "react-router";
import { useEffect, useMemo, useState } from "react";
import classes from "./forms.module.scss";
import SubmitButton from "../buttons/submit-buttons/submit-button";
import Tooltip from "../tooltip/tooltip";
import WaitinglistSuccessModal from "../modals/waitinglist-modal";

export default function WaitinglistForm({
  action = "/waitinglist",
  method = "post",
  delayMs = 3000,
  defaultUserType = "receiver", // "receiver" | "caregiver"
  hideUserTypeSelector = false
}) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const result = fetcher.data;

  // tab state (receiver/caregiver)
  const [tab, setTab] = useState(defaultUserType);

  // keep tab in sync if parent changes defaultUserType (rare, but safe)
  useEffect(() => {
    setTab(defaultUserType);
  }, [defaultUserType]);

  const [agreeTerms, setAgreeTerms] = useState(false);

  // modal state
  const [successOpen, setSuccessOpen] = useState(false);

  // field errors
  const fieldErrors = result?.ok === false && result?.errors ? result.errors : {};

  const isReceiver = tab === "receiver";
  const isCaregiver = tab === "caregiver";

  const hasErrors = useMemo(() => Object.keys(fieldErrors || {}).length > 0, [fieldErrors]);

  const canSubmit = agreeTerms && !isSubmitting && !result?.ok;

  const describedBy = (name) => (fieldErrors?.[name] ? `${name}-error` : undefined);

  const FieldError = ({ name }) =>
    fieldErrors?.[name] ? (
      <div id={`${name}-error`} className={classes.error} role="alert">
        {fieldErrors[name]}
      </div>
    ) : null;

  // Open modal on success; reset modal state when starting a new submit
  useEffect(() => {
    if (fetcher.state === "submitting") { setSuccessOpen(false); }
    if (result?.ok && !result?.alreadyRegistered) { setSuccessOpen(true); }
  }, [fetcher.state, result?.ok, result?.alreadyRegistered]);

  const closeSuccess = () => setSuccessOpen(false);

  return (
    <>
      <WaitinglistSuccessModal
        open={successOpen}
        onClose={closeSuccess}
        email={result?.email}
        alreadyRegistered={result?.alreadyRegistered}
        message={result?.message}
      />

      <fetcher.Form method={method} action={action} className={classes.form} noValidate>
        {/* Honeypot */}
        <div aria-hidden="true" className={classes.honeypot}>
          <label className={classes.label} htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <input type="hidden" name="_delay" value={String(delayMs)} />

        {/* IMPORTANT: always submit userType even if selector hidden */}
        <input type="hidden" name="userType" value={tab} />

        {/* Common fields */}
        <div className={classes.row2}>
          <div className={classes.field}>
            <label className={classes.label} htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              required
              className={classes.control}
              aria-invalid={fieldErrors.firstName ? "true" : "false"}
              aria-describedby={describedBy("firstName")}
              disabled={isSubmitting}
              autoComplete="given-name"
            />
            <FieldError name="firstName" />
          </div>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              name="lastName"
              required
              className={classes.control}
              aria-invalid={fieldErrors.lastName ? "true" : "false"}
              aria-describedby={describedBy("lastName")}
              disabled={isSubmitting}
              autoComplete="family-name"
            />
            <FieldError name="lastName" />
          </div>
        </div>

        <div className={classes.row2}>
          <div className={classes.field}>
            <label className={classes.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className={classes.control}
              aria-invalid={fieldErrors.email ? "true" : "false"}
              aria-describedby={describedBy("email")}
              disabled={isSubmitting}
              autoComplete="email"
            />
            <FieldError name="email" />
          </div>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="postcode">Postcode</label>
            <input
              id="postcode"
              name="postcode"
              required
              className={classes.control}
              aria-invalid={fieldErrors.postcode ? "true" : "false"}
              aria-describedby={describedBy("postcode")}
              disabled={isSubmitting}
              autoComplete="postal-code"
            />
            <FieldError name="postcode" />
          </div>
        </div>

        {/* User type selector (only on generic page) */}
        {!hideUserTypeSelector ? (
          <fieldset aria-describedby={describedBy("userType")}>
            <legend className={classes.srOnly}>I am a</legend>

            <div className={classes.radioRow}>
              <span className={classes.label}>I am a</span>

              <label className={classes.radioLabel}>
                <input
                  type="radio"
                  name="userTypePicker" // NOTE: different name so hidden userType is authoritative
                  value="receiver"
                  checked={isReceiver}
                  onChange={() => setTab("receiver")}
                  className={classes.radioInput}
                  disabled={isSubmitting}
                  aria-invalid={fieldErrors.userType ? "true" : "false"}
                />
                Care receiver / family
              </label>

              <label className={classes.radioLabel}>
                <input
                  type="radio"
                  name="userTypePicker"
                  value="caregiver"
                  checked={isCaregiver}
                  onChange={() => setTab("caregiver")}
                  className={classes.radioInput}
                  disabled={isSubmitting}
                  aria-invalid={fieldErrors.userType ? "true" : "false"}
                />
                Caregiver
              </label>
            </div>

            <FieldError name="userType" />
          </fieldset>
        ) : null}

        {/* Receiver */}
        {isReceiver && (
          <div className={classes.row3}>
            <div className={classes.field}>
              <label className={classes.label} htmlFor="careFor">Who is the care for?</label>
              <select
                id="careFor"
                name="careFor"
                required
                className={classes.control}
                aria-invalid={fieldErrors.careFor ? "true" : "false"}
                aria-describedby={describedBy("careFor")}
                disabled={isSubmitting}
              >
                <option value="">Select</option>
                <option value="self">Myself</option>
                <option value="family">Family member</option>
                <option value="friend">Friend</option>
              </select>
              <FieldError name="careFor" />
            </div>

            <div className={classes.field}>
              <label className={classes.label} htmlFor="needWhen">When do you need care?</label>
              <select
                id="needWhen"
                name="needWhen"
                required
                className={classes.control}
                aria-invalid={fieldErrors.needWhen ? "true" : "false"}
                aria-describedby={describedBy("needWhen")}
                disabled={isSubmitting}
              >
                <option value="">Select</option>
                <option value="soon">Soon</option>
                <option value="1_3m">1–3 months</option>
                <option value="3m_plus">3+ months</option>
                <option value="not_sure">Not sure</option>
              </select>
              <FieldError name="needWhen" />
            </div>

            <div className={classes.field}>
              <label className={classes.label} htmlFor="typeOfCare">Type of care</label>
              <select
                id="typeOfCare"
                name="typeOfCare"
                required
                className={classes.control}
                aria-invalid={fieldErrors.typeOfCare ? "true" : "false"}
                aria-describedby={describedBy("typeOfCare")}
                disabled={isSubmitting}
              >
                <option value="">Select</option>
                <option value="hourly">Hourly</option>
                <option value="live_in">Live-in</option>
                <option value="night">Night</option>
                <option value="dementia">Dementia</option>
                <option value="companion">Companion</option>
              </select>
              <FieldError name="typeOfCare" />
            </div>
          </div>
        )}

        {/* Caregiver */}
        {isCaregiver && (
          <div className={classes.row3}>
            <div className={classes.field}>
              <label className={classes.label} htmlFor="yearsOfExperience">Years of experience</label>
              <select
                id="yearsOfExperience"
                name="yearsOfExperience"
                required
                className={classes.control}
                aria-invalid={fieldErrors.yearsOfExperience ? "true" : "false"}
                aria-describedby={describedBy("yearsOfExperience")}
                disabled={isSubmitting}
              >
                <option value="">Select</option>
                <option value="0_1">0–1</option>
                <option value="1_3">1–3</option>
                <option value="3_5">3–5</option>
                <option value="5_plus">5+</option>
              </select>
              <FieldError name="yearsOfExperience" />
            </div>

            <div className={classes.field}>
              <label className={classes.label} htmlFor="caregiverRole">Caregiving role</label>
              <select
                id="caregiverRole"
                name="caregiverRole"
                required
                className={classes.control}
                aria-invalid={fieldErrors.caregiverRole ? "true" : "false"}
                aria-describedby={describedBy("caregiverRole")}
                disabled={isSubmitting}
              >
                <option value="">Select</option>
                <option value="care_assistant">Care assistant</option>
                <option value="support_worker">Support worker</option>
                <option value="live_in_carer">Live-in carer</option>
                <option value="home_carer">Home carer</option>
                <option value="nurse">Nurse</option>
                <option value="companion">Companion</option>
                <option value="other">Other</option>
              </select>
              <FieldError name="caregiverRole" />
            </div>

            <div className={classes.field}>
              <label className={classes.label} htmlFor="hoursPerWeek">Hours per week available</label>
              <select
                id="hoursPerWeek"
                name="hoursPerWeek"
                required
                className={classes.control}
                aria-invalid={fieldErrors.hoursPerWeek ? "true" : "false"}
                aria-describedby={describedBy("hoursPerWeek")}
                disabled={isSubmitting}
              >
                <option value="">Select</option>
                <option value="lt_10">Less than 10</option>
                <option value="10_20">10–20</option>
                <option value="20_35">20–35</option>
                <option value="35_plus">35+</option>
              </select>
              <FieldError name="hoursPerWeek" />
            </div>
          </div>
        )}

        {/* Consents */}
        <div className={classes.field}>
          <label className={classes.checkboxRow} htmlFor="agreeTerms">
            <input
              id="agreeTerms"
              type="checkbox"
              name="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className={classes.checkboxInput}
              required
              aria-invalid={fieldErrors.agreeTerms ? "true" : "false"}
              aria-describedby={describedBy("agreeTerms")}
              disabled={isSubmitting}
            />
            I agree to the terms and conditions

            <Tooltip
              content={
                <>
                  By joining, you agree to our{" "}
                  <NavLink to="/terms" target="_blank" rel="noopener noreferrer">
                    Terms & Conditions
                  </NavLink>{" "}
                  and{" "}
                  <NavLink to="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </NavLink>
                  . We’ll only use your data to notify you about ICare.
                </>
              }
            >
              ?
            </Tooltip>
          </label>
          <FieldError name="agreeTerms" />
        </div>

        <div className={classes.actions}>
          <SubmitButton disabled={!canSubmit} className={classes.button}>
            {isSubmitting ? (
              <span className={classes.spinnerWrap}>
                <span className={classes.spinner} aria-hidden="true" />
                Submitting…
              </span>
            ) : result?.ok ? (
              result?.alreadyRegistered ? "Already registered ✓" : "You are now on the list ✓"
            ) : (
              "Join the waiting list"
            )}
          </SubmitButton>

          {result?.ok && result?.alreadyRegistered && (
            <p className={classes.note}>You're already on the waiting list.</p>
          )}
          {hasErrors && <p className={classes.note}>Please check the highlighted fields.</p>}
          {result?.ok === false && <p className={`${classes.note} ${classes.noteError}`}>{result.error}</p>}
        </div>
      </fetcher.Form>
    </>
  );
}
