import React from "react";

const BRAND = "#1FAB1F";

export default function DSARFormMailto() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [type, setType] = React.useState("access");
    const [details, setDetails] = React.useState("");

    // Builds mailto link dynamically
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
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
                <h2
                    style={{
                        margin: 0,
                        color: "#1f2a37",
                        fontWeight: 900,
                        fontSize: "clamp(1.05rem,2vw,1.25rem)",
                    }}
                >
                    DSAR — Data Subject Access Request
                </h2>

                <div
                    style={{
                        width: 240,
                        height: 3,
                        background: BRAND,
                        borderRadius: 999,
                        margin: ".6rem 0 1rem",
                    }}
                />

                {/* === FORM FIELDS === */}
                <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={labelStyle}>Name</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputBase}
                            placeholder="Your full name"
                        />
                    </label>

                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={labelStyle}>Email</span>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputBase}
                            placeholder="you@example.com"
                        />
                    </label>

                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={labelStyle}>Request type</span>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            style={inputBase}
                        >
                            <option value="access">Access</option>
                            <option value="rectification">Rectification</option>
                            <option value="erasure">Deletion (Right to be forgotten)</option>
                            <option value="restriction">Restriction</option>
                            <option value="objection">Objection</option>
                            <option value="portability">Portability</option>
                        </select>
                    </label>

                    <label style={{ display: "grid", gap: 6 }}>
                        <span style={labelStyle}>Details</span>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            style={{ ...inputBase, minHeight: 120, resize: "vertical" }}
                            placeholder="Describe your request…"
                        />
                    </label>
                </div>

                {/* === BUTTONS === */}
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <a href={href} style={btnPrimary}>
                        Send DSAR
                    </a>
                    <a href="#contact-dpo" style={btnGhost}>
                        Contact DPO
                    </a>
                </div>
            </article>
        </section>
    );
}

/* ===== Styles ===== */

const labelStyle = {
    fontWeight: 800,
    color: "#1f2a37",
    fontSize: ".95rem",
};

const inputBase = {
    border: "1px solid rgba(15,23,42,0.18)",
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: "1rem",
    outline: "none",
    background: "#fff",
};

const btnPrimary = {
    border: "none",
    background: BRAND,
    color: "#fff",
    padding: ".75rem 1rem",
    borderRadius: 999,
    fontWeight: 800,
    letterSpacing: ".3px",
    cursor: "pointer",
    textDecoration: "none",
};

const btnGhost = {
    border: "1.5px solid rgba(31,171,31,.45)",
    background: "#fff",
    color: "#0F172A",
    padding: ".7rem 1rem",
    borderRadius: 999,
    fontWeight: 800,
    letterSpacing: ".3px",
    cursor: "pointer",
    textDecoration: "none",
};
