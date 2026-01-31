const API = import.meta.env.VITE_API_URL;

import React from "react";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ContactUsForm from "~/components/website/common/forms/contact-us-form";

export default function ContactUPage() {
  const COLORS = {
    text: "#0F172A",
    textWhite: "#FFF"
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

  const grid = { gap: "clamp(14px, 2.2vw, 22px)", alignItems: "stretch" };

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
            <ContactUsForm action="/contact" method="post" delayMs={3000} />
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
