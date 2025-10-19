import React from "react";
import { Link } from "react-router";
import privacySrc from "/images/heros/privacy.jpg";

const BRAND = "#1FAB1F";

export default function Privacy() {
    const pageFont = { fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" };

    // ——— HERO styles ———
    const heroWrap = {
        position: "relative",
        minHeight: "clamp(640px, 78vh, 920px)",
        width: "100%",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        background: "#0f172a",
    };
    const heroImg = {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        filter: "brightness(.75) contrast(1.05)",
        zIndex: 0,
    };
    const heroOverlay = {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,.38), rgba(0,0,0,.55))",
        zIndex: 1,
    };
    const headerOverlay = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem clamp(1rem, 4vw, 2rem)",
        background: "rgba(2,8,23,0.28)",
        backdropFilter: "saturate(1.05) blur(4px)",
        borderBottom: "1px solid rgba(255,255,255,0.14)",
    };
    const navLinkStyle = {
        color: "rgba(255,255,255,.9)",
        textDecoration: "none",
        fontSize: "clamp(.85rem, 1.2vw, .95rem)",
        fontWeight: 600,
        letterSpacing: ".01em",
        padding: ".2rem 0",
        textUnderlineOffset: "6px",
        transition: "color .22s ease, text-decoration-color .22s ease, text-underline-offset .22s ease",
    };

    return (
        <div style={pageFont}>
            {/* ===== HERO ===== */}
            <section style={heroWrap} aria-label="Privacy hero">
                <img src={privacySrc} alt="Privacy & data protection background" style={heroImg} />
                <div style={heroOverlay} />

                {/* Header */}
                <header style={headerOverlay}>
                    <Link
                        to="/"
                        style={{
                            fontWeight: 900,
                            letterSpacing: "0.3px",
                            color: "#ffffff",
                            textDecoration: "none",
                            fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                            textShadow: "0 1px 10px rgba(0,0,0,.4)",
                        }}
                    >
                        ICare
                    </Link>

                    <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1.1rem", alignItems: "center" }}>
                        {[
                            { to: "/", label: "Home" },
                            { to: "/how-it-works", label: "How it Works" },
                            { to: "/who-we-are", label: "Who We Are" },
                            { to: "/privacy", label: "Privacy" },
                            { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
                            { to: "/icare-for-carereceivers", label: "ICare For Care Receivers" },
                        ].map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                style={navLinkStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.textDecoration = "underline";
                                    e.currentTarget.style.textDecorationThickness = "2px";
                                    e.currentTarget.style.textUnderlineOffset = "7px";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "rgba(255,255,255,.9)";
                                    e.currentTarget.style.textDecoration = "none";
                                    e.currentTarget.style.textUnderlineOffset = "6px";
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                {/* Copy */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        padding: "0 clamp(16px, 4vw, 32px)",
                        textAlign: "left",
                    }}
                >
                    {/* eyebrow */}
                    <span
                        style={{
                            display: "inline-block",
                            marginBottom: "3.2rem",
                            marginTop: "-3.2rem",
                            fontSize: "1.12rem",
                            fontWeight: 800,
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            color: "#EAF7EA",
                            padding: ".56rem 1.12rem",
                            borderRadius: 999,
                            background: "rgba(31,171,31,0.20)",
                            border: "2px solid rgba(31,171,31,0.45)",
                            textShadow: "0 1px 2px rgba(0,0,0,.25)",
                        }}
                    >
                        Privacy & data protection
                    </span>

                    <h1
                        style={{
                            margin: "0 0 1rem",
                            fontWeight: 900,
                            letterSpacing: ".2px",
                            lineHeight: 1.05,
                            fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)",
                            color: "#fff",
                            textShadow: "0 4px 18px rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.35)",
                        }}
                    >
                        Privacy
                    </h1>

                    <p
                        style={{
                            margin: ".35rem 0 0",
                            lineHeight: 1.6,
                            fontSize: "clamp(1.1rem, 1.2vw, 1.125rem)",
                            color: "rgba(255,255,255,.96)",
                            textShadow: "0 2px 8px rgba(0,0,0,.35)",
                            maxWidth: "62ch",
                        }}
                    >
                        We design ICare with privacy-first principles. Below you’ll find what we collect, why, for how long, and how
                        to exercise your rights (GDPR/RODO). No data sales. Clear controls.
                    </p>

                    {/* CTAs */}
                    <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
                        <a
                            href="#contact-dpo"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                textDecoration: "none",
                                fontWeight: 900,
                                letterSpacing: ".02em",
                                fontSize: ".98rem",
                                padding: ".85rem 1.15rem",
                                borderRadius: 999,
                                color: "#FFFFFF",
                                border: "2px solid rgba(255,255,255,.6)",
                                background: "transparent",
                                boxShadow: "0 8px 24px rgba(0,0,0,.28)",
                            }}
                        >
                            Contact DPO
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14" />
                                <path d="M13 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a
                            href="/privacy.pdf"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                textDecoration: "none",
                                fontWeight: 900,
                                letterSpacing: ".02em",
                                fontSize: ".98rem",
                                padding: ".85rem 1.15rem",
                                borderRadius: 999,
                                color: BRAND,
                                background: "#FFFFFF",
                                border: "1px solid rgba(255,255,255,.6)",
                                boxShadow: "0 8px 24px rgba(0,0,0,.20)",
                            }}
                        >
                            Download policy (PDF)
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== TOC ===== */}
            <section style={{ margin: "2.75rem auto 1rem", maxWidth: 1100, padding: "0 clamp(16px,4vw,32px)" }}>
                <nav style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px" }}>
                    {[
                        { href: "#data-we-collect", label: "1. Data we collect" },
                        { href: "#how-we-use", label: "2. How we use data" },
                        { href: "#legal-basis", label: "3. Legal basis (GDPR)" },
                        { href: "#sharing", label: "4. Sharing" },
                        { href: "#retention", label: "5. Storage & retention" },
                        { href: "#rights", label: "6. Your rights" },
                        { href: "#cookies", label: "7. Cookies" },
                        { href: "#security", label: "8. Security" },
                        { href: "#transfers", label: "9. International transfers" },
                        { href: "#contact-dpo", label: "10. Contact" },
                    ].map((i) => (
                        <a
                            key={i.href}
                            href={i.href}
                            style={{
                                color: "#0F172A",
                                textDecoration: "none",
                                fontWeight: 800,
                                border: "1px solid rgba(15,23,42,.12)",
                                background: "#FFFFFF",
                                padding: ".6rem .85rem",
                                borderRadius: 999,
                                transition: "transform .15s ease, border-color .15s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.borderColor = BRAND;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "rgba(15,23,42,.12)";
                            }}
                        >
                            {i.label}
                        </a>
                    ))}
                </nav>
            </section>

            {/* ===== CORE CARDS ===== */}
            <section
                style={{
                    margin: "0 auto 3.5rem",
                    maxWidth: 1100,
                    padding: "0 clamp(16px,4vw,32px)",
                    display: "grid",
                    gap: "16px",
                }}
            >
                {[
                    {
                        id: "data-we-collect",
                        title: "1. Data we collect",
                        items: [
                            "Personal: name, email, phone, city/region.",
                            "Account: login metadata, settings.",
                            "Care-related: needs/preferences, availability/schedule (minimized, purpose-bound).",
                            "Technical: cookies, IP, device/browser.",
                            "Payments: via provider — no card stored on our servers (if applicable).",
                        ],
                    },
                    {
                        id: "how-we-use",
                        title: "2. How we use data",
                        items: [
                            "Provide and improve ICare features (matching, messaging, agreements).",
                            "Security, fraud prevention, abuse detection.",
                            "Customer support and essential communications.",
                            "Analytics for usability (aggregated; no data sales).",
                        ],
                    },
                    {
                        id: "legal-basis",
                        title: "3. Legal basis (GDPR/RODO)",
                        items: [
                            "Consent (registration, optional features).",
                            "Contract (to deliver requested services).",
                            "Legitimate interest (security, product integrity).",
                            "Legal obligation (tax, accounting).",
                        ],
                    },
                    {
                        id: "sharing",
                        title: "4. Sharing",
                        items: [
                            "With families/caregivers only as needed to match and contract.",
                            "With vetted processors (hosting, payments, communications).",
                            "No sale of personal data.",
                        ],
                    },
                ].map((box) => (
                    <article
                        key={box.id}
                        id={box.id}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid rgba(15,23,42,.10)",
                            borderRadius: 16,
                            padding: "18px 18px",
                            boxShadow: "0 8px 22px rgba(2,8,23,.06)",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                color: "#1f2a37",
                                fontWeight: 900,
                                letterSpacing: ".2px",
                                fontSize: "clamp(1.15rem,2.2vw,1.5rem)",
                            }}
                        >
                            {box.title}
                        </h2>
                        <div style={{ width: 180, height: 3, background: BRAND, borderRadius: 999, margin: ".6rem 0 1rem" }} />
                        <ul style={{ margin: 0, paddingLeft: 18, color: "#334155", lineHeight: 1.7 }}>
                            {box.items.map((li) => (
                                <li key={li} style={{ margin: ".25rem 0" }}>
                                    {li}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>

            {/* ===== RETENTION TABLE ===== */}
            <section
                id="retention"
                style={{ margin: "0 auto 3.5rem", maxWidth: 1100, padding: "0 clamp(16px,4vw,32px)" }}
            >
                <h2 style={{ margin: 0, color: "#1f2a37", fontWeight: 900, fontSize: "clamp(1.1rem,2vw,1.35rem)" }}>
                    5. Storage & retention
                </h2>
                <div style={{ width: 180, height: 3, background: BRAND, borderRadius: 999, margin: ".6rem 0 1rem" }} />
                <div
                    style={{
                        overflowX: "auto",
                        border: "1px solid rgba(15,23,42,.10)",
                        borderRadius: 12,
                        background: "#fff",
                        boxShadow: "0 8px 22px rgba(2,8,23,.06)",
                    }}
                >
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
                        <thead>
                            <tr style={{ background: "rgba(31,171,31,0.06)" }}>
                                <th style={thCell()}>Category</th>
                                <th style={thCell()}>Purpose</th>
                                <th style={thCell()}>Retention</th>
                                <th style={thCell()}>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["Account", "Provide services", "While active account", "Deleted within 30 days after closure"],
                                ["Care-related", "Matching/agreements", "While necessary / contract term", "Minimization applied"],
                                ["Invoices", "Legal obligations", "5–10 years", "Accounting/tax law"],
                                ["Support tickets", "Customer support", "24 months", "For quality & disputes"],
                            ].map((row, i) => (
                                <tr key={i} style={{ borderTop: "1px solid #e5e7eb" }}>
                                    {row.map((cell, j) => (
                                        <td key={j} style={tdCell()}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ===== ACCORDION (rights, cookies, security, transfers) ===== */}
            <section
                style={{
                    margin: "0 auto 3.5rem",
                    maxWidth: 1100,
                    padding: "0 clamp(16px,4vw,32px)",
                    display: "grid",
                    gap: "14px",
                }}
            >
                {[
                    {
                        id: "rights",
                        q: "6. Your rights (GDPR/RODO)",
                        a: (
                            <>
                                Access, rectification, deletion (‘right to be forgotten’), restriction/objection, portability.
                                Use the DSAR form below or contact our DPO.
                            </>
                        ),
                    },
                    {
                        id: "cookies",
                        q: "7. Cookies & tracking",
                        a: (
                            <>
                                We use essential cookies for session, and optional analytics (opt-in). Manage preferences below in Cookie
                                Settings.
                            </>
                        ),
                    },
                    {
                        id: "security",
                        q: "8. Security measures",
                        a: (
                            <>
                                Encryption in transit/at rest (provider-level), role-based access, least-privilege, regular reviews and
                                incident response playbook.
                            </>
                        ),
                    },
                    {
                        id: "transfers",
                        q: "9. International transfers",
                        a: (
                            <>
                                If data leaves the EU/UK, we use appropriate safeguards (e.g., SCCs) with our processors.
                            </>
                        ),
                    },
                ].map((f) => (
                    <details
                        key={f.id}
                        id={f.id}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid rgba(15,23,42,0.10)",
                            borderRadius: 14,
                            padding: "12px 14px",
                        }}
                    >
                        <summary
                            style={{
                                listStyle: "none",
                                cursor: "pointer",
                                fontWeight: 900,
                                color: "#0F172A",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 12,
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.color = BRAND)}
                            onMouseOut={(e) => (e.currentTarget.style.color = "#0F172A")}
                        >
                            {f.q}
                            <span aria-hidden="true" style={{ color: BRAND, fontWeight: 900 }}>+</span>
                        </summary>
                        <div style={{ marginTop: 8, color: "#334155", lineHeight: 1.65 }}>{f.a}</div>
                    </details>
                ))}
            </section>

            {/* ===== COOKIE SETTINGS (local-only state) ===== */}
            <CookieSettingsPanel />

            {/* ===== DSAR FORM (mailto) ===== */}
            <DSARFormMailto />

            {/* ===== CONTACT / DPO ===== */}
            <section
                id="contact-dpo"
                aria-label="Contact DPO"
                style={{
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    width: "100vw",
                    background: BRAND,
                    color: "#FFFFFF",
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        padding: "28px clamp(16px,4vw,32px)",
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: 12,
                    }}
                >
                    <h3 style={{ margin: 0, fontWeight: 900, fontSize: "clamp(1.1rem,2vw,1.4rem)" }}>
                        Data Protection Contact
                    </h3>
                    <p style={{ margin: 0, color: "rgba(255,255,255,.94)" }}>
                        Email:{" "}
                        <a href="mailto:privacy@icare.example" style={{ color: "#fff", fontWeight: 800, textDecoration: "underline" }}>
                            privacy@icare.example
                        </a>
                        <br />
                        Company: ICare Ltd., Example Street 12, 00-000 City
                        <br />
                        Last updated: {new Date().toISOString().slice(0, 10)}
                    </p>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer
                style={{
                    borderTop: "1px solid #e2e8f0",
                    padding: "2.5rem 2rem",
                    fontSize: ".8rem",
                    color: "#64748b",
                    background: "#fff",
                    marginTop: "0",
                }}
            >
                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        gap: ".75rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <li>
                        <Link to="/" style={{ textDecoration: "none", color: "#0F172A", fontWeight: 800 }}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/how-it-works" style={{ textDecoration: "none", color: "#0F172A", fontWeight: 800 }}>
                            How it Works
                        </Link>
                    </li>
                    <li>
                        <Link to="/privacy" style={{ textDecoration: "none", color: "#0F172A", fontWeight: 800 }}>
                            Privacy
                        </Link>
                    </li>
                </ul>
                <div style={{ marginTop: ".75rem", textAlign: "center" }}>
                    © {new Date().getFullYear()} ICare. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

/* ===== helper cell styles ===== */
function thCell() {
    return { textAlign: "left", padding: "12px 14px", fontWeight: 900, color: "#0F172A", fontSize: ".95rem" };
}
function tdCell() {
    return { textAlign: "left", padding: "12px 14px", color: "#334155", fontSize: ".95rem", verticalAlign: "top" };
}

/* ===== Cookie Settings (local state only) ===== */
function CookieSettingsPanel() {
    const [analytics, setAnalytics] = React.useState(false);
    const [marketing, setMarketing] = React.useState(false);

    return (
        <section
            id="cookies"
            style={{
                margin: "0 auto 3.5rem",
                maxWidth: 1100,
                padding: "0 clamp(16px,4vw,32px)",
            }}
        >
            <article
                style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(15,23,42,.10)",
                    borderRadius: 16,
                    padding: "18px 18px",
                    boxShadow: "0 8px 22px rgba(2,8,23,.06)",
                }}
            >
                <h2 style={{ margin: 0, color: "#1f2a37", fontWeight: 900, fontSize: "clamp(1.05rem,2vw,1.25rem)" }}>
                    Cookie Settings
                </h2>
                <div style={{ width: 140, height: 3, background: BRAND, borderRadius: 999, margin: ".6rem 0 1rem" }} />
                <div style={{ display: "grid", gap: 12 }}>
                    <label style={cookieRow()}>
                        <input type="checkbox" disabled defaultChecked />
                        <span>Essential cookies (required for login/session)</span>
                    </label>
                    <label style={cookieRow()}>
                        <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                        <span>Analytics (usage insights)</span>
                    </label>
                    <label style={cookieRow()}>
                        <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                        <span>Marketing (personalised content)</span>
                    </label>
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <button style={btnPrimary()}>Save preferences</button>
                    <button style={btnGhost()}>Decline non-essential</button>
                </div>
            </article>
        </section>
    );
}
function cookieRow() {
    return { display: "flex", alignItems: "center", gap: 10, color: "#334155", fontWeight: 600 };
}
function btnPrimary() {
    return {
        border: "none",
        background: BRAND,
        color: "#fff",
        padding: ".75rem 1rem",
        borderRadius: 999,
        fontWeight: 800,
        letterSpacing: ".3px",
        cursor: "pointer",
    };
}
function btnGhost() {
    return {
        border: "1.5px solid rgba(31,171,31,.45)",
        background: "#fff",
        color: "#0F172A",
        padding: ".7rem 1rem",
        borderRadius: 999,
        fontWeight: 800,
        letterSpacing: ".3px",
        cursor: "pointer",
    };
}

/* ===== DSAR form (mailto) ===== */
function DSARFormMailto() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [type, setType] = React.useState("access");
    const [details, setDetails] = React.useState("");

    const href = React.useMemo(() => {
        const subject = encodeURIComponent(`DSAR request: ${type}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nRequest type: ${type}\n\nDetails:\n${details}\n\nI confirm I am the data subject.`
        );
        return `mailto:privacy@icare.example?subject=${subject}&body=${body}`;
    }, [name, email, type, details]);

    return (
        <section
            style={{
                margin: "0 auto 3.5rem",
                maxWidth: 1100,
                padding: "0 clamp(16px,4vw,32px)",
            }}
        >
            <article
                style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(15,23,42,.10)",
                    borderRadius: 16,
                    padding: "18px 18px",
                    boxShadow: "0 8px 22px rgba(2,8,23,.06)",
                    display: "grid",
                    gap: 12,
                }}
            >
                <h2 style={{ margin: 0, color: "#1f2a37", fontWeight: 900, fontSize: "clamp(1.05rem,2vw,1.25rem)" }}>
                    DSAR — Data Subject Access Request
                </h2>
                <div style={{ width: 240, height: 3, background: BRAND, borderRadius: 999, margin: ".6rem 0 1rem" }} />
                <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>Name</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputBase()}
                            placeholder="Your full name"
                        />
                    </label>
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>Email</span>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputBase()}
                            placeholder="you@example.com"
                        />
                    </label>
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>Request type</span>
                        <select value={type} onChange={(e) => setType(e.target.value)} style={inputBase()}>
                            <option value="access">Access</option>
                            <option value="rectification">Rectification</option>
                            <option value="erasure">Deletion (Right to be forgotten)</option>
                            <option value="restriction">Restriction</option>
                            <option value="objection">Objection</option>
                            <option value="portability">Portability</option>
                        </select>
                    </label>
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>Details</span>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            style={{ ...inputBase(), minHeight: 120, resize: "vertical" }}
                            placeholder="Describe your request…"
                        />
                    </label>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <a href={href} style={btnPrimary()}>Send DSAR</a>
                    <a href="#contact-dpo" style={btnGhost()}>Contact DPO</a>
                </div>
            </article>
        </section>
    );
}
function inputBase() {
    return {
        border: "1px solid rgba(15,23,42,0.18)",
        borderRadius: 12,
        padding: "12px 14px",
        fontSize: "1rem",
        outline: "none",
        background: "#fff",
    };
}
