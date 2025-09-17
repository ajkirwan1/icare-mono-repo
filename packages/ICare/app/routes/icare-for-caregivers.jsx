import React from "react";
import { Link } from "react-router";
import HeroComponent from "../components/hero-component";
import { IcarePage, IcareSection, IcareCard } from "react-library";
import featureCards from "../data/caregiver-feature-cards";

const BRAND_GREEN_DARK = "#465C4D";

export default function ICareForCaregivers() {

  const sectionShell = {
    maxWidth: "1120px",
    width: "100%",
    margin: "0 auto",
    padding: "4rem 2rem 5rem",
    display: "grid",
    gap: "2.5rem",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))"
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
      <HeroComponent />
      <IcarePage>
        <IcareSection>
          <div style={sectionShell}>
            {featureCards.map((c, i) => (
              <IcareCard key={c.title + i} variant="elevated">
                <span slot="contents">
                  <fig style={{ width: "50px", display: "flex", justifyContent: "center", margin: "0 auto" }}>
                    <img src={c.icon} alt="Icon" style={{ width: "100%" }} />
                  </fig>
                  <h2 style={{ display: "flex", justifyContent: "center" }}>{c.title}</h2>
                  <p>{c.text}</p>
                </span>
              </IcareCard>
            ))}
          </div>
        </IcareSection>
        <IcareSection />
      </IcarePage>
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
