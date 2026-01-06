import React, { useState } from "react";

/**
 * ICare — Waitlist Final (conversion section)
 * ✅ id="waitlist" for anchors
 * ✅ calm + airy, not full width
 * ✅ a few basic questions (without being heavy)
 * ✅ button #b97a57, radius 20, shorter, centered
 */
export default function ICareWaitlistFinal() {
    const TEXT = "#0F172A";
    const BRAND = "#b97a57";

    const [status, setStatus] = useState("idle"); // idle | ok

    const wrap = {
        width: "100%",
        background: "#ffffff",
        color: TEXT,
        padding: "clamp(3.6rem, 5.2vw, 4.8rem) 0",
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
        display: "grid",
        justifyItems: "center",
    };

    const card = {
        width: "min(680px, 92vw)",
        borderRadius: 24,
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(15,23,42,0.10)",
        boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
        padding: "clamp(18px, 2.4vw, 26px)",
    };

    const topMini = {
        fontSize: "1.08rem",
        fontWeight: 850,
        color: BRAND,
        letterSpacing: "-0.1px",
        marginBottom: 10,
    };

    const h2 = {
        margin: 0,
        fontWeight: 950,
        letterSpacing: "-0.55px",
        lineHeight: 1.1,
        fontSize: "clamp(1.6rem, 2.2vw, 2rem)",
        color: TEXT,
    };

    const lead = {
        margin: "0.95rem 0 0",
        color: TEXT,
        opacity: 0.78,
        fontWeight: 650,
        lineHeight: 1.75,
        fontSize: "1.04rem",
        maxWidth: "72ch",
    };

    const form = {
        marginTop: "clamp(16px, 2.4vw, 22px)",
        display: "grid",
        gap: 12,
    };

    const grid2 = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
    };

    const label = {
        fontWeight: 900,
        color: TEXT,
        fontSize: ".88rem",
        letterSpacing: "-0.1px",
        marginBottom: 6,
        display: "block",
    };

    const field = {
        width: "100%",
        border: "1px solid rgba(15,23,42,0.12)",
        borderRadius: 14,
        padding: "11px 12px",
        background: "#fff",
        fontSize: "0.98rem",
        color: TEXT,
        outline: "none",
    };

    const btnWrap = {
        marginTop: 18, // ✅ more air before note
        display: "grid",
        justifyItems: "center",
        gap: 14,
    };

    const btn = {
        width: "min(320px, 86vw)", // ✅ shorter + centered
        padding: "12px 18px",
        borderRadius: 20, // ✅ radius 20
        border: "none",
        background: BRAND,
        color: "#fff",
        fontWeight: 900,
        fontSize: "1rem",
        cursor: "pointer",
        transition: "filter .14s ease",
    };

    const note = {
        margin: 0,
        fontSize: ".88rem",
        color: TEXT,
        opacity: 0.65,
        lineHeight: 1.55,
        fontWeight: 650,
        textAlign: "center",
        maxWidth: "66ch",
    };

    const microCSS = `
    @media (max-width: 620px){
      .icare-wl-grid2{ grid-template-columns: 1fr !important; }
    }
    .icare-wl-input:focus{
      border-color: rgba(185,122,87,0.55) !important;
      box-shadow: 0 0 0 4px rgba(185,122,87,0.14) !important;
    }
  `;

    const onEnter = (e) => (e.currentTarget.style.filter = "brightness(1.06)");
    const onLeave = (e) => (e.currentTarget.style.filter = "brightness(1)");

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus("ok");
        // TODO: replace with API call (Mailchimp / ConvertKit / your backend)
    };

    return (
        <section id="waitlist" aria-label="Join the ICare waiting list" style={wrap}>
            <style>{microCSS}</style>

            <div style={container}>
                <div style={card}>
                    <div style={topMini}>Launching soon — early access</div>
                    <h2 style={h2}>Get early access in your area</h2>
                    <p style={lead}>
                        Leave a few details and we’ll notify you when ICare opens near you. Your answers help us prioritise
                        caregiver supply in the right towns first.
                    </p>

                    <form onSubmit={onSubmit} style={form}>
                        <div className="icare-wl-grid2" style={grid2}>
                            <div>
                                <label style={label}>Email</label>
                                <input className="icare-wl-input" type="email" required placeholder="you@email.com" style={field} />
                            </div>
                            <div>
                                <label style={label}>Postcode</label>
                                <input className="icare-wl-input" required placeholder="e.g. GL50" style={field} />
                            </div>
                        </div>

                        <div className="icare-wl-grid2" style={grid2}>
                            <div>
                                <label style={label}>I’m here as</label>
                                <select className="icare-wl-input" defaultValue="family" style={field}>
                                    <option value="family">Family / client</option>
                                    <option value="caregiver">Caregiver</option>
                                </select>
                            </div>
                            <div>
                                <label style={label}>When do you need care?</label>
                                <select className="icare-wl-input" defaultValue="soon" style={field}>
                                    <option value="soon">Soon (1–4 weeks)</option>
                                    <option value="1_3m">1–3 months</option>
                                    <option value="3m_plus">3+ months</option>
                                    <option value="not_sure">Not sure yet</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={label}>Type of care</label>
                            <select className="icare-wl-input" defaultValue="hourly" style={field}>
                                <option value="hourly">Hourly home care</option>
                                <option value="live_in">Live-in care</option>
                                <option value="night">Night care / overnight</option>
                                <option value="dementia">Dementia support</option>
                                <option value="companion">Companionship / routines</option>
                                <option value="not_sure">Not sure yet</option>
                            </select>
                        </div>

                        <div style={btnWrap}>
                            <button type="submit" style={btn} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                {status === "ok" ? "You're on the list ✓" : "Join the waiting list"}
                            </button>

                            <p style={note}>
                                We’ll send one launch email and occasional updates. Unsubscribe anytime. (GDPR-friendly)
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
