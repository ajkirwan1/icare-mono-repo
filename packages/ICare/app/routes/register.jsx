import React, { useState, useMemo } from "react";
import { Link } from "react-router"; // lub "react-router-dom" — użyj zgodnie ze swoją appką

export default function Register() {
    const BRAND = {
        green: "#1FAB1F",
        dark: "#1f2a37",
        text: "#334155",
        border: "rgba(15,23,42,.12)",
        fieldBg: "#FFFFFF",
        softBg: "linear-gradient(180deg, #F9FBFC 0%, #FFFFFF 100%)",
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

    /* ===== STYLES ===== */
    const commonWrap = {
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: BRAND.dark,
    };

    const pageStyle = {
        ...commonWrap,
        background: BRAND.softBg,
        minHeight: "100vh",
    };

    const container = {
        width: "min(960px, 92vw)",
        margin: "0 auto",
        padding: "40px 0 60px",
    };

    const card = {
        background: "#fff",
        border: `1px solid ${BRAND.border}`,
        borderRadius: 16,
        padding: "22px",
    };

    const h1 = {
        margin: "0 0 10px",
        fontWeight: 900,
        letterSpacing: ".2px",
        fontSize: "clamp(1.6rem, 2.8vw, 2rem)",
        color: "#fff",
        textAlign: "center",
        textShadow: "0 2px 16px rgba(0,0,0,.35)",
    };

    const hero = {
        position: "relative",
        width: "100%",
        minHeight: "280px",
        display: "grid",
        placeItems: "center",
        background:
            "radial-gradient(80rem 40rem at 10% 10%, rgba(31,171,31,.08), transparent 60%), radial-gradient(80rem 40rem at 90% 90%, rgba(17,119,128,.06), transparent 60%), linear-gradient(160deg, #0b1220 0%, #0f172a 65%, #0b1220 100%)",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,.14)",
    };

    const subtitle = {
        margin: 0,
        textAlign: "center",
        color: "rgba(255,255,255,.92)",
        letterSpacing: ".02em",
    };

    const tabs = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        marginTop: 16,
    };

    const tabBtn = (active) => ({
        appearance: "none",
        border: `1px solid ${active ? BRAND.green : BRAND.border}`,
        background: active ? BRAND.green : "#fff",
        color: active ? "#fff" : BRAND.dark,
        fontWeight: 800,
        letterSpacing: ".02em",
        borderRadius: 999,
        padding: "10px 14px",
        cursor: "pointer",
        textAlign: "center",
    });

    const stepperWrap = {
        width: "min(960px, 92vw)",
        margin: "12px auto 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8,
    };

    const stepPill = (active, done) => ({
        padding: "10px 12px",
        borderRadius: 999,
        border: `1px solid ${active ? BRAND.green : BRAND.border}`,
        background: active ? "rgba(31,171,31,.10)" : "#fff",
        color: active ? BRAND.green : BRAND.dark,
        fontWeight: 800,
        textAlign: "center",
        position: "relative",
        ...(done
            ? { boxShadow: "inset 0 0 0 9999px rgba(31,171,31,.06)" }
            : null),
    });

    const grid2 = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 14,
    };

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
    const helper = { fontSize: 12.5, color: "#64748B", marginTop: 6 };
    const errorText = { fontSize: 12.5, color: "#b91c1c", marginTop: 6 };

    const pillGroup = { display: "flex", gap: 8, flexWrap: "wrap" };
    const pill = (active) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 999,
        border: `1px solid ${active ? BRAND.green : BRAND.border}`,
        background: active ? "rgba(31,171,31,.10)" : "#F1F5F9",
        color: active ? BRAND.green : BRAND.dark,
        fontWeight: 700,
        cursor: "pointer",
    });

    const ctaRow = {
        display: "flex",
        gap: 12,
        alignItems: "center",
        marginTop: 16,
        flexWrap: "wrap",
        justifyContent: "space-between",
    };
    const leftBtns = { display: "flex", gap: 8, flexWrap: "wrap" };

    const btnPrimary = {
        appearance: "none",
        border: "none",
        borderRadius: 999,
        background: BRAND.green,
        color: "#fff",
        padding: "12px 16px",
        fontWeight: 800,
        letterSpacing: ".02em",
        cursor: "pointer",
    };
    const btnGhost = {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "12px 14px",
        borderRadius: 999,
        border: `1px solid ${BRAND.border}`,
        color: BRAND.dark,
        background: "#fff",
        textDecoration: "none",
        fontWeight: 800,
        cursor: "pointer",
    };
    const btnBack = {
        ...btnGhost,
        border: `1px solid rgba(15,23,42,.18)`,
    };

    /* ===== HELPERS ===== */
    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const toggleMulti = (k, val) => {
        setForm((f) => {
            const has = f[k].includes(val);
            return { ...f, [k]: has ? f[k].filter((x) => x !== val) : [...f[k], val] };
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
        setErrors({});
        // Ostateczna walidacja wszystkich kroków:
        if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
            setStep([1, 2, 3].find((k) => !validateStep(k)) || 1);
            return;
        }
        try {
            setSubmitting(true);
            // TODO: call your API here
            alert(
                `Submitted ${tab} registration with required consents! (Replace alert with API call)`
            );
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
                <div style={pillGroup} role="group" aria-label="Skills">
                    {["Dementia", "Mobility", "Medication", "Post-surgery", "Driving"].map(
                        (s) => {
                            const active = form.skills.includes(s);
                            return (
                                <button
                                    type="button"
                                    key={s}
                                    onClick={() => toggleMulti("skills", s)}
                                    aria-pressed={active}
                                    style={pill(active)}
                                >
                                    {s}
                                </button>
                            );
                        }
                    )}
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
                <div style={pillGroup} role="group" aria-label="Languages">
                    {["English", "Polish", "German", "Ukrainian", "Other"].map((lang) => {
                        const active = form.languages.includes(lang);
                        return (
                            <button
                                type="button"
                                key={lang}
                                onClick={() => toggleMulti("languages", lang)}
                                aria-pressed={active}
                                style={pill(active)}
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
        <div style={pageStyle}>
            {/* HERO */}
            <section style={hero} aria-label="Registration">
                <div
                    style={{
                        width: "min(1000px, 92vw)",
                        margin: "0 auto",
                        textAlign: "center",
                        padding: "34px 0",
                    }}
                >
                    <h1 style={h1}>Create Your Account</h1>
                    <p style={subtitle}>
                        3 short steps — you can complete your profile later.
                    </p>

                    {/* Stepper */}
                    <div style={stepperWrap}>
                        <div style={stepPill(step === 1, step > 1)}>1. Account</div>
                        <div style={stepPill(step === 2, step > 2)}>2. Role details</div>
                        <div style={stepPill(step === 3, false)}>3. Summary & consents</div>
                    </div>

                    {/* Role toggle always visible */}
                    <div style={{ width: "min(560px, 92vw)", margin: "16px auto 0" }}>
                        <div style={tabs} role="tablist" aria-label="Role selection">
                            <button
                                role="tab"
                                aria-selected={tab === "caregiver"}
                                style={tabBtn(tab === "caregiver")}
                                onClick={() => {
                                    setTab("caregiver");
                                    update("role", "caregiver");
                                }}
                            >
                                Caregiver
                            </button>
                            <button
                                role="tab"
                                aria-selected={tab === "receiver"}
                                style={tabBtn(tab === "receiver")}
                                onClick={() => {
                                    setTab("receiver");
                                    update("role", "receiver");
                                }}
                            >
                                Care Receiver
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORM */}
            <section style={container}>
                <form onSubmit={onSubmit} noValidate aria-live="polite" style={{ ...card }}>
                    {/* STEP 1: COMMON */}
                    {step === 1 && (
                        <>
                            <div style={grid2}>
                                <div>
                                    <label style={label} htmlFor="firstName">
                                        First name *
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        style={field}
                                        value={form.firstName}
                                        onChange={(e) => update("firstName", e.target.value)}
                                        autoComplete="given-name"
                                        required
                                    />
                                    {errors.firstName && (
                                        <div style={errorText}>{errors.firstName}</div>
                                    )}
                                </div>

                                <div>
                                    <label style={label} htmlFor="lastName">
                                        Last name *
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        style={field}
                                        value={form.lastName}
                                        onChange={(e) => update("lastName", e.target.value)}
                                        autoComplete="family-name"
                                        required
                                    />
                                    {errors.lastName && (
                                        <div style={errorText}>{errors.lastName}</div>
                                    )}
                                </div>

                                <div>
                                    <label style={label} htmlFor="email">
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        style={field}
                                        value={form.email}
                                        onChange={(e) => update("email", e.target.value)}
                                        autoComplete="email"
                                        required
                                    />
                                    {errors.email && <div style={errorText}>{errors.email}</div>}
                                </div>

                                <div>
                                    <label style={label} htmlFor="phone">
                                        Phone *
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        style={field}
                                        value={form.phone}
                                        onChange={(e) => update("phone", e.target.value)}
                                        autoComplete="tel"
                                        required
                                    />
                                    {errors.phone && <div style={errorText}>{errors.phone}</div>}
                                </div>

                                <div>
                                    <label style={label} htmlFor="password">
                                        Password *
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        style={field}
                                        value={form.password}
                                        onChange={(e) => update("password", e.target.value)}
                                        autoComplete="new-password"
                                        required
                                        aria-describedby="pwd-hint"
                                    />
                                    <div id="pwd-hint" style={helper}>
                                        At least 8 characters.
                                    </div>
                                    {errors.password && (
                                        <div style={errorText}>{errors.password}</div>
                                    )}
                                </div>

                                <div>
                                    <label style={label} htmlFor="confirmPassword">
                                        Confirm password *
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        style={field}
                                        value={form.confirmPassword}
                                        onChange={(e) => update("confirmPassword", e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />
                                    {errors.confirmPassword && (
                                        <div style={errorText}>{errors.confirmPassword}</div>
                                    )}
                                </div>

                                <div style={{ gridColumn: "1 / -1" }}>
                                    <label style={label} htmlFor="location">
                                        Location (city/area) *
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        style={field}
                                        value={form.location}
                                        onChange={(e) => update("location", e.target.value)}
                                        placeholder="e.g., Warsaw, Mokotów"
                                        required
                                    />
                                    {errors.location && (
                                        <div style={errorText}>{errors.location}</div>
                                    )}
                                </div>
                            </div>

                            <div style={ctaRow}>
                                <div style={leftBtns}>
                                    {/* pusty placeholder do wyrównania */}
                                </div>
                                <button type="button" onClick={goNext} style={btnPrimary}>
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 2: ROLE-SPECIFIC */}
                    {step === 2 && (
                        <>
                            <div style={grid2}>
                                {tab === "caregiver" ? <CaregiverFields /> : <ReceiverFields />}
                            </div>

                            <div style={ctaRow}>
                                <div style={leftBtns}>
                                    <button type="button" onClick={goBack} style={btnBack}>
                                        Back
                                    </button>
                                </div>
                                <button type="button" onClick={goNext} style={btnPrimary}>
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 3: SUMMARY + CONSENTS */}
                    {step === 3 && (
                        <>
                            <h2
                                style={{
                                    margin: "0 0 10px",
                                    fontWeight: 900,
                                    letterSpacing: ".2px",
                                    fontSize: "clamp(1.1rem,1.6vw,1.25rem)",
                                    color: BRAND.dark,
                                }}
                            >
                                Summary
                            </h2>
                            <SummaryBlock />

                            <div
                                style={{
                                    marginTop: 18,
                                    padding: "14px 14px",
                                    borderRadius: 12,
                                    border: `1px solid ${BRAND.border}`,
                                    background: "rgba(31,171,31,.04)",
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        fontWeight: 900,
                                        fontSize: "1rem",
                                        color: BRAND.dark,
                                    }}
                                >
                                    Consents
                                </h3>

                                <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                                    {/* WYMAGANE */}
                                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <input
                                            type="checkbox"
                                            checked={form.c_terms}
                                            onChange={(e) => update("c_terms", e.target.checked)}
                                        />
                                        <span style={{ color: BRAND.text }}>
                                            I accept the{" "}
                                            <Link to="/terms" style={{ color: BRAND.green }}>
                                                Terms & Conditions
                                            </Link>{" "}
                                            (required)
                                            {errors.c_terms && (
                                                <div style={errorText}> {errors.c_terms}</div>
                                            )}
                                        </span>
                                    </label>

                                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <input
                                            type="checkbox"
                                            checked={form.c_privacy}
                                            onChange={(e) => update("c_privacy", e.target.checked)}
                                        />
                                        <span style={{ color: BRAND.text }}>
                                            I have read the{" "}
                                            <Link to="/privacy" style={{ color: BRAND.green }}>
                                                Privacy Policy
                                            </Link>{" "}
                                            and understand how my personal data is processed (required)
                                            {errors.c_privacy && (
                                                <div style={errorText}> {errors.c_privacy}</div>
                                            )}
                                        </span>
                                    </label>

                                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <input
                                            type="checkbox"
                                            checked={form.c_age18}
                                            onChange={(e) => update("c_age18", e.target.checked)}
                                        />
                                        <span style={{ color: BRAND.text }}>
                                            I confirm I am at least 18 years old (required)
                                            {errors.c_age18 && (
                                                <div style={errorText}> {errors.c_age18}</div>
                                            )}
                                        </span>
                                    </label>

                                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <input
                                            type="checkbox"
                                            checked={form.c_truth}
                                            onChange={(e) => update("c_truth", e.target.checked)}
                                        />
                                        <span style={{ color: BRAND.text }}>
                                            I confirm that the information provided is accurate and complete (required)
                                            {errors.c_truth && (
                                                <div style={errorText}> {errors.c_truth}</div>
                                            )}
                                        </span>
                                    </label>

                                    {/* OPCJONALNE */}
                                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <input
                                            type="checkbox"
                                            checked={form.c_marketing}
                                            onChange={(e) => update("c_marketing", e.target.checked)}
                                        />
                                        <span style={{ color: BRAND.text }}>
                                            I agree to receive occasional emails about product updates and tips (optional)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div style={ctaRow}>
                                <div style={leftBtns}>
                                    <button type="button" onClick={goBack} style={btnBack}>
                                        Back
                                    </button>
                                </div>
                                <button type="submit" style={btnPrimary} disabled={submitting}>
                                    {submitting ? "Creating account…" : "Create account"}
                                </button>
                            </div>
                        </>
                    )}
                </form>

                {/* Link do logowania pod kartą */}
                <div
                    style={{
                        width: "min(960px, 92vw)",
                        margin: "14px auto 0",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Link to="/login" style={btnGhost}>
                        I already have an account
                    </Link>
                </div>
            </section>
        </div>
    );
}
