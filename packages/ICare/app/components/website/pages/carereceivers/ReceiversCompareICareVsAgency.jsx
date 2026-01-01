import React, { useState } from "react";

/**
 * ICare — Launching Soon (Clients) — ANCHORED SECTION + BASIC QUESTIONS
 * ✅ button color: #b97a57
 * ✅ more space between button and note
 * ✅ hover: only slightly brighter (no lift)
 */

const COLORS = {
    TEXT: "#0F172A",
    MUTED: "rgba(15,23,42,0.72)",
    SOFT: "rgba(15,23,42,0.06)",
    BG: "#F7F7F2",
    ACCENT: "#b97a57",
    BTN: "#b97a57", // ✅ requested
};

const outerSection = {
    width: "100%",
    padding: "clamp(70px, 9vw, 110px) 0",

    borderTop: `1px solid ${COLORS.SOFT}`,
    borderBottom: `1px solid ${COLORS.SOFT}`,
};

const inner = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 clamp(18px, 4vw, 44px)",
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: COLORS.TEXT,
};

const anchor = { scrollMarginTop: 110 };

const grid = {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gap: "clamp(22px, 3.2vw, 44px)",
    alignItems: "start",
};

const topMini = {
    fontSize: "1.08rem",
    fontWeight: 800,
    color: COLORS.ACCENT,
    letterSpacing: "-0.1px",
};

const title = {
    margin: "14px 0 10px",
    fontSize: "clamp(1.6rem, 2.55vw, 2.05rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.9px",
    fontWeight: 950,
    color: COLORS.TEXT,
};

const sub = {

    margin: 0,
    fontSize: "1.06rem",
    lineHeight: 1.7,
    color: "#0F172A", // ✅ ten sam kolor
    maxWidth: "62ch",
    fontWeight: 560,
};



const bullets = {
    listStyle: "none",
    padding: 0,
    margin: "18px 0 0",
    display: "grid",
    gap: 12,
    maxWidth: "60ch",
};

const bullet = {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    padding: "11px 12px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(15,23,42,0.08)",
    color: "#0F172A",
    fontSize: "0.98rem",
    lineHeight: 1.45,
    boxShadow: "0 10px 22px rgba(15,23,42,0.05)",
};

const tick = {

    width: 22,
    height: 22,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "#0F172A",                 // ✅ czarny tick
    background: "transparent",        // ✅ bez tła

    flex: "0 0 auto",
    marginTop: 1,
    fontSize: "0.95rem",
}


const card = {
    width: "min(520px, 92vw)",
    marginLeft: "auto",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(15,23,42,0.10)",
    boxShadow: "0 14px 40px rgba(15,23,42,0.10)",
};

const formTitle = {
    margin: 0,
    fontWeight: 950,
    color: COLORS.TEXT,
    fontSize: "1.15rem",
    letterSpacing: "-0.2px",
};

const formSub = {

    margin: "6px 0 0",
    color: "#0F172A", // ✅ czarne
    lineHeight: 1.55,
    fontSize: "0.98rem",
    fontWeight: 600,
};



const pillRow = {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
};

const pill = (active) => ({
    padding: "8px 10px",
    borderRadius: 999,
    border: `1px solid ${active ? "rgba(31,171,31,0.35)" : "rgba(15,23,42,0.12)"}`,
    background: active ? "rgba(31,171,31,0.10)" : "rgba(255,255,255,0.85)",
    color: COLORS.TEXT,
    fontWeight: 900,
    fontSize: ".84rem",
    cursor: "pointer",
    userSelect: "none",
});

const hr = {
    height: 1,
    width: "100%",


    margin: "14px 0 12px",
};

const label = {
    display: "grid",
    gap: 6,
};

const labelText = {
    fontWeight: 900,
    fontSize: ".86rem",
    color: COLORS.TEXT,
};

const control = {
    width: "100%",
    padding: "11px 12px",
    borderRadius: "12px",
    border: "1px solid rgba(15,23,42,0.12)",
    background: "#fff",
    outline: "none",
    fontSize: "0.95rem",
    color: COLORS.TEXT,
};

const formGrid = {
    marginTop: "12px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
};

const wide = { gridColumn: "1 / -1" };

// ✅ centered shorter button
const btnWrap = {
    display: "flex",
    justifyContent: "center",
    marginTop: 12,
};

const btn = {
    width: "70%",
    padding: "12px 14px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.22)",
    background: COLORS.BTN, // ✅ #b97a57
    color: "#fff",
    fontWeight: 950,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 16px 30px rgba(15,23,42,0.16)",
};

// ✅ more air between button and note
const note = {
    marginTop: "18px",
    fontSize: "0.78rem",
    color: "rgba(15,23,42,0.62)",
    lineHeight: 1.35,
    fontWeight: 650,
    textAlign: "center",
};

const microCSS = `
  @media (max-width: 880px){
    .icare-launch-grid{ grid-template-columns: 1fr !important; }
    .icare-card{ margin-left: 0 !important; }
  }
  @media (max-width: 520px){
    .icare-form-grid{ grid-template-columns: 1fr !important; }
    .icare-btn{ width: 100% !important; }
  }
  .icare-input:focus, .icare-select:focus, .icare-textarea:focus{
    border-color: rgba(31,171,31,0.55) !important;
    box-shadow: 0 0 0 4px rgba(31,171,31,0.14) !important;
  }

  /* ✅ hover = only brighter (no lift) */
  .icare-btn{
    transition: filter .14s ease, box-shadow .14s ease;
  }
  .icare-btn:hover{
    filter: brightness(1.06);
    box-shadow: 0 18px 34px rgba(15,23,42,0.18);
  }
    #icare-waitlist{background:#fff9ef;}
`;

export default function ICareLaunchingSoonClients() {
    const [status, setStatus] = useState("idle"); // idle | ok

    const [careFor, setCareFor] = useState("Parent");
    const [careType, setCareType] = useState("Hourly");
    const [startWhen, setStartWhen] = useState("ASAP");
    const [hoursWeek, setHoursWeek] = useState("20–40");
    const [email, setEmail] = useState("");
    const [postcode, setPostcode] = useState("");
    const [notes, setNotes] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus("ok");
        // TODO: send: { email, postcode, careFor, careType, startWhen, hoursWeek, notes }
    };

    return (
        <>
            <style>{microCSS}</style>

            <section id="icare-waitlist" aria-label="ICare launching soon" style={outerSection}>
                <div style={inner}>
                    <div style={anchor} />

                    <div className="icare-launch-grid" style={grid}>
                        {/* LEFT COPY */}
                        <div style={{ paddingTop: 6 }}>
                            <div style={topMini}>Launching soon — early access</div>

                            <h2 style={title}>Find trusted care — without agency stress.</h2>

                            <p style={sub}>
                                ICare is preparing verified caregivers and a calm, transparent matching process.<br />
                                Join the waiting list and answer a few quick questions - we’ll prioritise better matches in your area.
                            </p>

                            <ul style={bullets}>
                                <li style={bullet}>
                                    <span style={tick}>✓</span>
                                    <span>Verified profiles + clear information.</span>
                                </li>
                                <li style={bullet}>
                                    <span style={tick}>✓</span>
                                    <span>Transparent pricing and secure messaging built-in.</span>
                                </li>
                                <li style={bullet}>
                                    <span style={tick}>✓</span>
                                    <span>Early access to matches when we launch near you.</span>
                                </li>
                            </ul>
                        </div>

                        {/* RIGHT CARD (FORM) */}
                        <div className="icare-card" style={card}>
                            <div style={{ display: "grid", gap: 6 }}>
                                <div style={formTitle}>JOIN THE WAITING LIST</div>
                                <div style={formSub}>
                                    30 seconds — your answers help us launch in the right places with the right caregivers.
                                </div>
                            </div>

                            <div style={hr} />

                            <form onSubmit={onSubmit}>
                                {/* BASIC QUESTIONS */}
                                <div style={{ marginTop: 2 }}>
                                    <div style={{ ...labelText, marginBottom: 6 }}>Who is the care for?</div>
                                    <div style={pillRow}>
                                        {["Parent", "Grandparent", "Myself", "Other"].map((v) => (
                                            <div
                                                key={v}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setCareFor(v)}
                                                onKeyDown={(e) => e.key === "Enter" && setCareFor(v)}
                                                style={pill(careFor === v)}
                                            >
                                                {v}
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ ...labelText, marginTop: 12, marginBottom: 6 }}>Care type</div>
                                    <div style={pillRow}>
                                        {["Hourly", "Live-in", "Both"].map((v) => (
                                            <div
                                                key={v}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setCareType(v)}
                                                onKeyDown={(e) => e.key === "Enter" && setCareType(v)}
                                                style={pill(careType === v)}
                                            >
                                                {v}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CONTACT + QUICK DETAILS */}
                                <div className="icare-form-grid" style={formGrid}>
                                    <label style={label}>
                                        <span style={labelText}>Email</span>
                                        <input
                                            className="icare-input"
                                            name="email"
                                            type="email"
                                            placeholder="Email address"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={control}
                                        />
                                    </label>

                                    <label style={label}>
                                        <span style={labelText}>Postcode</span>
                                        <input
                                            className="icare-input"
                                            name="postcode"
                                            placeholder="Postcode"
                                            required
                                            value={postcode}
                                            onChange={(e) => setPostcode(e.target.value)}
                                            style={control}
                                        />
                                    </label>

                                    <label style={{ ...label, ...wide }}>
                                        <span style={labelText}>When do you need care?</span>
                                        <select
                                            className="icare-select"
                                            value={startWhen}
                                            onChange={(e) => setStartWhen(e.target.value)}
                                            style={control}
                                        >
                                            <option value="ASAP">ASAP</option>
                                            <option value="In 2–4 weeks">In 2–4 weeks</option>
                                            <option value="Next month">Next month</option>
                                            <option value="Just researching">Just researching</option>
                                        </select>
                                    </label>

                                    <label style={{ ...label, ...wide }}>
                                        <span style={labelText}>Hours per week (estimate)</span>
                                        <select
                                            className="icare-select"
                                            value={hoursWeek}
                                            onChange={(e) => setHoursWeek(e.target.value)}
                                            style={control}
                                        >
                                            <option value="Less than 10">Less than 10</option>
                                            <option value="10–20">10–20</option>
                                            <option value="20–40">20–40</option>
                                            <option value="40+">40+</option>
                                            <option value="Not sure yet">Not sure yet</option>
                                        </select>
                                    </label>

                                    <label style={{ ...label, ...wide }}>
                                        <span style={labelText}>Anything important to know?</span>
                                        <textarea
                                            className="icare-textarea"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="E.g. mobility support, dementia experience, companionship, driving needed… (optional)"
                                            rows={3}
                                            style={{
                                                ...control,
                                                resize: "vertical",
                                                minHeight: 92,
                                                lineHeight: 1.45,
                                            }}
                                        />
                                    </label>
                                </div>

                                {/* centered shorter button */}
                                <div style={btnWrap}>
                                    <button className="icare-btn" type="submit" style={btn}>
                                        {status === "ok" ? "You're on the list ✓" : "Join the early access list"}
                                    </button>
                                </div>

                                <div style={note}>
                                    We’ll send one launch email and occasional updates. Unsubscribe anytime. (GDPR-friendly)
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
