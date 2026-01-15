const API = import.meta.env.VITE_API_URL;

import React, { useState } from "react";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// export async function loader() {
//   // const formData = await request.formData();
//   console.log("FIRED");
//   const res = await fetch(`${API}/api/todos`);
//   if (!res.ok) { throw new Response("API error", { status: res.status }); }
//   console.log(res);
// }

export default function ContactUPage() {
  const COLORS = {
    border: "rgba(15,23,42,0.10)",
    text: "#0F172A",
    textWhite: "#FFF",
    textBlack: "#000",
    muted: "rgba(15,23,42,0.72)",
    accent: "#b97a57",
    olive: "#61674d",
    btnFamily: "#e79961"
  };

  const [status, setStatus] = useState("idle"); // idle | ok

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("ok");
  };

  const wrap = {
    position: "relative",
    width: "100%",
    fontFamily:
      "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: COLORS.text,
    padding: "clamp(3.8rem, 5.2vw, 4.8rem) 0",
    backgroundImage: "url('/images/web/homepage/caregiverbottom2.png')",
    backgroundSize: "cover",
    paddingTop: "calc(var(--navbar-height) + 5vh)"
  };

  const overlay = {
    pointerEvents: "none",
    position: "absolute",
    height: "100%",
    inset: 0,
    background:
      "linear-gradient(160deg, rgba(0,0,0,0.55), rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.55))"
  };

  const container = {
    position: "relative",
    zIndex: "2",
    width: "min(92vw, 1100px)",
    margin: "0 auto"
  };

  const header = {
    display: "grid",
    gap: 10,
    margin: "0 auto",
    marginBottom: "clamp(18px, 2.6vw, 26px)",
    maxWidth: "78ch"
  };

  const h2 = {
    margin: 0,
    fontWeight: 500,
    lineHeight: 1.14,
    fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
    color: COLORS.textWhite,
    textAlign: "center",
    letterSpacing: "-0.6px"
  };

  const lead = {
    margin: "2rem 0 3rem",
    color: COLORS.textWhite,
    fontSize: "1.25rem",
    lineHeight: 1.6,
    fontWeight: 600,
    textAlign: "center"
  };

  const grid = {
    // display: "grid",
    // gridTemplateColumns: "1fr 1fr",
    gap: "clamp(14px, 2.2vw, 22px)",
    alignItems: "stretch"
  };

  const card = {
    background: "white",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 22,
    padding: "clamp(18px, 2.2vw, 22px)",
    boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
    display: "grid",
    gap: 14,
    minHeight: 260
  };

  const topRow = {
    display: "flex",
    alignItems: "center",
    gap: 12
  };

  const icon = {
    width: 50,
    height: 50,
    borderRadius: 18,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.olive,
    flex: "0 0 auto"
  };

  const iconSvg = {
    fontSize: "27px",
    lineHeight: 1
  };

  const title = {
    margin: 0,
    fontWeight: 900,
    fontSize: "1.6rem",
    color: COLORS.text,
    lineHeight: 1.2
  };

  const sub = {
    margin: 0,
    color: COLORS.textBlack,
    fontWeight: 700,
    lineHeight: 1.65,
    fontSize: "1.1rem"
    // maxWidth: "56ch"
  };

  const form = {
    marginTop: 6,
    display: "grid",
    gap: 12
  };

  const grid2 = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10
  };

  const label = {
    fontWeight: 900,
    color: COLORS.text,
    fontSize: ".88rem",
    letterSpacing: "-0.1px",
    marginBottom: 6,
    display: "block"
  };

  const field = {
    width: "100%",
    border: "1px solid rgba(15,23,42,0.12)",
    borderRadius: 14,
    padding: "11px 12px",
    background: "#fff",
    fontSize: "0.98rem",
    color: COLORS.text,
    outline: "none"
  };

  const textarea = {
    ...field,
    resize: "vertical",
    minHeight: 140
  };

  const btnWrap = {
    display: "grid",
    justifyItems: "center",
    gap: 14,
    marginTop: 6
  };

  const primaryBtn = {
    border: "none",
    borderRadius: 36,
    background: COLORS.btnFamily,
    color: "#fff",
    fontWeight: 900,
    fontSize: "0.98rem",
    padding: "16px 2.2rem",
    cursor: "pointer",
    transition: "filter .14s ease",
    width: "min(260px, 88vw)"
  };

  const note = {
    margin: 0,
    color: COLORS.muted,
    fontWeight: 650,
    fontSize: ".95rem",
    textAlign: "center",
    lineHeight: 1.55,
    maxWidth: "66ch"
  };

  const onEnter = (e) => (e.currentTarget.style.filter = "brightness(1.06)");
  const onLeave = (e) => (e.currentTarget.style.filter = "brightness(1)");

  return (
    <>
      <ICareNavbar />

      <section aria-label="ICare contact us" style={wrap}>
        <div style={overlay} />
        <div style={container}>
          <div style={header}>
            <h2 style={h2}>Contact us</h2>
            <p style={lead}>
              If you have any questions, please feel free to contact us and we will respond as quickly as possible
            </p>
          </div>

          <div className="icare-2paths" style={grid}>
            {/* CARD: insert form here */}
            <div style={card}>
              <div style={topRow}>
                <span style={icon} aria-hidden="true">
                  <FontAwesomeIcon style={iconSvg} icon={faHouseUser} />
                </span>
                <h3 style={title}>For families & care receivers</h3>
              </div>

              <p style={sub}>
                Send us a message about care needs, availability, pricing, or anything else — we’ll reply as soon as possible.
              </p>

              <form onSubmit={onSubmit} style={form}>
                <div className="icare-contact-grid2" style={grid2}>
                  <div>
                    <label style={label} htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      className="icare-contact-input"
                      type="email"
                      required
                      placeholder="you@email.com"
                      style={field}
                    />
                  </div>

                  <div>
                    <label style={label} htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      className="icare-contact-input"
                      required
                      placeholder="How can we help?"
                      style={field}
                    />
                  </div>
                </div>

                <div>
                  <label style={label} htmlFor="contact-topic">Topic</label>
                  <select
                    id="contact-topic"
                    className="icare-contact-input"
                    defaultValue="general"
                    style={field}
                  >
                    <option value="general">General question</option>
                    <option value="care">Care needs</option>
                    <option value="caregiver">Caregiver onboarding</option>
                    <option value="safety">Trust & safety</option>
                    <option value="billing">Billing / payments</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={label} htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="icare-contact-input"
                    required
                    placeholder="Tell us what’s going on…"
                    style={textarea}
                  />
                </div>

                <div style={btnWrap}>
                  <button
                    type="submit"
                    style={primaryBtn}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {status === "ok" ? "Message sent ✓" : "Send message"}
                  </button>

                  <p style={note}>
                    We’ll only use your details to reply. We don’t sell personal data.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px){
            .icare-2paths{ grid-template-columns: 1fr !important; }
          }
          @media (max-width: 620px){
            .icare-contact-grid2{ grid-template-columns: 1fr !important; }
          }
          .icare-contact-input:focus{
            border-color: rgba(231,153,97,0.55) !important;
            box-shadow: 0 0 0 4px rgba(231,153,97,0.16) !important;
          }
        `}</style>
      </section>

      <ICareFooter />
    </>
  );
}
