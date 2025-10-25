import React from "react";
import { Link } from "react-router";
import whoWeAreHeroSrc from "/images/heros/who-we-are.jpg";
import styles from "./how-it-works.module.scss";/* ===== STICKY SUBNAV (samozaczepna) ===== */
function StickySubnav() {
  const BRAND = "#1FAB1F";
  const linkStyle = {
    textDecoration: "none",
    color: "#0F172A",
    fontWeight: 800,
    letterSpacing: ".02em",
    fontSize: "clamp(.9rem, 1.2vw, 1rem)",
    padding: ".55rem .9rem",
    borderRadius: 999,
    border: "1px solid rgba(31,171,31,.25)",
    background: "rgba(31,171,31,.08)",
    transition: "background .2s ease, transform .15s ease, border-color .2s ease"
  };
  return (
    <nav
      aria-label="Page quick nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,.92)",
        backdropFilter: "saturate(1.1) blur(6px)",
        borderBottom: "1px solid rgba(15,23,42,.06)"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "10px clamp(16px,4vw,32px)",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {[
          { href: "#steps", label: "Steps" },
          { href: "#compare", label: "Compare" },
          { href: "#estimator", label: "Estimator" },
          { href: "#contact", label: "Contact" }
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={linkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(31,171,31,.14)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.borderColor = BRAND;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(31,171,31,.08)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(31,171,31,.25)";
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ===== 3-KROKOWY PRZEWODNIK ===== */
function ThreeStepGuide() {
  const BRAND = "#1FAB1F";
  const steps = [
    {
      t: "Create your profile",
      d: "Register for free, set care needs or skills, choose languages and availability.",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true">
          <circle cx="12" cy="7.5" r="3.25" fill="none" stroke={BRAND} strokeWidth="2" />
          <path d="M5 20v-1.2A5.8 5.8 0 0 1 10.8 13h2.4A5.8 5.8 0 0 1 19 18.8V20" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      t: "Match & message",
      d: "Browse verified caregivers, match on skills and location, chat securely.",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true">
          <path d="M21 15a4 4 0 0 1-4 4H8l-4 4V7a4 4 0 0 1 4-4h7" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 3.5l5 5" fill="none" stroke={BRAND} strokeWidth="2" /><path d="M20.5 3.5l-5 5" fill="none" stroke={BRAND} strokeWidth="2" />
        </svg>
      )
    },
    {
      t: "Agree terms & start",
      d: "Set schedule and rate, e-sign your agreement, keep everything in one place.",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true">
          <rect x="3" y="3" width="18" height="14" rx="2" fill="none" stroke={BRAND} strokeWidth="2" />
          <path d="M7 8h6M7 12h10" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" />
          <path d="M16 17l2 2 4-4" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];
  return (
    <section id="steps" aria-label="Three steps" style={{ margin: "3.2rem auto", maxWidth: 1200, padding: "0 clamp(16px,4vw,32px)" }}>
      <h2 style={{ margin: 0, fontWeight: 900, color: "#1f2a37", fontSize: "clamp(1.35rem,2.6vw,1.9rem)" }}>
        Get started in 3 quick steps
      </h2>
      <div aria-hidden="true" style={{ width: 220, height: 4, background: BRAND, borderRadius: 999, margin: ".75rem 0 1.5rem 0" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(16px,2.4vw,24px)" }}>
        {steps.map((s, i) => (
          <article key={s.t} style={{ border: "1px solid rgba(15,23,42,.08)", borderRadius: 16, background: i % 2 ? "#FAFAF7" : "#FFFFFF", padding: "22px 20px", boxShadow: "0 10px 26px rgba(15,23,42,.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(31,171,31,.1)", display: "grid", placeItems: "center" }}>{s.icon}</div>
              <strong style={{ fontSize: "1.05rem", color: "#1f2a37", letterSpacing: ".2px" }}>{s.t}</strong>
            </div>
            <p style={{ margin: "10px 0 0", color: "#334155", lineHeight: 1.65 }}>{s.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ===== PORÓWNANIE: Agency vs ICare ===== */
function CompareAgencyVsICare() {
  const BRAND = "#1FAB1F";
  const rows = [
    { k: "Monthly platform fee", agency: "Often recurring", icare: "None" },
    { k: "Matching margin", agency: "20–50%+", icare: "0%" },
    { k: "Contract fee", agency: "Hidden or bundled", icare: "Flat 10% on agreement" },
    { k: "Direct contact", agency: "Limited", icare: "Yes — private & secure" },
    { k: "Transparency", agency: "Varies", icare: "Clear profiles & pricing" }
  ];
  return (
    <section id="compare" aria-label="Compare agency vs ICare" style={{ margin: "3.2rem auto", maxWidth: 1200, padding: "0 clamp(16px,4vw,32px)" }}>
      <h2 style={{ margin: 0, fontWeight: 900, color: "#1f2a37", fontSize: "clamp(1.35rem,2.6vw,1.9rem)" }}>Why ICare vs an agency?</h2>
      <div aria-hidden="true" style={{ width: 220, height: 4, background: BRAND, borderRadius: 999, margin: ".75rem 0 1.5rem 0" }} />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "14px 16px", background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#0F172A", fontWeight: 800 }}>Feature</th>
              <th style={{ textAlign: "left", padding: "14px 16px", background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#7F1D1D", fontWeight: 800 }}>Typical agency</th>
              <th style={{ textAlign: "left", padding: "14px 16px", background: "rgba(31,171,31,.08)", border: "1px solid #BDE7BD", color: BRAND, fontWeight: 900 }}>ICare</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.k} style={{ background: idx % 2 ? "#FFFFFF" : "#FAFAF7" }}>
                <td style={{ padding: "14px 16px", border: "1px solid #E2E8F0", color: "#334155", fontWeight: 700 }}>{r.k}</td>
                <td style={{ padding: "14px 16px", border: "1px solid #E2E8F0", color: "#475569" }}>{r.agency}</td>
                <td style={{ padding: "14px 16px", border: "1px solid #BDE7BD", color: "#14532D", fontWeight: 800 }}>{r.icare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ===== CTA BANNER: Kontakt / pytania ===== */
function ContactCTABanner() {
  const BRAND = "#1FAB1F";
  return (
    <section id="contact" aria-label="Contact CTA" style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", width: "100vw", background: "#F7FFF7" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px clamp(16px,4vw,32px)", display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center" }}>
        <div>
          <h3 style={{ margin: 0, color: "#0F172A", fontWeight: 900, fontSize: "clamp(1.2rem,2.2vw,1.6rem)" }}>
            Questions about how ICare works?
          </h3>
          <p style={{ margin: "6px 0 0", color: "#334155", maxWidth: "70ch" }}>
            We’ll gladly walk you through setup, matching, and agreements — in under 10 minutes.
          </p>
        </div>
        <a
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "#FFFFFF",
            background: BRAND,
            padding: ".9rem 1.35rem",
            borderRadius: 999,
            fontWeight: 900,
            letterSpacing: ".02em",
            boxShadow: "0 10px 24px rgba(2,8,23,.12)",
            border: "1px solid rgba(31,171,31,.45)"
          }}
        >
          Contact us
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

function SavingsEstimatorCurrency2() {

  const BRAND = "#1FAB1F";
  const [hourly, setHourly] = React.useState(20);
  const [hoursWeek, setHoursWeek] = React.useState(40);
  const [agencyMargin, setAgencyMargin] = React.useState(35);
  const [currency, setCurrency] = React.useState("PLN");

  const nf = React.useMemo(
    () => new Intl.NumberFormat(undefined, { style: "currency", currency }),
    [currency]
  );

  const { monthlyBase, monthlyAgency, monthlyICare, monthlySave, savePct } = React.useMemo(() => {
    const weeks = 4.33;
    const base = hourly * hoursWeek * weeks;
    const agency = base * (1 + agencyMargin / 100);
    const icare = base * 1.10; // ICare 10% flat
    const save = Math.max(0, agency - icare);
    const pct = agency > 0 ? (save / agency) * 100 : 0;
    return { monthlyBase: base, monthlyAgency: agency, monthlyICare: icare, monthlySave: save, savePct: pct };
  }, [hourly, hoursWeek, agencyMargin]);

  return (
    <section
      aria-label="Cost & Savings Estimator"
      style={{
        margin: "3.5rem auto 3.75rem",
        maxWidth: 1200,
        padding: "0 clamp(16px, 4vw, 32px)",
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <h2
        style={{
          margin: 0,
          fontWeight: 900,
          letterSpacing: ".2px",
          color: "#1f2a37",
          fontSize: "clamp(1.35rem, 2.6vw, 1.9rem)",
          lineHeight: 1.2,
          textAlign: "left"
        }}
      >
        Cost & Savings Estimator
      </h2>
      <div
        aria-hidden="true"
        style={{
          width: 220,
          height: 4,
          background: BRAND,
          borderRadius: 999,
          margin: ".75rem 0 1.75rem 0",
          opacity: 0.9
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(16px, 2.4vw, 24px)",
          alignItems: "stretch"
        }}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            border: "1px solid rgba(15,23,42,0.08)",
            borderRadius: 16,
            padding: "clamp(18px, 2vw, 22px)",
            background: "#FFFFFF",
            boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
            display: "grid",
            gap: 14
          }}
        >
          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>
              Currency
            </span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                border: "1px solid rgba(15,23,42,0.18)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "1rem",
                outline: "none",
                background: "#fff"
              }}
            >
              <option value="PLN">PLN — zł</option>
              <option value="EUR">EUR — €</option>
              <option value="GBP">GBP — £</option>
              <option value="USD">USD — $</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>
              Hourly rate
            </span>
            <input
              type="number"
              value={hourly}
              min={0}
              step={1}
              onChange={(e) => setHourly(Number(e.target.value || 0))}
              style={{
                border: "1px solid rgba(15,23,42,0.18)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "1rem",
                outline: "none"
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>
              Hours per week
            </span>
            <input
              type="number"
              value={hoursWeek}
              min={0}
              step={1}
              onChange={(e) => setHoursWeek(Number(e.target.value || 0))}
              style={{
                border: "1px solid rgba(15,23,42,0.18)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "1rem",
                outline: "none"
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>
              Agency margin (%)
            </span>
            <input
              type="number"
              value={agencyMargin}
              min={0}
              max={100}
              step={1}
              onChange={(e) => setAgencyMargin(Number(e.target.value || 0))}
              style={{
                border: "1px solid rgba(15,23,42,0.18)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "1rem",
                outline: "none"
              }}
            />
          </label>

          <div
            style={{
              marginTop: 4,
              padding: "10px 12px",
              borderRadius: 12,
              background: "rgba(31,171,31,0.08)",
              border: "1px solid rgba(31,171,31,0.20)",
              color: "#1f2a37",
              fontWeight: 700,
              fontSize: ".95rem"
            }}
          >
            ICare fee: <span style={{ color: BRAND }}>flat 10%</span> on contract
          </div>
        </form>

        <div
          style={{
            border: "1px solid rgba(15,23,42,0.08)",
            borderRadius: 16,
            padding: "clamp(18px, 2vw, 22px)",
            background: "#FFFFFF",
            boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
            display: "grid",
            gap: 14
          }}
        >
          <h3
            style={{
              margin: 0,
              fontWeight: 900,
              color: "#1f2a37",
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)"
            }}
          >
            Monthly estimate
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10
            }}
          >
            {[
              { k: "Base cost", v: monthlyBase },
              { k: "Agency total", v: monthlyAgency },
              { k: "ICare total", v: monthlyICare },
              { k: "You save with ICare", v: monthlySave, highlight: true }
            ].map((row) => (
              <div
                key={row.k}
                style={{
                  border: "1px solid rgba(15,23,42,0.08)",
                  borderRadius: 12,
                  padding: "12px 14px",
                  background: row.highlight ? "rgba(31,171,31,0.06)" : "#FFFFFF"
                }}
              >
                <div
                  style={{
                    fontSize: ".85rem",
                    color: "#475569",
                    marginBottom: 4,
                    fontWeight: 700
                  }}
                >
                  {row.k}
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "1.15rem",
                    color: row.highlight ? BRAND : "#1f2a37"
                  }}
                >
                  {nf.format(row.v)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 6 }}>
            <div
              style={{
                height: 10,
                width: "100%",
                background: "#F1F5F9",
                borderRadius: 999,
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.max(0, Math.min(100, savePct)).toFixed(0)}%`,
                  background: BRAND
                }}
              />
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: ".92rem",
                color: "#334155",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 12
              }}
            >
              <span>Estimated savings vs agency (monthly)</span>
              <strong style={{ color: BRAND }}>
                {savePct.toFixed(0)}%
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ===== Cost & Savings Estimator — bez importów, spójny z #1FAB1F ===== */
function SavingsEstimatorCurrency() {
  const BRAND = "#1FAB1F";
  const [hourly, setHourly] = React.useState(20);
  const [hoursWeek, setHoursWeek] = React.useState(40);
  const [agencyMargin, setAgencyMargin] = React.useState(35);
  const [currency, setCurrency] = React.useState("PLN");

  const nf = React.useMemo(
    () => new Intl.NumberFormat(undefined, { style: "currency", currency }),
    [currency]
  );

  const { monthlyBase, monthlyAgency, monthlyICare, monthlySave, savePct } = React.useMemo(() => {
    const weeks = 4.33;
    const base = hourly * hoursWeek * weeks;
    const agency = base * (1 + agencyMargin / 100);
    const icare = base * 1.10; // ICare 10% flat
    const save = Math.max(0, agency - icare);
    const pct = agency > 0 ? (save / agency) * 100 : 0;
    return { monthlyBase: base, monthlyAgency: agency, monthlyICare: icare, monthlySave: save, savePct: pct };
  }, [hourly, hoursWeek, agencyMargin]);

  return (
    <section
      aria-label="Cost & Savings Estimator"
      style={{
        margin: "3.5rem auto 3.75rem",
        maxWidth: 1200,
        padding: "0 clamp(16px, 4vw, 32px)",
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <h2
        style={{
          margin: 0,
          fontWeight: 900,
          letterSpacing: ".2px",
          color: "#1f2a37",
          fontSize: "clamp(1.35rem, 2.6vw, 1.9rem)",
          lineHeight: 1.2,
          textAlign: "left"
        }}
      >
        Cost & Savings Estimator
      </h2>
      <div
        aria-hidden="true"
        style={{
          width: 220,
          height: 4,
          background: BRAND,
          borderRadius: 999,
          margin: ".75rem 0 1.75rem 0",
          opacity: 0.9
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(16px, 2.4vw, 24px)",
          alignItems: "stretch"
        }}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            border: "1px solid rgba(15,23,42,0.08)",
            borderRadius: 16,
            padding: "clamp(18px, 2vw, 22px)",
            background: "#FFFFFF",
            boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
            display: "grid",
            gap: 14
          }}
        >
          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>
              Currency
            </span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                border: "1px solid rgba(15,23,42,0.18)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "1rem",
                outline: "none",
                background: "#fff"
              }}
            >
              <option value="PLN">PLN — zł</option>
              <option value="EUR">EUR — €</option>
              <option value="GBP">GBP — £</option>
              <option value="USD">USD — $</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>
              Hourly rate
            </span>
            <input
              type="number"
              value={hourly}
              min={0}
              step={1}
              onChange={(e) => setHourly(Number(e.target.value || 0))}
              style={{
                border: "1px solid rgba(15,23,42,0.18)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "1rem",
                outline: "none"
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>
              Hours per week
            </span>
            <input
              type="number"
              value={hoursWeek}
              min={0}
              step={1}
              onChange={(e) => setHoursWeek(Number(e.target.value || 0))}
              style={{
                border: "1px solid rgba(15,23,42,0.18)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "1rem",
                outline: "none"
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontWeight: 800, color: "#1f2a37", fontSize: ".95rem" }}>
              Agency margin (%)
            </span>
            <input
              type="number"
              value={agencyMargin}
              min={0}
              max={100}
              step={1}
              onChange={(e) => setAgencyMargin(Number(e.target.value || 0))}
              style={{
                border: "1px solid rgba(15,23,42,0.18)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "1rem",
                outline: "none"
              }}
            />
          </label>

          <div
            style={{
              marginTop: 4,
              padding: "10px 12px",
              borderRadius: 12,
              background: "rgba(31,171,31,0.08)",
              border: "1px solid rgba(31,171,31,0.20)",
              color: "#1f2a37",
              fontWeight: 700,
              fontSize: ".95rem"
            }}
          >
            ICare fee: <span style={{ color: BRAND }}>flat 10%</span> on contract
          </div>
        </form>

        <div
          style={{
            border: "1px solid rgba(15,23,42,0.08)",
            borderRadius: 16,
            padding: "clamp(18px, 2vw, 22px)",
            background: "#FFFFFF",
            boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
            display: "grid",
            gap: 14
          }}
        >
          <h3
            style={{
              margin: 0,
              fontWeight: 900,
              color: "#1f2a37",
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)"
            }}
          >
            Monthly estimate
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10
            }}
          >
            {[
              { k: "Base cost", v: monthlyBase },
              { k: "Agency total", v: monthlyAgency },
              { k: "ICare total", v: monthlyICare },
              { k: "You save with ICare", v: monthlySave, highlight: true }
            ].map((row) => (
              <div
                key={row.k}
                style={{
                  border: "1px solid rgba(15,23,42,0.08)",
                  borderRadius: 12,
                  padding: "12px 14px",
                  background: row.highlight ? "rgba(31,171,31,0.06)" : "#FFFFFF"
                }}
              >
                <div
                  style={{
                    fontSize: ".85rem",
                    color: "#475569",
                    marginBottom: 4,
                    fontWeight: 700
                  }}
                >
                  {row.k}
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "1.15rem",
                    color: row.highlight ? BRAND : "#1f2a37"
                  }}
                >
                  {nf.format(row.v)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 6 }}>
            <div
              style={{
                height: 10,
                width: "100%",
                background: "#F1F5F9",
                borderRadius: 999,
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.max(0, Math.min(100, savePct)).toFixed(0)}%`,
                  background: BRAND
                }}
              />
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: ".92rem",
                color: "#334155",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 12
              }}
            >
              <span>Estimated savings vs agency (monthly)</span>
              <strong style={{ color: BRAND }}>
                {savePct.toFixed(0)}%
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function HowItWorks() {

  return (
    <div className={styles.page}>
      <section className={styles.heroWrap} aria-label="How it works hero">
        <img
          src={whoWeAreHeroSrc}
          alt="Care coordination background"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />

        {/* ===== HEADER (nawigacja jako linki, spójne z hero) ===== */}
        <header className={styles.headerOverlay}>
          <Link to="/" className={styles.brand} style={{ color: "#fff", textDecoration: "none", fontWeight: 900 }}>
            ICare
          </Link>

          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem 1.1rem",
              alignItems: "center"
            }}
          >
            {[
              { to: "/", label: "Home" },
              { to: "/how-it-works", label: "How it Works" },
              { to: "/who-we-are", label: "Who We Are" },
              { to: "/privacy", label: "Privacy" },
              { to: "/icare-for-caregivers", label: "ICare For Caregivers" },
              { to: "/icare-for-carereceivers", label: "ICare For Care Receivers" }
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  color: "rgba(255,255,255,.9)",
                  textDecoration: "none",
                  fontSize: "clamp(.85rem, 1.2vw, .95rem)", // mniejsze, lekkie
                  fontWeight: 600,
                  letterSpacing: ".01em",
                  padding: ".2rem 0",
                  textUnderlineOffset: "6px",
                  transition:
                    "color .22s ease, text-decoration-color .22s ease, text-underline-offset .22s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.textDecoration = "underline";
                  e.currentTarget.style.textDecorationThickness = "2px";
                  e.currentTarget.style.textUnderlineOffset = "7px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,.9)";
                  e.currentTarget.style.textDecoration = "none";
                  e.currentTarget.style.textUnderlineOffset = "6px";
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* ===== HERO COPY (spójnie z brand green #1FAB1F) ===== */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "min(92vw, 1100px)",
            margin: "0 auto",
            padding: "0 clamp(16px, 4vw, 32px)",
            color: "#fff",
            textAlign: "left",
            fontFamily:
              "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          }}
        >
          {/* eyebrow */}
          <span
            style={{
              display: "inline-block",
              marginBottom: "3.2rem",
              marginTop: "-3.2rem",
              fontSize: "1.12rem",
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#EAF7EA",
              padding: ".56rem 1.12rem",
              borderRadius: 999,
              background: "rgba(31,171,31,0.20)", // #1FAB1F z transparencją
              border: "2px solid rgba(31,171,31,0.45)",
              textShadow: "0 1px 2px rgba(0,0,0,.25)"
            }}
          >
            Direct Fair Transparent
          </span>

          <h1
            style={{
              margin: "0 0 2rem",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: ".2px",
              fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)",
              textShadow: "0 4px 18px rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.35)",
              color: "#fff"
            }}
          >
            How it works
          </h1>

          <p
            style={{
              margin: ".25rem 0 0",
              lineHeight: 1.6,
              fontSize: "clamp(1.1rem, 1.1vw, 1.125rem)",
              color: "rgba(255,255,255,.96)",
              textShadow: "0 2px 8px rgba(0,0,0,.35)",
              maxWidth: "62ch"
            }}
          >
            <b>Why choose ICare instead of going through an agency?</b>
          </p>
          <p
            style={{
              margin: ".35rem 0 0",
              lineHeight: 1.6,
              fontSize: "clamp(1.1rem, 1.2vw, 1.125rem)",
              color: "rgba(255,255,255,.96)",
              textShadow: "0 2px 8px rgba(0,0,0,.35)",
              maxWidth: "62ch"
            }}
          >
            <b>Unlike traditional agencies, we don’t charge high margins for matching or management.</b>
          </p>
          <p
            style={{
              margin: ".35rem 0 0",
              lineHeight: 1.6,
              fontSize: "clamp(1.1rem, 1.2vw, 1.125rem)",
              color: "rgba(255,255,255,.96)",
              textShadow: "0 2px 8px rgba(0,0,0,.35)",
              maxWidth: "62ch"
            }}
          >
            <b>That means you save money, and the caregiver earns more.</b>
          </p>
        </div>
      </section>

      {/* ===== MISSION PILLARS (akcenty #1FAB1F, bez gradientów) ===== */}
      <section
        aria-label="Mission pillars"
        style={{
          margin: "4.5rem auto 3.75rem",
          maxWidth: 1200,
          padding: "0 clamp(16px, 4vw, 32px)",
          fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        }}
      >
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            fontWeight: 900,
            letterSpacing: ".2px",
            color: "#1f2a37",
            fontSize: "clamp(1.6rem, 3vw, 2.35rem)",
            lineHeight: 1.2
          }}
        >
          Connect directly. Save together.
          <br />
          <span
            style={{
              color: "#1FAB1F", // stały brand green
              fontWeight: 900
            }}
          >
            Fair pay for caregivers — fair prices for families.
          </span>
        </h1>

        <div
          aria-hidden="true"
          style={{
            width: "min(820px, 92%)",
            height: 4,
            background: "#1FAB1F",
            borderRadius: 999,
            margin: "1rem auto 2.25rem",
            opacity: 0.9
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(16px, 2.4vw, 24px)"
          }}
        >
          {[
            {
              t: "Registration is simple and free",
              d: "Registering an account is simple, free, and safe. You will only need to provide limited and non-sensitive information to create an account, explore our app, and connect with a caregiver or someone who needs care."
            },
            {
              t: "No other third parties or intermediaries",
              d: "Clarity, privacy-first design, and respectful collaboration guide every decision."
            },
            {
              t: "ICare charges a 10% flat rate on contract agreement",
              d: "Our model is based on a flat 10% fee on contractual agreements between both parties. This means you get all features of the app for free, and only pay when you earn or save."
            }
          ].map((p, i) => (
            <article
              key={p.t}
              style={{
                position: "relative",
                borderRadius: 20,
                padding: "clamp(22px, 2.2vw, 28px)",
                color: "#3B3B3B",
                boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
                overflow: "hidden",
                border: "1px solid rgba(15,23,42,0.06)",
                background: i % 2 === 1 ? "#FAFAF7" : "#FFFFFF" // delikatny beż co druga
              }}
            >
              {/* pasek akcentu po lewej */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "0 auto 0 0",
                  width: 6,
                  background: "#1FAB1F",
                  opacity: 0.9
                }}
              />

              {/* ikona (medalion) */}
              <div
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(31,171,31,0.08)",
                  color: "#000000ff",
                  border: "1px solid rgba(31,171,31,0.22)",
                  marginBottom: "1rem"
                }}
              >
                {{
                  0: (
                    <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                      <path
                        d="M16 21v-1.5a4.5 4.5 0 0 0-4.5-4.5H9.5A4.5 4.5 0 0 0 5 19.5V21"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="11"
                        cy="8"
                        r="3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 8h4M20 6v4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                  1: (
                    <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 16H11M15 12l-4 4 4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  2: (
                    <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                      <path
                        d="M5 11c0-3 3-5 7-5h2c4 0 7 2 7 5v2a3 3 0 0 1-3 3h-1l-.5 2h-3l.5-2H10l-.6 2H6l.8-2A3 3 0 0 1 5 13v-2z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <circle cx="20" cy="12" r="1.2" fill="currentColor" />
                      <path
                        d="M10 7l1.8-1.6L12.3 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11 9h4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )
                }[i]}
              </div>

              <h3
                style={{
                  margin: "0 0 .4rem",
                  color: "#1f2a37",
                  fontSize: "clamp(1.08rem, 2.1vw, 1.28rem)",
                  lineHeight: 1.25,
                  fontWeight: 800,
                  letterSpacing: ".2px"
                }}
              >
                {p.t}
              </h3>

              <p
                style={{
                  margin: 0,
                  lineHeight: 1.65,
                  fontSize: "clamp(.97rem, 1vw, 1rem)",
                  color: "#334155"
                }}
              >
                {p.d}
              </p>
            </article>
          ))}
        </div>

        {/* CTA pod kartami — spójne zielone */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: "2.1rem",
            flexWrap: "wrap"
          }}
        >
          <button
            style={{
              border: "none",
              background: "#1FAB1F", // solid brand green
              color: "#FFFFFF",
              padding: ".9rem 1.35rem",
              borderRadius: 999,
              fontWeight: 800,
              letterSpacing: ".4px",
              fontSize: ".95rem",
              boxShadow: "0 12px 28px rgba(2,8,23,.15)",
              cursor: "pointer"
            }}
          >
            Register
          </button>
          <button
            style={{
              border: "1.5px solid rgba(31,171,31,.45)",
              background: "#fff",
              color: "#0F172A",
              padding: ".86rem 1.2rem",
              borderRadius: 999,
              fontWeight: 800,
              letterSpacing: ".3px",
              fontSize: ".95rem",
              cursor: "pointer"
            }}
          >
            Terms & conditions
          </button>
        </div>
      </section>

      <SavingsEstimatorCurrency />
      <footer className={styles.footer}>
        <ul className={styles.listReset}>
          <li><Link to="/" className={styles.footerLink}>Home</Link></li>
          <li><Link to="/landing" className={styles.footerLink}>Landing</Link></li>
          <li><Link to="/privacy" className={styles.footerLink}>Privacy</Link></li>
        </ul>
        <div className={styles.copy}>
          © {new Date().getFullYear()} ICare. All rights reserved.
        </div>
        {/* ===== Quick nav (sticky) ===== */}
        <StickySubnav />

        {/* ===== 3 kroki ===== */}
        <ThreeStepGuide />

        {/* ===== Porównanie ===== */}
        <CompareAgencyVsICare />

        {/* ===== Estymator (masz już) ===== */}
        <section id="estimator">
          <SavingsEstimatorCurrency />
        </section>

        {/* ===== Kontakt CTA ===== */}
        <ContactCTABanner />

      </footer>
    </div>
  );
}
