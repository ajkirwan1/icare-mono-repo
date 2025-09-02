import React from "react";
import { Link } from "react-router";
import iCareForCarereceiversSrc from "/images/heros/icare-for-carereceivers.jpg";

const BRAND_GREEN = "#5B7562";
const BRAND_GREEN_DARK = "#465C4D";

export default function ICareForCaregivers() {
  // Full-screen hero variation with overlayed nav
  const heroWrap = {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const heroImg = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    filter: "brightness(.85)"
  };

  const heroOverlay = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)"
  };

  const headerOverlay = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    zIndex: 20,
    background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 90%, rgba(0,0,0,0) 100%)"
  };

  const brand = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.35rem",
    fontWeight: 700,
    letterSpacing: ".5px"
  };

  const nav = {
    display: "flex",
    gap: "1.5rem"
  };

  const navLink = {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    fontSize: ".95rem",
    fontWeight: 500,
    transition: "color .25s"
  };

  const content = {
    position: "relative",
    zIndex: 10,
    maxWidth: "880px",
    width: "100%",
    padding: "0 2rem",
    textAlign: "center",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.4rem"
  };

  const title = {
    margin: 0,
    fontSize: "clamp(2.6rem,5.2vw,3.8rem)",
    lineHeight: 1.05,
    fontWeight: 700,
    textShadow: "0 4px 18px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.4)"
  };

  const lead = {
    margin: 0,
    maxWidth: "760px",
    fontSize: "clamp(1.05rem,1.5vw,1.25rem)",
    lineHeight: 1.45,
    color: "rgba(255,255,255,0.92)",
    textShadow: "0 2px 8px rgba(0,0,0,0.4)"
  };

  const ctaRow = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    marginTop: ".5rem"
  };

  const baseBtn = {
    border: "none",
    borderRadius: "12px",
    padding: ".95rem 1.8rem",
    fontSize: ".95rem",
    fontWeight: 600,
    letterSpacing: ".3px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: ".5rem",
    transition: "background .25s, color .25s, transform .2s, box-shadow .25s"
  };

  const primaryBtn = {
    ...baseBtn,
    background: "#ffffff",
    color: BRAND_GREEN,
    boxShadow: "0 6px 20px -6px rgba(0,0,0,0.35)"
  };

  const secondaryBtn = {
    ...baseBtn,
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    border: "2px solid rgba(255,255,255,0.5)",
    backdropFilter: "blur(4px)"
  };

  const sectionShell = {
    maxWidth: "1120px",
    width: "100%",
    margin: "0 auto",
    padding: "4rem 2rem 5rem",
    display: "grid",
    gap: "2.5rem",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))"
  };

  const infoCard = {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "1.5rem 1.4rem",
    display: "flex",
    flexDirection: "column",
    gap: ".65rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  };

  const infoTitle = {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 600,
    color: BRAND_GREEN_DARK
  };

  const infoP = {
    margin: 0,
    fontSize: ".95rem",
    lineHeight: 1.45,
    color: "#475569"
  };

  const footer = {
    borderTop: "1px solid #e2e8f0",
    padding: "2.5rem 2rem",
    fontSize: ".8rem",
    color: "#64748b",
    background: "#fff",
    marginTop: "2rem"
  };

  const listReset = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    gap: ".75rem",
    flexWrap: "wrap",
    justifyContent: "center"
  };

  return (
    <div style={{ fontFamily: "system-ui,-apple-system,Helvetica,Arial,sans-serif" }}>
      <section style={heroWrap} aria-label="Who We Are hero">
        <img src={iCareForCarereceiversSrc} alt="Care coordination background" style={heroImg} />
        <div style={heroOverlay} />
        <header style={headerOverlay}>
          <Link to="/" style={brand}>ICare</Link>
          <nav style={nav}>
            {[
              { to: "/", label: "Home" },
              { to: "/how-it-works", label: "How it Works" },
              { to: "/who-we-are", label: "Who We Are" },
              { to: "/privacy", label: "Privacy" },
              { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
              { to: "/icare-for-carereceivers", label: "ICare For Carereceivers" },
            ].map(l => (
              <Link
                key={l.to}
                to={l.to}
                style={navLink}
                onMouseOver={e => (e.currentTarget.style.color = "#fff")}
                onMouseOut={e => (e.currentTarget.style.color = navLink.color)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </header>
        <div style={content}>
          <h1 style={title}>Who We Are</h1>
          <p style={lead}>
            We are a team focused on simplifying collaboration around complex care. By
            bringing essential context, updates, and action into one shared place, we help
            caregivers and supporters reduce friction and act sooner.
          </p>
          <div style={ctaRow}>
            <button
              style={primaryBtn}
              onMouseOver={e => {
                e.currentTarget.style.background = BRAND_GREEN;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = BRAND_GREEN;
              }}
            >
              Our Approach
            </button>
            <button
              style={secondaryBtn}
              onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseOut={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >
              Meet the Team
            </button>
          </div>
        </div>
      </section>

      <section aria-label="Mission pillars" style={sectionShell}>
        {[
          {
            t: "Purpose",
            d: "Reduce fragmentation so every caregiver has the right context at the right moment."
          },
            {
            t: "Principles",
            d: "Clarity, privacy-first design, and respectful collaboration guide every decision."
          },
          {
            t: "Craft",
            d: "We iterate with real-world feedback to make workflows lighter and more intuitive."
          },
          {
            t: "Impact",
            d: "Better coordination means fewer delays, less stress, and improved outcomes."
          }
        ].map(p => (
          <div key={p.t} style={infoCard}>
            <h3 style={infoTitle}>{p.t}</h3>
            <p style={infoP}>{p.d}</p>
          </div>
        ))}
      </section>

      <footer style={footer}>
        <ul style={listReset}>
          <li><Link to="/" style={{ textDecoration: "none", color: BRAND_GREEN_DARK }}>Home</Link></li>
          <li><Link to="/landing" style={{ textDecoration: "none", color: BRAND_GREEN_DARK }}>Landing</Link></li>
          <li><Link to="/privacy" style={{ textDecoration: "none", color: BRAND_GREEN_DARK }}>Privacy</Link></li>
        </ul>
        <div style={{ marginTop: ".75rem", textAlign: "center" }}>
          © {new Date().getFullYear()} ICare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}