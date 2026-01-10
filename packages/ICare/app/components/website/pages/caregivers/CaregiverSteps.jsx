import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faSliders,
  faWallet,
  faUsers,
  faUserGroup // optional: if not available in your version, fallback to faUsers
} from "@fortawesome/free-solid-svg-icons";

export default function CaregiverStepsEmpathy() {
  const groupIcon = faUserGroup || faUsers;

  const highlights = [
    { icon: faCircleCheck, t: "No fee", d: "Create your profile for free." },
    { icon: faSliders, t: "Flexibility", d: "Choose hours, clients and rates." },
    { icon: faWallet, t: "Keep more", d: "Agency-free, direct agreements." },
    { icon: groupIcon, t: "Direct matching", d: "Families contact you directly." }
  ];

  const steps = [
    {
      t: "Tell us about yourself",
      d: "Your skills, experience and availability help families understand who you are."
    },
    {
      t: "Complete your checks",
      d: "Upload your ID, references and documents safely. We're here to guide you."
    },
    {
      t: "Start talking to families",
      d: "Families reach out when your profile feels right. Ask questions, take your time."
    },
    {
      t: "Agree the details together",
      d: "You decide the hours, responsibilities and rate — openly and without pressure."
    },
    {
      t: "Begin supporting someone",
      d: "Your care makes a real difference. Update availability anytime."
    }
  ];

  return (
    <section
      id="caregiver-steps"
      aria-label="Caregiver steps"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        background: "#d9d7bd",
        padding: "4.6rem 0",
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <div style={{ width: "min(1200px, 92vw)", margin: "0 auto" }}>
        {/* HEADER */}
        <header style={{ marginBottom: "2.1rem", maxWidth: "820px" }}>
          <h2
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: "clamp(1.7rem,2.2vw,2.1rem)",
              letterSpacing: "-0.35px",
              color: "#0F172A",
              lineHeight: 1.15
            }}
          >
            We guide you every step of the way
          </h2>

          {/* ✅ stronger + ~10–15% bigger */}
          <p
            style={{
              marginTop: ".75rem",
              marginBottom: 0,
              color: "#0f172a",
              fontSize: "1.12rem", // ~10–15% bigger than 1rem
              lineHeight: 1.55,
              maxWidth: "70ch",
              fontWeight: 800 // strong-like
            }}
          >
            A simple way to take control of your care work and earnings.
          </p>
        </header>

        {/* WHY + BENEFITS (no big background rectangle) */}
        <div
          className="icare-whygrid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "2.6rem",
            alignItems: "start",
            marginBottom: "3.1rem" // ✅ more air
          }}
        >
          {/* LEFT: Why copy (slightly bolder) */}
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "1.30rem",
                fontWeight: 900,
                color: "#0F172A",
                letterSpacing: "-0.2px",
                lineHeight: 1.2
              }}
            >
              Why ICare?
            </h3>

            <p
              style={{
                marginTop: ".85rem",
                marginBottom: 0,
                fontSize: "1.03rem",
                lineHeight: 1.65,
                color: "#0f172a",
                fontWeight: 750, // ✅ a bit bolder
                opacity: 0.95,
                maxWidth: "72ch"
              }}
            >
              ICare is built for independent caregivers — not agencies. <br />You stay in control of your
              working life: speak directly with families, agree the right support, and work on terms
              that fit you.
            </p>

            <p
              style={{
                marginTop: "1.05rem", // ✅ more air between paragraphs
                marginBottom: 0,
                fontSize: "1.01rem",
                lineHeight: 1.6,
                color: "#0f172a",
                fontWeight: 650, // ✅ slightly bolder
                opacity: 0.9,
                maxWidth: "72ch"
              }}
            />
          </div>

          {/* RIGHT: 4 icon cards (no outer rectangle background) */}
          <div
            aria-label="Caregiver benefits highlights"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "1rem",
              padding: 0, // ✅ removed big block padding
              background: "transparent", // ✅ removed rectangle
              border: "none",
              boxShadow: "none"
            }}
          >
            {highlights.map((h) => (
              <div
                key={h.t}
                style={{
                  display: "grid",
                  gridTemplateColumns: "34px 1fr",
                  gap: ".75rem",
                  alignItems: "start"

                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(97,103,77,0.14)",
                    border: "1px solid rgba(97,103,77,0.22)",
                    color: "#0F3D20",
                    transform: "translateY(1px)"
                  }}
                >
                  <FontAwesomeIcon icon={h.icon} style={{ fontSize: 16 }} />
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 900,
                      color: "#0F172A",
                      fontSize: ".98rem",
                      letterSpacing: "-0.12px",
                      lineHeight: 1.2
                    }}
                  >
                    {h.t}
                  </div>
                  <div
                    style={{
                      marginTop: ".35rem",
                      color: "#0f172a",
                      opacity: 0.88,
                      fontSize: ".92rem",
                      lineHeight: 1.35
                    }}
                  >
                    {h.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div
          className="icare-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center"
          }}
        >
          {/* LEFT — STEPS */}
          <div style={{ display: "grid", gap: "1.35rem" }}>
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "26px 1fr",
                  gap: "1.15rem",
                  paddingBottom: "1.15rem",
                  borderBottom:
                    i !== steps.length - 1
                      ? "1px solid rgba(0,0,0,0.06)"
                      : "none"
                }}
              >
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#0F3D20",
                    opacity: 0.55,
                    lineHeight: "1.6"
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3
                    style={{
                      margin: "0 0 .25rem",
                      fontSize: "1.08rem",
                      fontWeight: 700,
                      color: "#0F172A"
                    }}
                  >
                    {s.t}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: ".95rem",
                      color: "#0f172a",
                      lineHeight: 1.45,
                      opacity: 0.95
                    }}
                  >
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — IMAGE */}
          <figure
            style={{
              margin: 0,
              width: "100%",
              height: "380px",
              borderRadius: "22px",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 18px 48px rgba(0,0,0,0.16)"
            }}
          >
            <img
              src="images/web/icare-for-caregivers/registering.jpg"
              alt="Caregiver registering on a mobile phone"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center"
              }}
            />
          </figure>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "2.9rem" }}>
          <a
            href="/register"
            style={{
              display: "inline-flex",
              padding: "0.85rem 1.8rem",
              borderRadius: 999,
              background: "#b97a57",
              color: "#fff",
              fontSize: ".95rem",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: ".01em"
            }}
          >
            Create your free account
          </a>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .icare-whygrid { grid-template-columns: 1fr !important; gap: 1.6rem !important; }
            [aria-label="Caregiver benefits highlights"] { grid-template-columns: 1fr !important; }
            .icare-main-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
