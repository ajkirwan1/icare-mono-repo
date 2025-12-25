import React, { useState } from "react";

/**
 * ICare — Launching Soon (Clients)
 * ✅ compact, premium, fast
 * ✅ centered, not full width
 * ✅ email + postcode
 * ✅ trust bullets + privacy note
 */

const wrap = {
    width: "min(560px, 92vw)",
    margin: "3.2rem auto",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(15,23,42,0.10)",
    boxShadow: "0 14px 40px rgba(15,23,42,0.10)",
};

const badge = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: "0.78rem",
    fontWeight: 900,
    letterSpacing: "0.2px",
    color: "#0F172A",
    background: "rgba(31,171,31,0.10)",
    border: "1px solid rgba(31,171,31,0.22)",
};

const title = {
    margin: "10px 0 6px",
    fontSize: "1.8rem",
    lineHeight: 1.1,
    letterSpacing: "-0.7px",
    fontWeight: 950,
    color: "#0F172A",
};

const sub = {
    margin: 0,
    fontSize: "1.02rem",
    lineHeight: 1.6,
    color: "#475569",
    maxWidth: "60ch",
};

const formGrid = {
    marginTop: "14px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
};

const input = {
    width: "100%",
    padding: "11px 12px",
    borderRadius: "12px",
    border: "1px solid rgba(15,23,42,0.12)",
    background: "#fff",
    outline: "none",
    fontSize: "0.95rem",
};

const btn = {
    marginTop: "10px",
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "none",
    background: "#1FAB1F",
    color: "#fff",
    fontWeight: 900,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 12px 22px rgba(31,171,31,0.20)",
};

const hr = {
    height: 1,
    width: "100%",
    background:
        "linear-gradient(90deg, rgba(15,23,42,0.05), rgba(15,23,42,0.12), rgba(15,23,42,0.05))",
    margin: "14px 0 12px",
};

const bullets = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gap: "10px",
};

const bullet = {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    padding: "10px 12px",
    borderRadius: 14,
    background: "rgba(15,23,42,0.02)",
    border: "1px solid rgba(15,23,42,0.06)",
    color: "#334155",
    fontSize: "0.95rem",
    lineHeight: 1.45,
};

const note = {
    marginTop: "10px",
    fontSize: "0.78rem",
    color: "#64748B",
    lineHeight: 1.35,
};

const microCSS = `
  @media (max-width: 520px){
    .icare-launch-form{ grid-template-columns: 1fr !important; }
  }
  .icare-input:focus{
    border-color: rgba(31,171,31,0.55) !important;
    box-shadow: 0 0 0 4px rgba(31,171,31,0.14) !important;
  }
  .icare-btn{
    transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
  }
  .icare-btn:hover{
    transform: translateY(-1px);
    box-shadow: 0 16px 28px rgba(31,171,31,0.22);
    background: #159815;
  }
  .icare-btn:active{ transform: translateY(0px); }
`;

export default function ICareLaunchingSoonClients() {
    const [status, setStatus] = useState("idle"); // idle | ok

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus("ok");
        // TODO: replace with your API call / email provider
    };

    return (
        <>
            <style>{microCSS}</style>

            <section aria-label="ICare launching soon" style={wrap}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                    <span style={badge}>✨ Launching soon</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 900, color: "#0F172A", opacity: 0.65 }}>
                        For families & clients
                    </span>
                </div>

                <h2 style={title}>Find trusted care — without agency stress.</h2>
                <p style={sub}>
                    ICare is preparing verified caregivers and a calm, transparent matching process.
                    Join the early access list and we’ll notify you when we open in your area.
                </p>

                <div style={hr} />

                <ul style={bullets}>
                    <li style={bullet}>
                        <span style={{ color: "#1FAB1F", fontWeight: 950, marginTop: 1 }}>✓</span>
                        <span>Verified profiles + clear information (no guesswork).</span>
                    </li>
                    <li style={bullet}>
                        <span style={{ color: "#1FAB1F", fontWeight: 950, marginTop: 1 }}>✓</span>
                        <span>Transparent pricing and secure messaging built-in.</span>
                    </li>
                    <li style={bullet}>
                        <span style={{ color: "#1FAB1F", fontWeight: 950, marginTop: 1 }}>✓</span>
                        <span>Early access to matches when we launch near you.</span>
                    </li>
                </ul>

                <form onSubmit={onSubmit} style={{ marginTop: 14 }}>
                    <div className="icare-launch-form" style={formGrid}>
                        <input
                            className="icare-input"
                            name="email"
                            type="email"
                            placeholder="Email address"
                            required
                            style={input}
                        />
                        <input
                            className="icare-input"
                            name="postcode"
                            placeholder="Postcode"
                            required
                            style={input}
                        />
                    </div>

                    <button className="icare-btn" type="submit" style={btn}>
                        {status === "ok" ? "You're on the list ✓" : "Join the early access list"}
                    </button>

                    <div style={note}>
                        We’ll send one launch email and occasional updates. Unsubscribe anytime. (GDPR-friendly)
                    </div>
                </form>
            </section>
        </>
    );
}

