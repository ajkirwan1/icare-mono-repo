import { NavLink, useFetcher } from "react-router";
import { useEffect, useMemo, useState } from "react";
import classes from "./forms.module.scss";
import SubmitButton from "../buttons/submit-buttons/submit-button";
import Tooltip from "../tooltip/tooltip";
import WaitinglistSuccessModal from "../modals/waitinglist-modal";
import CustomSelect from "../../../../forms/inputs/CustomSelect";

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

    // Receiver selects
    const [careFor, setCareFor] = useState("");
    const [needWhen, setNeedWhen] = useState("");
    const [typeOfCare, setTypeOfCare] = useState("");

    // Caregiver selects
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [caregiverRole, setCaregiverRole] = useState("");
    const [hoursPerWeek, setHoursPerWeek] = useState("");

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

    // ✅ tiny “thinner label” without touching SCSS
    const labelThin = { fontWeight: 600 };

    // ✅ bigger, clearer role selector (cards)
    const roleWrap = {
        marginTop: "0.35rem",
        marginBottom: "1.15rem",
        display: "grid",
        gap: 12,
        justifyItems: "center"
    };

    const roleGrid = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        alignItems: "stretch",
        maxWidth: 760
    };

    const roleCard = (active) => ({
        borderRadius: 18,
        border: active ? "1px solid rgba(119,141,67,0.55)" : "1px solid rgba(15,23,42,0.14)",
        background: "white",
        padding: "16px 16px",
        cursor: isSubmitting ? "not-allowed" : "pointer",
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
        textAlign: "center",
        minHeight: 74,
        transition: "transform .12s ease, background .12s ease, border-color .12s ease",
        userSelect: "none",
        opacity: isSubmitting ? 0.7 : 1
    });

    const roleTitle = (active) => ({
        margin: 0,
        fontSize: "1.12rem",
        fontWeight: 750,
        letterSpacing: "-0.15px",
        color: active ? "#778d43" : "rgba(15,23,42,0.92)",
        lineHeight: 1.15
    });

    const roleSub = {
        marginTop: 6,
        fontSize: "0.92rem",
        fontWeight: 520,
        color: "rgba(15,23,42,0.75)",
        lineHeight: 1.25
    };

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
                    <label className={classes.label} htmlFor="company" style={labelThin}>Company</label>
                    <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <input type="hidden" name="_delay" value={String(delayMs)} />

                {/* IMPORTANT: always submit userType even if selector hidden */}
                <input type="hidden" name="userType" value={tab} />

                {/* Common fields */}
                <div className={classes.row2}>
                    <div className={classes.field}>
                        <label className={classes.label} htmlFor="firstName" style={labelThin}>First name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            required
                            className={classes.control}
                            aria-invalid={fieldErrors.firstName ? "true" : "false"}
                            aria-describedby={describedBy("firstName")}
                            disabled={isSubmitting}
                            autoComplete="given-name"
                            placeholder="First name"
                        />
                        <FieldError name="firstName" />
                    </div>

                    <div className={classes.field}>
                        <label className={classes.label} htmlFor="lastName" style={labelThin}>Last name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            required
                            className={classes.control}
                            aria-invalid={fieldErrors.lastName ? "true" : "false"}
                            aria-describedby={describedBy("lastName")}
                            disabled={isSubmitting}
                            autoComplete="family-name"
                            placeholder="Last name"
                        />
                        <FieldError name="lastName" />
                    </div>
                </div>

                <div className={classes.row2}>
                    <div className={classes.field}>
                        <label className={classes.label} htmlFor="email" style={labelThin}>Email</label>
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
                            placeholder="email"
                        />
                        <FieldError name="email" />
                    </div>

                    <div className={classes.field}>
                        <label className={classes.label} htmlFor="postcode" style={labelThin}>Postcode</label>
                        <input
                            id="postcode"
                            name="postcode"
                            required
                            className={classes.control}
                            aria-invalid={fieldErrors.postcode ? "true" : "false"}
                            aria-describedby={describedBy("postcode")}
                            disabled={isSubmitting}
                            autoComplete="postal-code"
                            placeholder="Postal code"
                        />
                        <FieldError name="postcode" />
                    </div>
                </div>

                {/* User type selector (only on generic page) */}
                {!hideUserTypeSelector ? (
                    <fieldset aria-describedby={describedBy("userType")} style={{ border: "none", padding: 0, margin: 0 }}>
                        <legend className={classes.srOnly}>I am a</legend>

                        {/* ✅ Bigger centered selector */}
                        <div style={roleWrap}>
                            <span className={classes.label} style={labelThin}>I am a</span>

                            <div style={roleGrid}>
                                <label style={roleCard(isReceiver)}>
                                    <input
                                        type="radio"
                                        name="userTypePicker" // NOTE: different name so hidden userType is authoritative
                                        value="receiver"
                                        checked={isReceiver}
                                        onChange={() => setTab("receiver")}
                                        disabled={isSubmitting}
                                        aria-invalid={fieldErrors.userType ? "true" : "false"}
                                        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
                                    />
                                    <p style={roleTitle(isReceiver)}>Care receiver / family</p>
                                    <div style={roleSub}>Looking for care</div>
                                </label>

                                <label style={roleCard(isCaregiver)}>
                                    <input
                                        type="radio"
                                        name="userTypePicker"
                                        value="caregiver"
                                        checked={isCaregiver}
                                        onChange={() => setTab("caregiver")}
                                        disabled={isSubmitting}
                                        aria-invalid={fieldErrors.userType ? "true" : "false"}
                                        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
                                    />
                                    <p style={roleTitle(isCaregiver)}>Caregiver</p>
                                    <div style={roleSub}>Offering care work</div>
                                </label>
                            </div>

                            <FieldError name="userType" />
                        </div>
                    </fieldset>
                ) : null}
                {/* Receiver */}
                {isReceiver && (
                    <div className={classes.row3}>
                        <div className={classes.field}>
                            <label
                                className={classes.label}
                                id="careForLabel"
                                style={labelThin}
                            >
                                Who is the care for?
                            </label>

                            <CustomSelect
                                name="careFor"
                                labelId="careForLabel"
                                value={careFor}
                                onChange={setCareFor}
                                disabled={isSubmitting}
                                invalid={!!fieldErrors.careFor}
                                describedBy={describedBy("careFor")}
                                className={classes.customSelect}
                                controlClassName={`${classes.control} ${classes.customSelectControl}`}
                                placeholder="Select"
                                options={[
                                    { value: "", label: "Select" },
                                    { value: "self", label: "Myself" },
                                    { value: "family", label: "Family member" },
                                    { value: "friend", label: "Friend" },
                                ]}
                            />

                            <FieldError name="careFor" />
                        </div>

                        <div className={classes.field}>
                            <label
                                className={classes.label}
                                id="needWhenLabel"
                                style={labelThin}
                            >
                                When do you need care?
                            </label>

                            <CustomSelect
                                name="needWhen"
                                labelId="needWhenLabel"
                                value={needWhen}
                                onChange={setNeedWhen}
                                disabled={isSubmitting}
                                invalid={!!fieldErrors.needWhen}
                                describedBy={describedBy("needWhen")}
                                className={classes.customSelect}
                                controlClassName={`${classes.control} ${classes.customSelectControl}`}
                                placeholder="Select"
                                options={[
                                    { value: "", label: "Select" },
                                    { value: "soon", label: "Soon" },
                                    { value: "1_3m", label: "1–3 months" },
                                    { value: "3m_plus", label: "3+ months" },
                                    { value: "not_sure", label: "Not sure" },
                                ]}
                            />

                            <FieldError name="needWhen" />
                        </div>

                        <div className={classes.field}>
                            <label
                                className={classes.label}
                                id="typeOfCareLabel"
                                style={labelThin}
                            >
                                Type of care
                            </label>

                            <CustomSelect
                                name="typeOfCare"
                                labelId="typeOfCareLabel"
                                value={typeOfCare}
                                onChange={setTypeOfCare}
                                disabled={isSubmitting}
                                invalid={!!fieldErrors.typeOfCare}
                                describedBy={describedBy("typeOfCare")}
                                className={classes.customSelect}
                                controlClassName={`${classes.control} ${classes.customSelectControl}`}
                                placeholder="Select"
                                options={[
                                    { value: "", label: "Select" },
                                    { value: "hourly", label: "Hourly" },
                                    { value: "live_in", label: "Live-in" },
                                    { value: "night", label: "Night" },
                                    { value: "companion", label: "Companion" },
                                ]}
                            />

                            <FieldError name="typeOfCare" />
                        </div>
                    </div>
                )}

                {/* Caregiver */}
                {isCaregiver && (
                    <div className={classes.row3}>
                        <div className={classes.field}>
                            <label
                                className={classes.label}
                                id="yearsOfExperienceLabel"
                                style={labelThin}
                            >
                                Years of experience
                            </label>

                            <CustomSelect
                                name="yearsOfExperience"
                                labelId="yearsOfExperienceLabel"
                                value={yearsOfExperience}
                                onChange={setYearsOfExperience}
                                disabled={isSubmitting}
                                invalid={!!fieldErrors.yearsOfExperience}
                                describedBy={describedBy("yearsOfExperience")}
                                className={classes.customSelect}
                                controlClassName={`${classes.control} ${classes.customSelectControl}`}
                                placeholder="Select"
                                options={[
                                    { value: "", label: "Select" },
                                    { value: "0_1", label: "0–1" },
                                    { value: "1_3", label: "1–3" },
                                    { value: "3_5", label: "3–5" },
                                    { value: "5_plus", label: "5+" },
                                ]}
                            />

                            <FieldError name="yearsOfExperience" />
                        </div>

                        <div className={classes.field}>
                            <label
                                className={classes.label}
                                id="caregiverRoleLabel"
                                style={labelThin}
                            >
                                Caregiving role
                            </label>

                            <CustomSelect
                                name="caregiverRole"
                                labelId="caregiverRoleLabel"
                                value={caregiverRole}
                                onChange={setCaregiverRole}
                                disabled={isSubmitting}
                                invalid={!!fieldErrors.caregiverRole}
                                describedBy={describedBy("caregiverRole")}
                                className={classes.customSelect}
                                controlClassName={`${classes.control} ${classes.customSelectControl}`}
                                placeholder="Select"
                                options={[
                                    { value: "", label: "Select" },
                                    { value: "care_assistant", label: "Care assistant" },
                                    { value: "support_worker", label: "Support worker" },
                                    { value: "live_in_carer", label: "Live-in carer" },
                                    { value: "home_carer", label: "Home carer" },
                                    { value: "nurse", label: "Nurse" },
                                    { value: "companion", label: "Companion" },
                                    { value: "other", label: "Other" },
                                ]}
                            />

                            <FieldError name="caregiverRole" />
                        </div>

                        <div className={classes.field}>
                            <label
                                className={classes.label}
                                id="hoursPerWeekLabel"
                                style={labelThin}
                            >
                                Hours per week available
                            </label>

                            <CustomSelect
                                name="hoursPerWeek"
                                labelId="hoursPerWeekLabel"
                                value={hoursPerWeek}
                                onChange={setHoursPerWeek}
                                disabled={isSubmitting}
                                invalid={!!fieldErrors.hoursPerWeek}
                                describedBy={describedBy("hoursPerWeek")}
                                className={classes.customSelect}
                                controlClassName={`${classes.control} ${classes.customSelectControl}`}
                                placeholder="Select"
                                options={[
                                    { value: "", label: "Select" },
                                    { value: "lt_10", label: "Less than 10" },
                                    { value: "10_20", label: "10–20" },
                                    { value: "20_35", label: "20–35" },
                                    { value: "35_plus", label: "35+" },
                                ]}
                            />

                            <FieldError name="hoursPerWeek" />
                        </div>
                    </div>
                )}


                {/* Consents */}
                <div className={classes.field}>
                    <label className={classes.checkboxRow} htmlFor="agreeTerms" style={labelThin}>
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
                        I agree to the Privacy Policy and Trust & Safety commitments

                        <Tooltip
                            content={
                                <>
                                    By joining, you agree to our{" "}
                                    <NavLink to="/privacy">
                                        Privacy Policy
                                    </NavLink>{" "}
                                    and{" "}
                                    <NavLink to="/trust-and-safety">
                                        Trust & Safety
                                    </NavLink>
                                    {" "}commitments. We'll only use your data to notify you about ICare.
                                </>
                            }
                        >
                            ?
                        </Tooltip>
                    </label>
                    <FieldError name="agreeTerms" />
                </div>

                <div className={classes.actions}>
                    <SubmitButton disabled={!canSubmit} className={`${classes.button} ${classes.waitinglistButton}`}>
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

                {/* tiny responsive for role selector only */}

                <style>{`
            @media (max-width: 760px){
                .${classes.form} fieldset > div { max-width: 100%; }
            }

            /* --- Tooltip safety: never overflow viewport --- */
            [role="tooltip"]{
                max-width: min(92vw, 360px);
                box-sizing: border-box;
                overflow-wrap: anywhere;
                word-break: break-word;
            }

            /* jeśli tooltip ma bardzo długie linki/teksty */
            [role="tooltip"] a{
                overflow-wrap: anywhere;
                word-break: break-word;
            }

            /* Tooltip position is handled in Tooltip component (fixed + viewport clamped). */
            `}</style>


            </fetcher.Form>
        </>
    );
}
