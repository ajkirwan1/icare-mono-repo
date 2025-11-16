import { IcareMessagesCard, IcareSection, IcareRecommendedCaregiversCard, IcareCard } from "react-library";
import { useNavigate } from "react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import MyProfileCard from "../../components/cards/my-profile-card";
import Card from "../../components/application/data-display/card/card.jsx";
import ProfileCard from "../../features/profile/profile-card.jsx";

/* ===== Meta ===== */
export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}
export const handle = { breadcrumb: "Home" };

/* ===== Lazy chunks ===== */
const MyDiaryCard = lazy(() => import("../../components/cards/my-diary-card.client.jsx"));

/* ===== Skeleton ===== */
function Skeleton({ h = 120 }) {
  return (
    <div style={{
      height: h,
      borderRadius: 16,
      background: "linear-gradient(90deg,#f4f6f8 0%,#eef2f5 20%,#f4f6f8 40%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s linear infinite"
    }}>
      <style>{"@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}"}</style>
    </div>
  );
}

/* ===== Helpers (styles & interactions) ===== */
const sectionStyle = {
  background: "#FFFFFF",
  border: "1px solid rgba(15,23,42,.08)",
  borderRadius: 16,
  boxShadow: "0 8px 20px rgba(2,8,23,.04)",
  padding: "14px 14px 12px"
};

const cardBodyStyle = { padding: "8px 6px 4px" };
const pMuted = { margin: 0, color: "#475569", fontSize: 14, lineHeight: 1.6 };

const baseButton = {
  appearance: "none",
  borderRadius: 999,
  border: "1px solid rgba(15,23,42,.12)",
  background: "#F8FAFC",
  color: "#0f172a",
  padding: "10px 14px",
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: ".02em",
  cursor: "pointer",
  transition: "transform .12s ease, box-shadow .12s ease, border-color .12s ease, background .12s ease, color .12s ease",
  boxShadow: "0 1px 0 rgba(2,8,23,.02)",
  outline: "none"
};

function enhanceButtonHandlers(styleObj, opts = {}) {
  const hoverBG = opts.hoverBG ?? "#E5E7EB";
  const activeBG = opts.activeBG ?? "#D1D5DB";
  const hoverBorder = opts.hoverBorder ?? "rgba(15,23,42,.22)";
  const activeBorder = opts.activeBorder ?? "rgba(15,23,42,.32)";
  const focusRing = opts.focusRing ?? "0 0 0 3px rgba(59,130,246,.35)";

  return {
    style: styleObj,
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.borderColor = hoverBorder;
      e.currentTarget.style.background = hoverBG;
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(2,8,23,.07)";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "rgba(15,23,42,.12)";
      e.currentTarget.style.background = styleObj.background || "#F8FAFC";
      e.currentTarget.style.boxShadow = "0 1px 0 rgba(2,8,23,.02)";
    },
    onMouseDown: (e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.background = activeBG;
      e.currentTarget.style.borderColor = activeBorder;
      e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(0,0,0,.04)";
    },
    onMouseUp: (e) => {
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.background = hoverBG;
      e.currentTarget.style.borderColor = hoverBorder;
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(2,8,23,.07)";
    },
    onFocus: (e) => { e.currentTarget.style.boxShadow = `${focusRing}, 0 1px 0 rgba(2,8,23,.02)`; },
    onBlur: (e) => { e.currentTarget.style.boxShadow = "0 1px 0 rgba(2,8,23,.02)"; }
  };
}

const primaryCTAStyle = {
  ...baseButton,
  background: "#1FAB1F",
  color: "#fff",
  border: "1px solid #168316",
  padding: "12px 16px",
  fontSize: 15,
  boxShadow: "0 2px 10px rgba(31,171,31,0.18)"
};

const pillButtonStyle = { ...baseButton };

function SectionHeader({ title, subtitle, cta }) {
  const btn = cta
    ? enhanceButtonHandlers(
      { ...pillButtonStyle, padding: "9px 12px", background: "#F1F5F9" },
      { hoverBG: "#E2E8F0", activeBG: "#CBD5E1" }
    )
    : null;
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      padding: "6px 4px 10px",
      marginBottom: 6,
      borderBottom: "1px solid rgba(15,23,42,.06)"
    }}>
      <div>
        <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#1f2a37", fontWeight: 800, letterSpacing: ".2px" }}>
          {title}
        </h3>
        {subtitle && <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13.5 }}>{subtitle}</p>}
      </div>
      {cta ? (
        <button type="button" aria-label={cta.label} onClick={cta.onClick} {...btn}>
          {cta.label}
        </button>
      ) : null}
    </header>
  );
}

/* ===== Component ===== */
export default function CaregiverRecipientHome() {
  const navigate = useNavigate();
  const [bigText, setBigText] = useState(false);

  useEffect(() => {
    const onNavigate = (e) => {
      const to = e && e.detail;
      if (typeof to === "string") {
        e.preventDefault?.();
        navigate(to);
      }
    };
    document.addEventListener("navigate", onNavigate);
    return () => document.removeEventListener("navigate", onNavigate);
  }, [navigate]);

  const primaryCTAHandlers = enhanceButtonHandlers(
    { ...primaryCTAStyle },
    {
      hoverBG: "#169B16",
      activeBG: "#127F12",
      hoverBorder: "#0f6a0f",
      activeBorder: "#0b560b",
      focusRing: "0 0 0 3px rgba(31,171,31,.35)"
    }
  );

  return (
    <>
      <IcareSection>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
            gap: "20px",
            alignItems: "start",
            width: "100%"
          }}
        >
          {/* ======= LEFT COLUMN ======= */}
          <div style={{ display: "grid", gap: 20 }}>

            <section>
              <ProfileCard />
            </section>

            {/* Recommended caregivers */}
            <section aria-label="Recommended caregivers" style={sectionStyle}>
              <SectionHeader
                title="Recommended caregivers"
                subtitle="Based on your preferences"
                cta={{ label: "See all", onClick: () => navigate("/caregivers") }}
              />
              <IcareRecommendedCaregiversCard />
            </section>

            {/* Diary */}
            <section aria-label="My diary" style={sectionStyle}>
              <SectionHeader title="My diary" subtitle="Notes, visits and schedule" />
              <Suspense fallback={<Skeleton h={200} />}>
                <MyDiaryCard />
              </Suspense>
            </section>

            {/* Contracts + Documents */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              <section aria-label="My contracts" style={sectionStyle}>
                <SectionHeader title="My contracts" subtitle="Active & pending" />
                <IcareCard variant="elevated">
                  <span slot="contents">
                    <div style={cardBodyStyle}>
                      <p style={pMuted}>No active contracts yet.</p>
                    </div>
                  </span>
                </IcareCard>
              </section>
              <section aria-label="My documents" style={sectionStyle}>
                <SectionHeader title="My documents" subtitle="IDs, certificates and uploads" />
                <IcareCard variant="elevated">
                  <span slot="contents">
                    <div style={cardBodyStyle}>
                      <p style={pMuted}>Upload documents to speed up verification.</p>
                    </div>
                  </span>
                </IcareCard>
              </section>
            </div>

            {/* Quick actions */}
            <section aria-label="Quick actions" style={sectionStyle}>
              <SectionHeader title="Quick actions" subtitle="Finish setup and start faster" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  { label: "Complete profile", onClick: () => navigate("/profile") },
                  { label: "Set preferences", onClick: () => navigate("/preferences") },
                  { label: "Browse caregivers", onClick: () => navigate("/caregivers") }
                ].map((a) => {
                  const btn = enhanceButtonHandlers(
                    { ...pillButtonStyle },
                    { hoverBG: "#E5E7EB", activeBG: "#D1D5DB" }
                  );
                  return (
                    <button key={a.label} onClick={a.onClick} {...btn}>
                      {a.label}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ======= RIGHT COLUMN (ENTIRE COLUMN RESTYLED) ======= */}
          <aside
            aria-label="Messages & notifications"
            style={{
              position: "sticky",
              top: 16,
              alignSelf: "start",
              /* right column container */
              background: "#F3F4F6",
              border: "1px solid #E5E7EB",
              borderRadius: 20,
              boxShadow: "0 10px 22px rgba(2,8,23,.06)",
              padding: 14,
              display: "grid",
              gap: 16,
              color: "#374151",              // darker readable text
              fontSize: bigText ? 16 : 14,   // bigger text toggle
              lineHeight: 1.6
            }}
          >
            {/* Right column header row with controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <strong style={{ color: "#111827", letterSpacing: ".2px" }}>Your inbox</strong>

              {/* Bigger text toggle */}
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 700,
                  color: "#374151",
                  userSelect: "none",
                  cursor: "pointer"
                }}
                title="Increase text size"
              >
                <span style={{ fontSize: 12 }}>Large text</span>
                <span
                  role="switch"
                  aria-checked={bigText}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { setBigText(v => !v); } }}
                  onClick={() => setBigText(v => !v)}
                  style={{
                    width: 46,
                    height: 26,
                    borderRadius: 999,
                    background: bigText ? "#1FAB1F" : "#CBD5E1",
                    border: `1px solid ${bigText ? "#168316" : "#94A3B8"}`,
                    position: "relative",
                    transition: "background .15s ease, border-color .15s ease",
                    outline: "none",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,.4)"
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 2,
                      left: bigText ? 22 : 2,
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: "#FFFFFF",
                      border: "1px solid rgba(0,0,0,.06)",
                      boxShadow: "0 1px 3px rgba(0,0,0,.15)",
                      transition: "left .15s ease"
                    }}
                  />
                </span>
              </label>
            </div>

            {/* Primary CTA in right column */}
            <button
              {...primaryCTAHandlers}
              onClick={() => navigate("/messages/new")}
              style={{ ...primaryCTAHandlers.style, width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              {/* chat-bubble icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
              </svg>
              Start new conversation
            </button>

            {/* Messages (with gray card + icons row) */}
            <section
              aria-label="Messages"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                boxShadow: "0 6px 16px rgba(2,8,23,.05)",
                padding: 12
              }}
            >
              <header style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                paddingBottom: 10,
                borderBottom: "1px solid rgba(15,23,42,.06)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* inbox icon */}
                  <span aria-hidden="true" style={chipIconWrap("#6366F1", "rgba(99,102,241,.15)")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                      <path d="M5 12V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" />
                      <path d="M2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6" />
                    </svg>
                  </span>
                  <strong style={{ color: "#111827", letterSpacing: ".2px" }}>New messages</strong>
                </div>

                {/* legend icons */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <LegendIcon color="#EF4444" bg="rgba(239,68,68,.12)" label="Unread">
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 8h16" />
                  </LegendIcon>
                  <LegendIcon color="#10B981" bg="rgba(16,185,129,.12)" label="Verified">
                    <path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7z" />
                  </LegendIcon>
                  <LegendIcon color="#F59E0B" bg="rgba(245,158,11,.12)" label="Attachment">
                    <path d="M21.44 11.05l-7.07 7.07a5 5 0 1 1-7.07-7.07l7.07-7.07a3 3 0 0 1 4.24 4.24l-7.07 7.07a1 1 0 1 1-1.41-1.41l6.36-6.36" />
                  </LegendIcon>
                </div>
              </header>

              <div style={{ marginTop: 10 }}>
                <IcareMessagesCard />
              </div>
            </section>

            {/* Notifications (same gray theme) */}
            <section
              aria-label="Notifications"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                boxShadow: "0 6px 16px rgba(2,8,23,.05)",
                padding: 12
              }}
            >
              <header style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                paddingBottom: 10,
                borderBottom: "1px solid rgba(15,23,42,.06)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* bell icon */}
                  <span aria-hidden="true" style={chipIconWrap("#0EA5E9", "rgba(14,165,233,.15)")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </span>
                  <strong style={{ color: "#111827", letterSpacing: ".2px" }}>Notifications</strong>
                </div>
              </header>

              <IcareCard variant="outlined">
                <span slot="contents">
                  <div style={{ padding: "10px 8px 6px" }}>
                    <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6, color: "#374151" }}>
                      <li>No new notifications.</li>
                    </ul>
                  </div>
                </span>
              </IcareCard>
            </section>
          </aside>
        </div>
      </IcareSection>

      {/* ===== Responsive tweaks ===== */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: minmax(0, 2fr)"] {
            grid-template-columns: 1fr;
          }
          aside[aria-label="Messages & notifications"] {
            position: static !important;
          }
        }
      `}</style>
    </>
  );
}

/* ===== Small UI helpers ===== */
function chipIconWrap(stroke = "#1F2937", bg = "rgba(31,41,55,.12)") {
  return {
    width: 28,
    height: 28,
    display: "grid",
    placeItems: "center",
    borderRadius: 999,
    background: bg,
    color: stroke,
    border: `1px solid ${stroke}20` /* 12% */
  };
}

function LegendIcon({ color, bg, label, children }) {
  return (
    <span title={label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span aria-hidden="true" style={chipIconWrap(color, bg)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color }}>
          {children}
        </svg>
      </span>
      <span style={{ fontSize: 12, color: "#6B7280" }}>{label}</span>
    </span>
  );
}
