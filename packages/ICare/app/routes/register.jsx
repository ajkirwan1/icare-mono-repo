import React, { useState } from "react";
import { Link } from "react-router";
import ICareFooter from "../components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "../components/website/pages/shared/icare-navbar";
import styles from "./register.module.scss";

export function meta() {
    return [
        { title: "ICare | Create your account" },
        { name: "description", content: "Create your ICare account in three simple steps." }
    ];
}

export default function Register() {
    const OWN_SKILL_OPTIONS = [
        "Medication management",
        "Dementia support",
        "Mobility assistance",
        "Errands",
    ];
    const BRAND = {
        green: "#1FAB1F",
        dark: "#000000",
        text: "#000000",
        border: "rgba(15,23,42,.12)",
        fieldBg: "#FFFFFF",
    };

    /* ===== STEPS ===== */
    const [step, setStep] = useState(1); // 1: konto, 2: rola, 3: podsumowanie + zgody
    const [tab, setTab] = useState("caregiver"); // 'caregiver' | 'receiver'

    /* ===== FORM STATE ===== */
    const [form, setForm] = useState({
        role: "caregiver",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        location: "",
        // caregiver specific
        experienceYears: "",
        availability: "",
        skills: [],
        // receiver specific
        careType: "",
        hoursPerWeek: "",
        languages: [],
        // consents
        c_terms: false,            // WYMAGANE: akceptuję Regulamin
        c_privacy: false,          // WYMAGANE: zapoznałem/am się z Polityką prywatności
        c_age18: false,            // WYMAGANE: mam 18+
        c_truth: false,            // WYMAGANE: dane są prawdziwe
        c_marketing: false,        // OPCJONALNE: kontakt marketingowy
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [ownSkills, setOwnSkills] = useState([]);

    const label = {
        fontWeight: 700,
        fontSize: 14,
        color: BRAND.dark,
        display: "block",
        marginBottom: 6,
    };
    const field = {
        width: "100%",
        background: BRAND.fieldBg,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 12,
        padding: "12px 12px",
        fontSize: 15,
        color: BRAND.text,
    };
    const helper = { fontSize: 12.5, color: "#000000", marginTop: 6 };
    const errorText = { fontSize: 12.5, color: "#b91c1c", marginTop: 6 };

    /* ===== HELPERS ===== */
    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const toggleMulti = (k, val) => {
        setForm((f) => {
            const has = f[k].includes(val);
            return { ...f, [k]: has ? f[k].filter((x) => x !== val) : [...f[k], val] };
        });
    };

    const syncOwnSkills = (nextOwnSkills) => {
        setOwnSkills(nextOwnSkills);
        setForm((f) => {
            const nonOwnSkills = f.skills.filter((s) => !OWN_SKILL_OPTIONS.includes(s));
            return { ...f, skills: [...nonOwnSkills, ...nextOwnSkills] };
        });
    };

    const validateStep = (s) => {
        const e = {};
        if (s === 1) {
            if (!form.firstName.trim()) e.firstName = "First name is required.";
            if (!form.lastName.trim()) e.lastName = "Last name is required.";
            if (!/^\S+@\S+\.\S+$/.test(form.email))
                e.email = "Valid email is required.";
            if (!/^[\d\s()+-]{6,}$/.test(form.phone))
                e.phone = "Valid phone is required.";
            if (form.password.length < 8) e.password = "Min. 8 characters.";
            if (form.password !== form.confirmPassword)
                e.confirmPassword = "Passwords must match.";
            if (!form.location.trim()) e.location = "Location is required.";
        }
        if (s === 2) {
            if (tab === "caregiver") {
                if (!form.experienceYears) e.experienceYears = "Select experience.";
                if (!form.availability) e.availability = "Choose availability.";
                if (form.skills.length === 0) e.skills = "Pick at least one skill.";
            } else {
                if (!form.careType) e.careType = "Select care type.";
                if (!form.hoursPerWeek) e.hoursPerWeek = "Choose weekly hours.";
                if (form.languages.length === 0)
                    e.languages = "Pick at least one language.";
            }
        }
        if (s === 3) {
            if (!form.c_terms) e.c_terms = "Required.";
            if (!form.c_privacy) e.c_privacy = "Required.";
            if (!form.c_age18) e.c_age18 = "Required.";
            if (!form.c_truth) e.c_truth = "Required.";
            // c_marketing — opcjonalne
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const goNext = () => {
        if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
    };
    const goBack = () => setStep((s) => Math.max(1, s - 1));

    /* ===== SUBMIT ===== */
    const onSubmit = async (ev) => {
        ev.preventDefault();
        try {
            setSubmitting(true);
            // TODO: call your API here
            window.location.assign("/caregiver/profile");
        } finally {
            setSubmitting(false);
        }
    };

    /* ===== ROLE SUB-FORMS ===== */
    const CaregiverFields = () => (
        <>
            <div>
                <label style={label} htmlFor="experienceYears">
                    Experience (years) *
                </label>
                <select
                    id="experienceYears"
                    style={field}
                    value={form.experienceYears}
                    onChange={(e) => update("experienceYears", e.target.value)}
                >
                    <option value="">Select…</option>
                    <option value="0-1">0–1</option>
                    <option value="2-4">2–4</option>
                    <option value="5-8">5–8</option>
                    <option value="9+">9+</option>
                </select>
                {errors.experienceYears && (
                    <div style={errorText}>{errors.experienceYears}</div>
                )}
            </div>

            <div>
                <label style={label} htmlFor="availability">
                    Availability *
                </label>
                <select
                    id="availability"
                    style={field}
                    value={form.availability}
                    onChange={(e) => update("availability", e.target.value)}
                >
                    <option value="">Select…</option>
                    <option value="hourly">Hourly</option>
                    <option value="live-in">Live-in</option>
                    <option value="overnight">Overnight</option>
                    <option value="weekends">Weekends</option>
                </select>
                {errors.availability && (
                    <div style={errorText}>{errors.availability}</div>
                )}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
                <span style={label}>Skills *</span>
                <div className={styles.pillGroup} role="group" aria-label="Skills">
                    {[
                        "Post-surgery",
                        "Driving",
                        "Personal care",
                        "Meal preparation",
                        "Companionship",
                        "Housekeeping",
                    ].map(
                        (s) => {
                            const active = form.skills.includes(s);
                            return (
                                <button
                                    type="button"
                                    key={s}
                                    onClick={() => toggleMulti("skills", s)}
                                    aria-pressed={active}
                                    className={`${styles.choicePill} ${active ? styles.choicePillActive : ""}`}
                                >
                                    {s}
                                </button>
                            );
                        }
                    )}
                </div>
                <div style={{ marginTop: 10, maxWidth: 280 }}>
                    <label style={label} htmlFor="ownSkill">
                        Own skill
                    </label>
                    <select
                        id="ownSkill"
                        style={field}
                        multiple
                        value={ownSkills}
                        onChange={(e) => {
                            const values = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            );
                            syncOwnSkills(values);
                        }}
                    >
                        {OWN_SKILL_OPTIONS.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.skills && <div style={errorText}>{errors.skills}</div>}
                <div style={helper}>Select all that apply.</div>
            </div>
        </>
    );

    const ReceiverFields = () => (
        <>
            <div>
                <label style={label} htmlFor="careType">
                    Care type *
                </label>
                <select
                    id="careType"
                    style={field}
                    value={form.careType}
                    onChange={(e) => update("careType", e.target.value)}
                >
                    <option value="">Select…</option>
                    <option value="hourly">Hourly</option>
                    <option value="live-in">Live-in</option>
                    <option value="overnight">Overnight</option>
                    <option value="respite">Respite</option>
                </select>
                {errors.careType && <div style={errorText}>{errors.careType}</div>}
            </div>

            <div>
                <label style={label} htmlFor="hoursPerWeek">
                    Hours per week *
                </label>
                <select
                    id="hoursPerWeek"
                    style={field}
                    value={form.hoursPerWeek}
                    onChange={(e) => update("hoursPerWeek", e.target.value)}
                >
                    <option value="">Select…</option>
                    <option value="0-10">0–10</option>
                    <option value="11-20">11–20</option>
                    <option value="21-35">21–35</option>
                    <option value="36+">36+</option>
                </select>
                {errors.hoursPerWeek && (
                    <div style={errorText}>{errors.hoursPerWeek}</div>
                )}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
                <span style={label}>Languages *</span>
                <div className={styles.pillGroup} role="group" aria-label="Languages">
                    {["English", "Polish", "German", "Other"].map((lang) => {
                        const active = form.languages.includes(lang);
                        return (
                            <button
                                type="button"
                                key={lang}
                                onClick={() => toggleMulti("languages", lang)}
                                aria-pressed={active}
                                className={`${styles.choicePill} ${active ? styles.choicePillActive : ""}`}
                            >
                                {lang}
                            </button>
                        );
                    })}
                </div>
                {errors.languages && <div style={errorText}>{errors.languages}</div>}
            </div>
        </>
    );

    /* ===== RENDER HELPERS ===== */
    const SummaryBlock = () => {
        const rowsCommon = [
            ["Role", form.role],
            ["First name", form.firstName],
            ["Last name", form.lastName],
            ["Email", form.email],
            ["Phone", form.phone],
            ["Location", form.location],
        ];

        const rowsRole =
            tab === "caregiver"
                ? [
                    ["Experience", form.experienceYears || "—"],
                    ["Availability", form.availability || "—"],
                    ["Skills", form.skills.join(", ") || "—"],
                ]
                : [
                    ["Care type", form.careType || "—"],
                    ["Hours per week", form.hoursPerWeek || "—"],
                    ["Languages", form.languages.join(", ") || "—"],
                ];

        return (
            <div
                style={{
                    border: `1px solid ${BRAND.border}`,
                    borderRadius: 12,
                    overflow: "hidden",
                }}
            >
                {[...rowsCommon, ...rowsRole].map(([k, v], i) => (
                    <div
                        key={k}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "200px 1fr",
                            gap: 12,
                            padding: "12px 14px",
                            background: i % 2 ? "#FFFFFF" : "#F8FAFC",
                            borderBottom:
                                i === rowsCommon.length + rowsRole.length - 1
                                    ? "none"
                                    : `1px solid ${BRAND.border}`,
                        }}
                    >
                        <div style={{ fontWeight: 800, color: BRAND.dark }}>{k}</div>
                        <div style={{ color: BRAND.text }}>{v}</div>
                    </div>
                ))}
            </div>
        );
    };

    /* ===== VIEW ===== */
    return (
        <>
            <ICareNavbar />
            <div className={styles.page}>
                {/* HERO */}
                {/* ============================
   REGISTRATION HERO
============================ */}
                <section
                    aria-label="Registration"
                    className={styles.hero}
                >
                    <div className={styles.heroInner}>
                        <h1 className={styles.title}>Create Your Account</h1>

                        <p className={styles.subtitle}>
                            3 short steps — you can complete your profile later.
                        </p>

                    {/* ============================
           STEPPER
        ============================ */}
                    <div className={styles.stepper}>
                        <div className={`${styles.stepPill} ${step === 1 ? styles.stepActive : step > 1 ? styles.stepDone : ""}`}>
                            1. Account
                        </div>

                        <div className={`${styles.stepPill} ${step === 2 ? styles.stepActive : step > 2 ? styles.stepDone : ""}`}>
                            2. Role details
                        </div>

                        <div className={`${styles.stepPill} ${step === 3 ? styles.stepActive : ""}`}>
                            3. Summary & consents
                        </div>
                    </div>

                    {/* ============================
           ROLE TOGGLE
        ============================ */}
                    <div className={styles.roleToggleWrap}>
                        <div
                            role="tablist"
                            aria-label="Role selection"
                            className={styles.roleToggle}
                        >
                            <button
                                role="tab"
                                aria-selected={tab === "caregiver"}
                                onClick={() => {
                                    setTab("caregiver");
                                    update("role", "caregiver");
                                }}
                                className={`${styles.roleTab} ${styles.roleTabLeft} ${tab === "caregiver" ? styles.roleTabActive : ""}`}
                            >
                                Caregiver
                            </button>

                            <button
                                role="tab"
                                aria-selected={tab === "receiver"}
                                onClick={() => {
                                    setTab("receiver");
                                    update("role", "receiver");
                                }}
                                className={`${styles.roleTab} ${tab === "receiver" ? styles.roleTabActive : ""}`}
                            >
                                Care Receiver
                            </button>
                        </div>
                    </div>
                    </div>
                </section>

                {/* ============================
   FORM SECTION
============================ */}
                <section
                    className={styles.formSection}
                >
                    <form
                        onSubmit={onSubmit}
                        noValidate
                        aria-live="polite"
                        className={styles.formShell}
                    >
                    {/* ============================  
            STEP 1 
        ============================ */}
                    {step === 1 && (
                        <>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
                                    gap: "1.4rem",
                                }}
                            >
                                {/* FIRST NAME */}
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        style={{
                                            fontWeight: 800,
                                            fontSize: ".92rem",
                                            color: "#0F172A",
                                            marginBottom: "6px",
                                            display: "block",
                                        }}
                                    >
                                        First name *
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(15,23,42,0.14)",
                                            background: "#FFFFFF",
                                            outline: "none",
                                            fontSize: ".97rem",
                                            transition: "border-color .2s, box-shadow .2s",
                                        }}
                                        value={form.firstName}
                                        onChange={(e) => update("firstName", e.target.value)}
                                        autoComplete="given-name"
                                        required
                                    />
                                    {errors.firstName && (
                                        <div style={{ color: "#B91C1C", fontSize: ".82rem", marginTop: "4px" }}>
                                            {errors.firstName}
                                        </div>
                                    )}
                                </div>

                                {/* LAST NAME */}
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        style={{
                                            fontWeight: 800,
                                            fontSize: ".92rem",
                                            color: "#0F172A",
                                            marginBottom: "6px",
                                            display: "block",
                                        }}
                                    >
                                        Last name *
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(15,23,42,0.14)",
                                            background: "#FFFFFF",
                                            outline: "none",
                                            fontSize: ".97rem",
                                            transition: "border-color .2s, box-shadow .2s",
                                        }}
                                        value={form.lastName}
                                        onChange={(e) => update("lastName", e.target.value)}
                                        autoComplete="family-name"
                                        required
                                    />
                                    {errors.lastName && (
                                        <div style={{ color: "#B91C1C", fontSize: ".82rem", marginTop: "4px" }}>
                                            {errors.lastName}
                                        </div>
                                    )}
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        style={{
                                            fontWeight: 800,
                                            fontSize: ".92rem",
                                            color: "#0F172A",
                                            marginBottom: "6px",
                                            display: "block",
                                        }}
                                    >
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(15,23,42,0.14)",
                                            background: "#FFFFFF",
                                            outline: "none",
                                            fontSize: ".97rem",
                                            transition: "border-color .2s, box-shadow .2s",
                                        }}
                                        value={form.email}
                                        onChange={(e) => update("email", e.target.value)}
                                        autoComplete="email"
                                        required
                                    />
                                    {errors.email && (
                                        <div style={{ color: "#B91C1C", fontSize: ".82rem", marginTop: "4px" }}>
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        style={{
                                            fontWeight: 800,
                                            fontSize: ".92rem",
                                            color: "#0F172A",
                                            marginBottom: "6px",
                                            display: "block",
                                        }}
                                    >
                                        Phone *
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(15,23,42,0.14)",
                                            background: "#FFFFFF",
                                            outline: "none",
                                            fontSize: ".97rem",
                                            transition: "border-color .2s, box-shadow .2s",
                                        }}
                                        value={form.phone}
                                        onChange={(e) => update("phone", e.target.value)}
                                        autoComplete="tel"
                                        required
                                    />
                                    {errors.phone && (
                                        <div style={{ color: "#B91C1C", fontSize: ".82rem", marginTop: "4px" }}>
                                            {errors.phone}
                                        </div>
                                    )}
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        style={{
                                            fontWeight: 800,
                                            fontSize: ".92rem",
                                            color: "#0F172A",
                                            marginBottom: "6px",
                                            display: "block",
                                        }}
                                    >
                                        Password *
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(15,23,42,0.14)",
                                            background: "#FFFFFF",
                                            outline: "none",
                                            fontSize: ".97rem",
                                            transition: "border-color .2s, box-shadow .2s",
                                        }}
                                        value={form.password}
                                        onChange={(e) => update("password", e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <div
                                        style={{
                                            fontSize: ".82rem",
                                            opacity: 0.7,
                                            marginTop: "4px",
                                            color: "#000000",
                                        }}
                                    >
                                        At least 8 characters.
                                    </div>
                                    {errors.password && (
                                        <div style={{ color: "#B91C1C", fontSize: ".82rem", marginTop: "4px" }}>
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                {/* CONFIRM PASSWORD */}
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        style={{
                                            fontWeight: 800,
                                            fontSize: ".92rem",
                                            color: "#0F172A",
                                            marginBottom: "6px",
                                            display: "block",
                                        }}
                                    >
                                        Confirm password *
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(15,23,42,0.14)",
                                            background: "#FFFFFF",
                                            outline: "none",
                                            fontSize: ".97rem",
                                            transition: "border-color .2s, box-shadow .2s",
                                        }}
                                        value={form.confirmPassword}
                                        onChange={(e) => update("confirmPassword", e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />
                                    {errors.confirmPassword && (
                                        <div style={{ color: "#B91C1C", fontSize: ".82rem", marginTop: "4px" }}>
                                            {errors.confirmPassword}
                                        </div>
                                    )}
                                </div>

                                {/* LOCATION */}
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <label
                                        htmlFor="location"
                                        style={{
                                            fontWeight: 800,
                                            fontSize: ".92rem",
                                            color: "#0F172A",
                                            marginBottom: "6px",
                                            display: "block",
                                        }}
                                    >
                                        Location (city/area) *
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1px solid rgba(15,23,42,0.14)",
                                            background: "#FFFFFF",
                                            outline: "none",
                                            fontSize: ".97rem",
                                            transition: "border-color .2s, box-shadow .2s",
                                        }}
                                        value={form.location}
                                        onChange={(e) =>
                                            update("location", e.target.value)
                                        }
                                        placeholder="e.g., London"
                                        required
                                    />
                                    {errors.location && (
                                        <div style={{ color: "#B91C1C", fontSize: ".82rem", marginTop: "4px" }}>
                                            {errors.location}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTA ROW */}
                            <div className={styles.actionRowEnd}>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className={styles.btnPrimary}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {/* ============================  
            STEP 2 
        ============================ */}
                    {step === 2 && (
                        <>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
                                    gap: "1.4rem",
                                }}
                            >
                                {tab === "caregiver" ? (
                                    <CaregiverFields />
                                ) : (
                                    <ReceiverFields />
                                )}
                            </div>

                            <div className={styles.actionRowBetween}>
                                <button
                                    type="button"
                                    onClick={goBack}
                                    className={styles.btnSecondary}
                                >
                                    Back
                                </button>

                                <button
                                    type="button"
                                    onClick={goNext}
                                    className={styles.btnPrimary}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {/* ============================  
            STEP 3 
        ============================ */}
                    {step === 3 && (
                        <>
                            <h2
                                style={{
                                    margin: "0 0 10px",
                                    fontWeight: 900,
                                    letterSpacing: ".2px",
                                    fontSize: "clamp(1.1rem,1.6vw,1.25rem)",
                                    color: "#0F172A",
                                }}
                            >
                                Summary
                            </h2>

                            <SummaryBlock />

                            {/* CONSENTS */}
                            <div
                                style={{
                                    marginTop: 18,
                                    padding: "14px 14px",
                                    borderRadius: 12,
                                    border: "1px solid rgba(15,23,42,0.14)",
                                    background: "rgba(31,171,31,.04)",
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        fontWeight: 900,
                                        fontSize: "1rem",
                                        color: "#0F172A",
                                    }}
                                >
                                    Consents
                                </h3>

                                <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                                    {[
                                        {
                                            key: "c_terms",
                                            label: (
                                                <>
                                                    I have read the{" "}
                                                    <Link to="/privacy" className={styles.inlinePolicyLink}>
                                                        Privacy Policy
                                                    </Link>{" "}
                                                    and{" "}
                                                    <Link to="/trust-and-safety" className={styles.inlinePolicyLink}>
                                                        Trust & Safety
                                                    </Link>{" "}
                                                    commitments (required)
                                                </>
                                            ),
                                        },
                                        {
                                            key: "c_age18",
                                            label: <>I confirm I am at least 18 years old (required)</>,
                                        },
                                        {
                                            key: "c_truth",
                                            label: (
                                                <>
                                                    I confirm the information provided is accurate (required)
                                                </>
                                            ),
                                        },
                                        {
                                            key: "c_marketing",
                                            optional: true,
                                            label: (
                                                <>I agree to receive occasional product updates (optional)</>
                                            ),
                                        },
                                    ].map((c) => (
                                        <label
                                            key={c.key}
                                            className={styles.consentLabel}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form[c.key]}
                                                onChange={(e) => update(c.key, e.target.checked)}
                                            />
                                            <span>
                                                {c.label}
                                                {errors[c.key] && (
                                                    <div style={{ color: "#B91C1C", fontSize: ".82rem" }}>
                                                        {errors[c.key]}
                                                    </div>
                                                )}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* CTA ROW */}
                            <div className={styles.actionRowBetween}>
                                <button
                                    type="button"
                                    onClick={goBack}
                                    className={styles.btnSecondary}
                                >
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={styles.btnPrimary}
                                >
                                    {submitting ? "Creating account…" : "Create account"}
                                </button>
                            </div>
                        </>
                    )}
                    </form>

                    {/* LOGIN LINK */}
                    <div className={styles.loginLinkRow}>
                        <Link to="/login" className={styles.loginLink}>
                            I already have an account
                        </Link>
                    </div>
                </section>
            </div>
            <ICareFooter />
        </>
    );
}
