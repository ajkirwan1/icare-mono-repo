import React, { useState } from "react";

/**
 * ICare — Waitlist Final (conversion section)
 * ✅ H1: 10% bigger
 * ✅ H2: #778d43, underline, +30% bigger
 * ✅ Lead: 10% smaller
 * ✅ Button identical to “How ICare works” CTA button
 * ✅ Button 15% smaller
 */
export default function ICareWaitlistFinal() {
    const TEXT = "#0F172A";
    const BRAND_CTA = "rgb(231 153 97)";
    const OLIVE = "#778d43";

    const [status, setStatus] = useState("idle"); // idle | ok

    const wrap = {
        width: "100%",
        background: "#ffffff",
        color: TEXT,
        padding: "clamp(3.8rem, 5.6vw, 5.2rem) 0",
        fontFamily:
            "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(18px, 3vw, 40px)",
        alignItems: "stretch",
    };

    const card = {
        height: "100%",
        borderRadius: 24,
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(15,23,42,0.10)",
        boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
        padding: "clamp(18px, 2.4vw, 26px)",
        display: "flex",
        flexDirection: "column",
    };

    const imageWrap = {
        height: "100%",
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid rgba(15,23,42,0.10)",
        boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
        background: "rgba(15,23,42,0.03)",
    };

    const image = {
        width: "100%",
        height: "100%",
        display: "block",
        objectFit: "cover",
    };

    // ✅ H1 10% bigger (was clamp(1.42–1.64))
    const h1 = {
        margin: 0,
        fontWeight: 500,
        letterSpacing: "-0.5px",
        lineHeight: 1.20,
        fontSize: "clamp(1.56rem, 2.08vw, 1.80rem)", // ✅ +10%
        color: TEXT,
    };

    const h2 = {
        margin: "22px 0 0",
        fontWeight: 600,
        letterSpacing: "-0.15px",
        lineHeight: 1.28,
        fontSize: "1.38rem",
        color: OLIVE,
        textDecoration: "underline",
        textDecorationThickness: "2px",
        textUnderlineOffset: "6px",
    };

    const lead = {
        margin: "18px 0 0",
        color: TEXT,
        fontWeight: 500,
        lineHeight: 1.65,
        fontSize: "1.1rem",
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
        fontSize: "1rem",
        color: TEXT,
        outline: "none",
    };

    const btnWrap = {
        display: "grid",
        justifyItems: "center",
        gap: 14,
        marginTop: "auto",
        paddingTop: 16,
    };

    // ✅ Button 15% smaller: font, padding, width
    const btn = {
        border: "none",
        borderRadius: 36,
        background: BRAND_CTA,
        color: "#fff",
        fontWeight: 700,
        fontSize: "1.02rem", // ✅ was 1.2rem
        padding: "15px 14px", // ✅ was 18px 16px
        cursor: "pointer",
        width: "min(221px, 86vw)", // ✅ was min(260px, 88vw)
        transition: "filter .14s ease, background .14s ease",
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
    @media (max-width: 980px){
      .icare-wl-layout{ grid-template-columns: 1fr !important; }
      .icare-wl-image{ aspect-ratio: 4 / 3; }
    }
    @media (max-width: 620px){
      .icare-wl-grid2{ grid-template-columns: 1fr !important; }
    }
    .icare-wl-input:focus{
      border-color: rgba(231,153,97,0.55) !important;
      box-shadow: 0 0 0 4px rgba(231,153,97,0.16) !important;
    }
  `;

    const onEnter = (e) => (e.currentTarget.style.filter = "brightness(1.06)");
    const onLeave = (e) => (e.currentTarget.style.filter = "brightness(1)");

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus("ok");
    };

    return (
        <section id="waitlist" aria-label="Join the ICare waiting list" style={wrap}>
            <style>{microCSS}</style>

            <div className="icare-wl-layout" style={container}>
                {/* LEFT */}
                <div style={card}>
                    <h1 style={h1}>Be first to know when ICare <br />opens near you</h1>
                    <h2 style={h2}>Get early access in your area</h2>
                    <p style={lead}>
                        Leave a few details and we’ll notify you when ICare opens near you. Your answers help us
                        prioritise caregiver supply in the right towns first.
                    </p>

                    <form onSubmit={onSubmit} style={form}>
                        <div className="icare-wl-grid2" style={grid2}>
                            <div>
                                <label style={label}>Email</label>
                                <input
                                    className="icare-wl-input"
                                    type="email"
                                    required
                                    placeholder="you@email.com"
                                    style={field}
                                />
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
                                {status === "ok" ? "You are now on the list ✓" : "Join the waiting list"}
                            </button>

                            <p style={note}>
                                We’ll send one launch email and occasional updates. Unsubscribe anytime. (GDPR-friendly)
                            </p>
                        </div>
                    </form>
                </div>

                {/* RIGHT */}
                <div style={imageWrap}>
                    <img
                        src="/images/web/icare-for-carereceivers/browse2.png"
                        alt="Browse caregivers"
                        style={image}
                    />
                </div>
            </div>
        </section>
    );
}
