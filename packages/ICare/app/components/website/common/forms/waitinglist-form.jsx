import { useFetcher } from "react-router";
import { useMemo, useState } from "react";
import classes from "./waitinglist-form.module.scss";
import SubmitButton from "../buttons/submit-buttons/submit-button";

export default function WaitinglistForm({
  action = "/waitinglist",
  method = "post",
  delayMs = 0
}) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const result = fetcher.data;

  const [tab, setTab] = useState("receiver");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const fieldErrors =
    result?.ok === false && result?.errors ? result.errors : {};

  const isReceiver = tab === "receiver";
  const isCaregiver = tab === "caregiver";

  const hasErrors = useMemo(
    () => Object.keys(fieldErrors || {}).length > 0,
    [fieldErrors]
  );

  const canSubmit = agreeTerms && !isSubmitting && !result?.ok;

  return (
    <fetcher.Form method={method} action={action} className={classes.form} noValidate>
      {/* Honeypot */}
      <div aria-hidden="true" className={classes.honeypot}>
        <label className={classes.label} htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="_delay" value={String(delayMs)} />

      {/* Common fields */}
      <div className={classes.grid2}>
        <div>
          <label className={classes.label}>First name</label>
          <input name="firstName" required className={classes.field} />
        </div>
        <div>
          <label className={classes.label}>Last name</label>
          <input name="lastName" required className={classes.field} />
        </div>
      </div>

      <div className={classes.grid2}>
        <div>
          <label className={classes.label}>Email</label>
          <input type="email" name="email" required className={classes.field} />
        </div>
        <div>
          <label className={classes.label}>Postcode</label>
          <input name="postcode" required className={classes.field} />
        </div>
      </div>

      {/* Radio tabs */}
      <fieldset>
        <legend className={classes.srOnly}>I am a</legend>
        <div className={classes.radioRow}>
          <span className={classes.label}>I am a</span>

          <label className={classes.radioLabel}>
            <input
              type="radio"
              name="userType"
              value="receiver"
              checked={isReceiver}
              onChange={() => setTab("receiver")}
              className={classes.radioInput}
            />
            Care receiver / family
          </label>

          <label className={classes.radioLabel}>
            <input
              type="radio"
              name="userType"
              value="caregiver"
              checked={isCaregiver}
              onChange={() => setTab("caregiver")}
              className={classes.radioInput}
            />
            Caregiver
          </label>
        </div>
      </fieldset>

      {/* Receiver */}
      {isReceiver && (
        <>
          <div>
            <label className={classes.label}>Who is the care for?</label>
            <select name="careFor" required className={classes.field}>
              <option value="">Select</option>
              <option value="self">Myself</option>
              <option value="family">Family member</option>
              <option value="friend">Friend</option>
            </select>
          </div>

          <div>
            <label className={classes.label}>When do you need care?</label>
            <select name="needWhen" required className={classes.field}>
              <option value="soon">Soon</option>
              <option value="1_3m">1–3 months</option>
              <option value="3m_plus">3+ months</option>
              <option value="not_sure">Not sure</option>
            </select>
          </div>

          <div>
            <label className={classes.label}>Type of care</label>
            <select name="typeOfCare" required className={classes.field}>
              <option value="hourly">Hourly</option>
              <option value="live_in">Live-in</option>
              <option value="night">Night</option>
              <option value="dementia">Dementia</option>
              <option value="companion">Companion</option>
            </select>
          </div>
        </>
      )}

      {/* Caregiver */}
      {isCaregiver && (
        <div className={classes.grid2}>
          <div>
            <label className={classes.label}>Years of experience</label>
            <select name="yearsOfExperience" required className={classes.field}>
              <option value="">Select</option>
              <option value="0_1">0–1</option>
              <option value="1_3">1–3</option>
              <option value="3_5">3–5</option>
              <option value="5_plus">5+</option>
            </select>
          </div>

          <div>
            <label className={classes.label}>Caregiving role</label>
            <select name="caregiverRole" required className={classes.field}>
              <option value="">Select</option>
              <option value="care_assistant">Care assistant</option>
              <option value="support_worker">Support worker</option>
              <option value="live_in_carer">Live-in carer</option>
              <option value="nurse">Nurse</option>
              <option value="companion">Companion</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      )}

      {/* Consents */}
      <div>
        <label className={classes.checkboxLabel}>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className={classes.checkboxInput}
            required
          />
          I agree to the terms and conditions
        </label>

        <label className={classes.checkboxLabel}>
          <input
            type="checkbox"
            name="subscribeNewsletter"
            className={classes.checkboxInput}
          />
          Subscribe to newsletter
        </label>
      </div>

      <div className={classes.btnWrap}>
        <SubmitButton disabled={!canSubmit}>
          {result?.ok ? "You are now on the list ✓" : "Join the waiting list"}
        </SubmitButton>
        {hasErrors && <p className={classes.note}>Please check the highlighted fields.</p>}
        {result?.ok && <p className={classes.note}>Thanks — you’re on the waiting list.</p>}
        {result?.ok === false && <p className={classes.note}>{result.error}</p>}

        <p className={classes.note}>
          We’ll send one launch email and occasional updates. Unsubscribe anytime.
        </p>
      </div>
    </fetcher.Form>
  );
}
