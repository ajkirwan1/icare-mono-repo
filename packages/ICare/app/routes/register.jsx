import React, { useState } from "react";
import { Link } from "react-router"; // lub "react-router-dom" — użyj tak jak w Twojej appce

export default function Register() {
    const BRAND = {
        green: "#1FAB1F",
        dark: "#1f2a37",
        text: "#334155",
        border: "rgba(15,23,42,.12)",
        fieldBg: "#FFFFFF",
        softBg: "linear-gradient(180deg, #F9FBFC 0%, #FFFFFF 100%)",
    };

    const [tab, setTab] = useState("caregiver"); // 'caregiver' | 'receiver'
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
        consent: false,
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const commonWrap = {
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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

    const grid2 = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 14,
    };

    const label = { fontWeight: 700, fontSize: 14, color: BRAND.dark, display: "block", marginBottom: 6 };
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

    const ctaRow = { display: "flex", gap: 12, alignItems: "center", marginTop: 12, flexWrap: "wrap" };
    const btn = {
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
    const ghost = {
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
    };

    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const toggleMulti = (k, val) => {
        setForm((f) => {
            const has = f[k].includes(val);
            return { ...f, [k]: has ? f[k].filter((x) => x !== val) : [...f[k], val] };
        });
    };

    const validate = () => {
        const e = {};
        // common
        if (!form.firstName.trim()) e.firstName = "First name is required.";
        if (!form.lastName.trim()) e.lastName = "Last name is required.";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email is required.";
        if (!/^[\d\s()+-]{6,}$/.test(form.phone)) e.phone = "Valid phone is required.";
        if (form.password.length < 8) e.password = "Min. 8 characters.";
        if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords must match.";
        if (!form.location.trim()) e.location = "Location is required.";

        if (tab === "caregiver") {
            if (!form.experienceYears) e.experienceYears = "Select experience.";
            if (!form.availability) e.availability = "Choose availability.";
            if (form.skills.length === 0) e.skills = "Pick at least one skill.";
        }
        if (tab === "receiver") {
            if (!form.careType) e.careType = "Select care type.";
            if (!form.hoursPerWeek) e.hoursPerWeek = "Choose weekly hours.";
            if (form.languages.length === 0) e.languages = "Pick at least one language.";
            if (!form.consent) e.consent = "Consent is required.";
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();
        setErrors({});
        if (!validate()) return;

        try {
            setSubmitting(true);
            // TODO: wyślij do backendu
            // await api.post("/register", { ...form, role: tab });
            alert(`Submitted ${tab} registration! (Replace alert with API call)`);
        } finally {
            setSubmitting(false);
        }
    };

    const CaregiverFields = () => (
        <>
            <div>
                <label style={label} htmlFor="experienceYears">Experience (years) *</label>
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
                {errors.experienceYears && <div style={errorText}>{errors.experienceYears}</div>}
            </div>

            <div>
                <label style={label} htmlFor="availability">Availability *</label>
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
                {errors.availability && <div style={errorText}>{errors.availability}</div>}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
                <span style={label}>Skills *</span>
                <div style={pillGroup} role="group" aria-label="Skills">
                    {["Dementia", "Mobility", "Medication", "Post-surgery", "Driving"].map((s) => {
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
                    })}
                </div>
                {errors.skills && <div style={errorText}>{errors.skills}</div>}
                <div style={helper}>Select all that apply.</div>
            </div>
        </>
    );

    const ReceiverFields = () => (
        <>
            <div>
                <label style={label} htmlFor="careType">Care type *</label>
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
                <label style={label} htmlFor="hoursPerWeek">Hours per week *</label>
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
                {errors.hoursPerWeek && <div style={errorText}>{errors.hoursPerWeek}</div>}
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

            <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
                <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                />
                <span style={{ color: BRAND.text }}>
                    I agree that ICare may contact me about my request.
                </span>
            </label>
            {errors.consent && <div style={errorText}>{errors.consent}</div>}
        </>
    );

    return (
        <div style={pageStyle}>
            {/* HERO */}
            <section style={hero} aria-label="Registration">
                <div style={{ width: "min(1000px, 92vw)", margin: "0 auto", textAlign: "center", padding: "34px 0" }}>
                    <h1 style={h1}>
                        Create Your Account
                    </h1>
                    <p style={subtitle}>
                        Choose your role to get started — you can complete your profile later.
                    </p>

                    <div style={{ width: "min(560px, 92vw)", margin: "16px auto 0" }}>
                        <div style={tabs} role="tablist" aria-label="Role selection">
                            <button
                                role="tab"
                                aria-selected={tab === "caregiver"}
                                style={tabBtn(tab === "caregiver")}
                                onClick={() => { setTab("caregiver"); update("role", "caregiver"); }}
                            >
                                Caregiver
                            </button>
                            <button
                                role="tab"
                                aria-selected={tab === "receiver"}
                                style={tabBtn(tab === "receiver")}
                                onClick={() => { setTab("receiver"); update("role", "receiver"); }}
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
                    {/* Common fields */}
                    <div style={grid2}>
                        <div>
                            <label style={label} htmlFor="firstName">First name *</label>
                            <input
                                id="firstName"
                                type="text"
                                style={field}
                                value={form.firstName}
                                onChange={(e) => update("firstName", e.target.value)}
                                autoComplete="given-name"
                                required
                            />
                            {errors.firstName && <div style={errorText}>{errors.firstName}</div>}
                        </div>

                        <div>
                            <label style={label} htmlFor="lastName">Last name *</label>
                            <input
                                id="lastName"
                                type="text"
                                style={field}
                                value={form.lastName}
                                onChange={(e) => update("lastName", e.target.value)}
                                autoComplete="family-name"
                                required
                            />
                            {errors.lastName && <div style={errorText}>{errors.lastName}</div>}
                        </div>

                        <div>
                            <label style={label} htmlFor="email">Email *</label>
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
                            <label style={label} htmlFor="phone">Phone *</label>
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
                            <label style={label} htmlFor="password">Password *</label>
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
                            <div id="pwd-hint" style={helper}>At least 8 characters.</div>
                            {errors.password && <div style={errorText}>{errors.password}</div>}
                        </div>

                        <div>
                            <label style={label} htmlFor="confirmPassword">Confirm password *</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                style={field}
                                value={form.confirmPassword}
                                onChange={(e) => update("confirmPassword", e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                            {errors.confirmPassword && <div style={errorText}>{errors.confirmPassword}</div>}
                        </div>

                        <div style={{ gridColumn: "1 / -1" }}>
                            <label style={label} htmlFor="location">Location (city/area) *</label>
                            <input
                                id="location"
                                type="text"
                                style={field}
                                value={form.location}
                                onChange={(e) => update("location", e.target.value)}
                                placeholder="e.g., Warsaw, Mokotów"
                                required
                            />
                            {errors.location && <div style={errorText}>{errors.location}</div>}
                        </div>
                    </div>

                    {/* Role-specific */}
                    <div style={{ marginTop: 16 }}>
                        {tab === "caregiver" ? <CaregiverFields /> : <ReceiverFields />}
                    </div>

                    {/* Actions */}
                    <div style={ctaRow}>
                        <button type="submit" style={btn} disabled={submitting}>
                            {submitting ? "Creating account…" : "Create account"}
                        </button>
                        <Link to="/login" style={ghost}>
                            I already have an account
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    );
}
