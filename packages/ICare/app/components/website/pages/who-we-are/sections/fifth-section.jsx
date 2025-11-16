import React from "react";
import { NavLink } from "react-router";
// import { InfoCard } from "../cards/info-card";
// import styles from "../../../../../styles/components/website/pages/who-we-are/sections/first-section.module.scss";

const BRAND = "#1FAB1F";

export function FifthSection() {
  return (
    <section id="contact" aria-label="Contact us" style={{ margin: "3.5rem 0 4.5rem", padding: "0 clamp(16px,4vw,32px)" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          borderRadius: 18,
          border: "1px solid rgba(31,171,31,.22)",
          background: "#FFFFFF",
          boxShadow: "0 12px 28px rgba(2,8,23,.06)",
          padding: "clamp(18px,2vw,26px)",
          display: "grid",
          gap: 10,
          alignItems: "center"
        }}
      >
        <h3 style={{ margin: 0, color: "#0F172A", fontWeight: 900, fontSize: "clamp(1.2rem,2.4vw,1.6rem)" }}>
          Want to learn more or partner with us?
        </h3>
        <p style={{ margin: 0, color: "#334155", lineHeight: 1.65 }}>
          We’re happy to talk. Tell us about your needs — we’ll get back within 1–2 business days.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
          <a
            href="mailto:hello@icare.example"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              fontWeight: 800,
              letterSpacing: ".3px",
              fontSize: ".95rem",
              padding: ".75rem 1.1rem",
              borderRadius: 999,
              color: "#fff",
              background: BRAND,
              border: "1px solid rgba(31,171,31,.35)",
              boxShadow: "0 10px 24px rgba(2,8,23,.12)"
            }}
          >
            Email us
          </a>
          <NavLink
            to="/how-it-works"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              fontWeight: 800,
              letterSpacing: ".3px",
              fontSize: ".95rem",
              padding: ".75rem 1.1rem",
              borderRadius: 999,
              color: "#0F172A",
              background: "#FFFFFF",
              border: "1.5px solid rgba(31,171,31,.45)"
            }}
          >
            Explore how it works
          </NavLink>
        </div>
      </div>
    </section>
  );
}
