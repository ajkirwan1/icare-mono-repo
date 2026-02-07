const API = import.meta.env.VITE_API_URL;

import React from "react";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ContactUsForm from "~/components/website/common/forms/contact-us-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faFacebook
} from "@fortawesome/free-brands-svg-icons";

export default function ContactUPage() {
    const COLORS = {
        text: "#0F172A",
        textWhite: "#FFF",
    };

    const COMPANY = {
        brand: "ICare",
        operatorLabel: "ICare (sole trader, UK)",
        tradingAs: "ICare",
        location: "Cheltenham, United Kingdom",
        email: "customershelp@icare.com",
        socials: {
            linkedin: "https://www.linkedin.com/company/icare",
            facebook: "https://www.facebook.com/icare",
        },
    };


    // ✅ NEW: white section (above)
    const whiteWrap = {
        width: "100%",
        background: "#fff",
        color: COLORS.text,
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "clamp(3.6rem, 5.2vw, 4.8rem) 0",
        borderTop: "1px solid rgba(15,23,42,0.08)",
        borderBottom: "1px solid rgba(15,23,42,0.08)",
    };

    const whiteContainer = {
        width: "min(92vw, 980px)",
        margin: "0 auto",
    };

    const whiteHeader = {
        paddingTop: "4rem",
        maxWidth: "50ch",
        margin: "0 auto",
        display: "grid",
        gap: 10,
        textAlign: "center",
    };

    const whiteH1 = {
        margin: 0,
        fontWeight: 520,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.05rem, 2.8vw, 2.55rem)",
        color: COLORS.text,
    };

    const whiteLead = {
        margin: "0.7rem 0 0",
        fontSize: "1.22rem",
        lineHeight: 1.65,
        color: "rgba(15,23,42,0.90)",
        fontWeight: 420,
    };

    const whiteGrid = {
        marginTop: "clamp(1.8rem, 3vw, 2.4rem)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(18px, 3vw, 26px)",
        alignItems: "start",
    };

    const whiteCard = {
        border: "1px solid rgba(221, 139, 79,0.2)",
        background: "rgba(255,255,255,1)",
        borderRadius: 18,
        padding: "clamp(16px, 2.2vw, 22px)",
        boxShadow: "0 14px 36px rgba(15,23,42,0.06)",
    };

    const h3 = {
        margin: 0,
        fontWeight: 650,
        fontSize: "1.25rem",
        letterSpacing: "-0.2px",
        color: COLORS.text,
    };

    const p = {
        margin: "0.65rem 0 0",
        fontSize: "1.08rem",
        lineHeight: 1.65,
        color: "rgba(15,23,42,0.88)",
        fontWeight: 420,
    };

    const small = {
        margin: "0.65rem 0 0",
        fontSize: "1.02rem",
        lineHeight: 1.65,
        color: "rgba(15,23,42,0.78)",
        fontWeight: 420,
    };

    const link = {
        color: "rgba(221, 139, 79,1)",
        textDecoration: "none",
        borderBottom: "1px solid rgba(15,23,42,0.28)",
        fontWeight: 650,
    };

    // ✅ existing (photo + form) section (kept)
    const wrap = {
        position: "relative",
        width: "100%",
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
        backgroundImage: "url('/images/web/homepage/caregiverbottom2.png')",
        backgroundSize: "cover",
        padding: "4rem 0"
    };

    const overlay = {
        pointerEvents: "none",
        position: "absolute",
        height: "100%",
        inset: 0,
        background:
            "linear-gradient(160deg, rgba(0,0,0,0.55), rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.55))",
    };

    const container = {
        position: "relative",
        zIndex: "2",
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const header = {
        display: "grid",
        gap: 10,
        margin: "0",
        marginBottom: "clamp(18px, 2.6vw, 26px)",
        maxWidth: "600px",
    };

    const h2 = {
        margin: 0,
        fontWeight: 500,
        lineHeight: 1.14,
        fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
        color: COLORS.textWhite,
        letterSpacing: "-0.6px",
    };

    const lead = {
        margin: "1rem 0 1.5rem",
        color: COLORS.textWhite,
        fontSize: "1.25rem",
        lineHeight: 1.6,
        fontWeight: 600,
    };

    const iconStyle = {
        fontSize: "0.9em",
        lineHeight: 1,
    };

    const socials = {
        display: "flex",
        marginTop: "1rem",
        gap: "0.7rem"
    }

    const socialLink = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.6rem",
        lineHeight: 1,
        color: "#0f172a",
        background: "none",
        border: "none",
        padding: 0,
        transition: "opacity 0.2s ease, transform 0.2s ease",
    };

    const grid = { gap: "clamp(14px, 2.2vw, 22px)", alignItems: "stretch" };

    return (
        <>
            <ICareNavbar />

            {/* ✅ NEW WHITE SECTION ABOVE */}
            <section aria-label="Contact information" style={whiteWrap}>
                <div style={whiteContainer}>
                    <header style={whiteHeader}>
                        <h1 style={whiteH1}>Contact us</h1>
                        <p style={whiteLead}>
                            Whether you’re a family, a caregiver, or a potential partner - we’d love to hear from you.
                        </p>
                    </header>

                    <div style={whiteGrid}>
                        <div style={whiteCard}>
                            <h3 style={h3}>General enquiries</h3>
                            <p style={p}>
                                Email us and we’ll respond as soon as possible.
                            </p>
                            <p style={small}>
                                <strong>Email:</strong>{" "}
                                <a href="mailto:hello@icare.co.uk" style={link}>
                                    hello@icare.co.uk
                                </a>
                            </p>
                            <p style={small}>
                                We aim to reply within 2 business days. During pre-launch, some replies may take a little longer.
                            </p>
                        </div>

                        <div style={whiteCard}>
                            <h3 style={h3}>For families</h3>
                            <p style={p}>
                                If you’re exploring companionship care for a parent or loved one, tell us what you need.
                            </p>
                            <p style={small}>
                                We’re not yet fully operational - your message helps us build something genuinely useful.
                            </p>
                        </div>

                        <div style={whiteCard}>
                            <h3 style={h3}>For caregivers</h3>
                            <p style={p}>
                                If you’re interested in offering care independently through ICare, we’d love to hear about your experience.
                            </p>
                            <p style={p}>
                                Tell us what would make care work clearer, fairer, and easier to manage.
                            </p>
                        </div>


                        <div style={whiteCard}>
                            <h3 style={h3}>Social media</h3>
                            <p style={p}>
                                We’re building ICare in public and sharing our journey as we go.
                            </p>
                            <p style={p}>
                                Follow along for updates, care guidance content, and behind-the-scenes
                                insights:
                            </p>

                            <div style={socials}>

                                <a
                                    href={COMPANY.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="ICare on LinkedIn"
                                    style={socialLink}
                                >
                                    <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
                                </a>

                                <a
                                    href={COMPANY.socials.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="ICare on Facebook"
                                    style={socialLink}
                                >
                                    <FontAwesomeIcon icon={faFacebook} style={iconStyle} />
                                </a>

                            </div>

                        </div>

                    </div>


                    <div
                        style={{
                            marginTop: "clamp(3rem, 4.5vw, 4rem)",
                            maxWidth: "600px",
                            display: "flex"
                        }}
                        className="icare-contact-extra"
                    >


                        <div>
                            <h3 style={h3}>Response times</h3>
                            <p style={p}>
                                We’re a small team building something meaningful.
                                While we aim to respond to all enquiries within{" "}
                                <strong>2 business days</strong>, some questions may take longer as
                                we focus on preparing the platform for launch.
                            </p>
                            <p style={p}>
                                Thank you for your patience and for your interest in ICare.
                            </p>
                        </div>

                    </div>

                    <style>{`
                    @media (max-width: 860px){
                        .icare-contact-extra{
                        grid-template-columns: 1fr !important;
                        }
                        .icare-contact-extra > div[aria-hidden="true"]{
                        display: none;
                        }
                    }
                    `}</style>


                    <style>{`
            @media (max-width: 860px){
              .icare-contact-white-grid{
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
                </div>
            </section>

            {/* ✅ EXISTING FORM SECTION (photo background) */}
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
