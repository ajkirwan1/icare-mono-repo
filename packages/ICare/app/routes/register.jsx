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
            {/* ============================
   REGISTRATION HERO
============================ */}
            <section
                aria-label="Registration"
                style={{
                    padding: "clamp(4.5rem, 8vw, 6rem) 0",
                    background: "#F8FAF9",
                    borderBottom: "1px solid rgba(15,23,42,0.06)",
                    fontFamily: "Inter, system-ui",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        width: "min(1000px, 92vw)",
                        margin: "0 auto",
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            fontSize: "clamp(2.4rem,3.4vw,2.8rem)",
                            letterSpacing: "-0.5px",
                            color: "#0F172A",
                            lineHeight: 1.12,
                        }}
                    >
                        Create Your Account
                    </h1>

                    <p
                        style={{
                            margin: "1rem auto 2.6rem",
                            maxWidth: "60ch",
                            fontSize: "1.25rem",
                            color: "#475569",
                            lineHeight: 1.66,
                            opacity: 0.95,
                        }}
                    >
                        3 short steps — you can complete your profile later.
                    </p>

                    {/* ============================
           STEPPER
        ============================ */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                            margin: "2.2rem auto 0",
                        }}
                    >
                        <div
                            style={{
                                padding: ".8rem 1.4rem",
                                borderRadius: 999,
                                fontWeight: 800,
                                fontSize: ".95rem",
                                color: step === 1 ? "#0F172A" : "#475569",
                                background:
                                    step === 1
                                        ? "rgba(31,171,31,0.18)"
                                        : step > 1
                                            ? "rgba(15,23,42,0.06)"
                                            : "rgba(15,23,42,0.04)",
                                border:
                                    step === 1
                                        ? "1px solid rgba(31,171,31,0.36)"
                                        : "1px solid rgba(0,0,0,0.10)",
                                transition: "all .25s ease",
                            }}
                        >
                            1. Account
                        </div>

                        <div
                            style={{
                                padding: ".8rem 1.4rem",
                                borderRadius: 999,
                                fontWeight: 800,
                                fontSize: ".95rem",
                                color: step === 2 ? "#0F172A" : "#475569",
                                background:
                                    step === 2
                                        ? "rgba(31,171,31,0.18)"
                                        : step > 2
                                            ? "rgba(15,23,42,0.06)"
                                            : "rgba(15,23,42,0.04)",
                                border:
                                    step === 2
                                        ? "1px solid rgba(31,171,31,0.36)"
                                        : "1px solid rgba(0,0,0,0.10)",
                                transition: "all .25s ease",
                            }}
                        >
                            2. Role details
                        </div>

                        <div
                            style={{
                                padding: ".8rem 1.4rem",
                                borderRadius: 999,
                                fontWeight: 800,
                                fontSize: ".95rem",
                                color: step === 3 ? "#0F172A" : "#475569",
                                background:
                                    step === 3
                                        ? "rgba(31,171,31,0.18)"
                                        : "rgba(15,23,42,0.06)",
                                border:
                                    step === 3
                                        ? "1px solid rgba(31,171,31,0.36)"
                                        : "1px solid rgba(0,0,0,0.10)",
                                transition: "all .25s ease",
                            }}
                        >
                            3. Summary & consents
                        </div>
                    </div>

                    {/* ============================
           ROLE TOGGLE
        ============================ */}
                    <div style={{ width: "min(560px, 92vw)", margin: "18px auto 0" }}>
                        <div
                            role="tablist"
                            aria-label="Role selection"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                background: "#FFFFFF",
                                borderRadius: 16,
                                overflow: "hidden",
                                border: "1px solid rgba(15,23,42,0.08)",
                                boxShadow: "0 6px 22px rgba(0,0,0,0.06)",
                            }}
                        >
                            <button
                                role="tab"
                                aria-selected={tab === "caregiver"}
                                onClick={() => {
                                    setTab("caregiver");
                                    update("role", "caregiver");
                                }}
                                style={{
                                    padding: "1rem 0",
                                    fontWeight: 800,
                                    background:
                                        tab === "caregiver"
                                            ? "rgba(31,171,31,0.15)"
                                            : "#FFFFFF",
                                    color:
                                        tab === "caregiver"
                                            ? "#0F172A"
                                            : "rgba(15,23,42,0.72)",
                                    fontSize: "1rem",
                                    border: "none",
                                    borderRight: "1px solid rgba(15,23,42,0.06)",
                                    cursor: "pointer",
                                    transition: "all .22s ease",
                                }}
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
                                style={{
                                    padding: "1rem 0",
                                    fontWeight: 800,
                                    background:
                                        tab === "receiver"
                                            ? "rgba(31,171,31,0.15)"
                                            : "#FFFFFF",
                                    color:
                                        tab === "receiver"
                                            ? "#0F172A"
                                            : "rgba(15,23,42,0.72)",
                                    fontSize: "1rem",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "all .22s ease",
                                }}
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
                style={{
                    padding: "3.6rem 0 4rem",
                    background: "#FFFFFF",
                    fontFamily: "Inter, system-ui",
                }}
            >
                <form
                    onSubmit={onSubmit}
                    noValidate
                    aria-live="polite"
                    style={{
                        width: "min(880px,92vw)",
                        margin: "0 auto",
                        background: "#FFFFFF",
                        border: "1px solid rgba(15,23,42,0.06)",
                        borderRadius: 28,
                        padding: "clamp(2.4rem,4vw,3rem)",
                        boxShadow: "0 14px 36px rgba(0,0,0,0.05)",
                        display: "grid",
                        gap: "2.5rem",
                    }}
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
                                            color: "#475569",
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
                                        placeholder="e.g., Warsaw, Mokotów"
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
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: "1rem",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={goNext}
                                    style={{
                                        background: "#0F3D20E5",
                                        color: "#fff",
                                        padding: "1rem 2.4rem",
                                        borderRadius: 999,
                                        fontWeight: 900,
                                        fontSize: "1.05rem",
                                        boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "all .25s ease",
                                    }}
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

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "1rem",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={goBack}
                                    style={{
                                        padding: ".85rem 1.6rem",
                                        borderRadius: 999,
                                        background: "#FFFFFF",
                                        border: "2px solid rgba(15,23,42,0.28)",
                                        color: "#0F172A",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        fontSize: ".95rem",
                                        transition: "all .25s ease",
                                    }}
                                >
                                    Back
                                </button>

                                <button
                                    type="button"
                                    onClick={goNext}
                                    style={{
                                        background: "#0F3D20E5",
                                        color: "#fff",
                                        padding: "1rem 2.4rem",
                                        borderRadius: 999,
                                        fontWeight: 900,
                                        fontSize: "1.05rem",
                                        boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "all .25s ease",
                                    }}
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
                                                    I accept the{" "}
                                                    <Link to="/terms" style={{ color: "#1FAB1F", fontWeight: 700 }}>
                                                        Terms & Conditions
                                                    </Link>{" "}
                                                    (required)
                                                </>
                                            ),
                                        },
                                        {
                                            key: "c_privacy",
                                            label: (
                                                <>
                                                    I have read the{" "}
                                                    <Link
                                                        to="/privacy"
                                                        style={{ color: "#1FAB1F", fontWeight: 700 }}
                                                    >
                                                        Privacy Policy
                                                    </Link>{" "}
                                                    (required)
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
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                                alignItems: "flex-start",
                                                fontSize: ".95rem",
                                                color: "#475569",
                                            }}
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
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "1rem",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={goBack}
                                    style={{
                                        padding: ".85rem 1.6rem",
                                        borderRadius: 999,
                                        background: "#FFFFFF",
                                        border: "2px solid rgba(15,23,42,0.28)",
                                        color: "#0F172A",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        fontSize: ".95rem",
                                        transition: "all .25s ease",
                                    }}
                                >
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        background: "#0F3D20E5",
                                        color: "#fff",
                                        padding: "1rem 2.4rem",
                                        borderRadius: 999,
                                        fontWeight: 900,
                                        fontSize: "1.05rem",
                                        boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "all .25s ease",
                                        opacity: submitting ? 0.7 : 1,
                                    }}
                                >
                                    {submitting ? "Creating account…" : "Create account"}
                                </button>
                            </div>
                        </>
                    )}
                </form>

                {/* LOGIN LINK */}
                <div
                    style={{
                        width: "min(960px, 92vw)",
                        margin: "14px auto 0",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Link
                        to="/login"
                        style={{
                            padding: ".8rem 1.4rem",
                            borderRadius: 999,
                            color: "#475569",
                            fontWeight: 700,
                            textDecoration: "none",
                            fontSize: ".95rem",
                            transition: "opacity .2s",
                        }}
                    >
                        I already have an account
                    </Link>
                </div>
            </section>

        </div>
    );
}
