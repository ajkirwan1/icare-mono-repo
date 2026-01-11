import ICareNavbar from "../../components/website/pages/shared/ICareNavbar";
import ReceiversFooter from "../../components/website/pages/shared/footers/ICareFooter";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function ContactUPage({
  familyCtaHref = "#waitlist"
}) {
  const COLORS = {
    border: "rgba(15,23,42,0.10)",
    text: "#0F172A",
    textWhite: "#FFF",
    textBlack: "#000",
    muted: "rgba(15,23,42,0.72)",
    accent: "#b97a57",
    olive: "#61674d",

    // buttons
    btnFamily: "#e79961",
    btnCaregiver: "#778d43"
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
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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

  // icons: calm + a bit smaller
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
    fontSize: "1.1rem",
    maxWidth: "56ch"
  };

  const list = {
    listStyle: "none",
    padding: 0,
    margin: "6px 0 0",
    display: "grid",
    gap: 10
  };

  const li = {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    color: COLORS.textBlack,
    fontWeight: 500,
    lineHeight: 1.6,
    fontSize: "1.1rem"
  };

  const dot = {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: COLORS.accent,
    opacity: 0.55,
    marginTop: 7,
    flex: "0 0 auto"
  };

  const ctaRow = {
    marginTop: "clamp(14px, 2.2vw, 18px)",
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center"
  };

  // buttons: radius 36px
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



  const onEnter = (e) => (e.currentTarget.style.filter = "brightness(1.06)");
  const onLeave = (e) => (e.currentTarget.style.filter = "brightness(1)");
  return (
    <>
      <ICareNavbar />
      <section aria-label="ICare for families and caregivers" style={wrap}>
        <div style={overlay} />
        <div style={container}>
          <div style={header}>
            <h2 style={h2}>
              Contact us
            </h2>
            <p style={lead}>
              If you have any questions, please feel free to contact us and we will respond as quickly as possible
            </p>
          </div>

          <div className="icare-2paths" style={grid}>
            <div style={card}>
              <div style={topRow}>
                <span style={icon} aria-hidden="true">
                  <FontAwesomeIcon style={iconSvg} icon={faHouseUser} />
                </span>
                <h3 style={title}>For families & care receivers</h3>
              </div>

              <p style={sub}>
                Find support that fits your home — without agency pressure and without guessing what happens next.
              </p>

              <ul style={list}>
                <li style={li}>
                  <span style={dot} aria-hidden="true" />
                  Clear caregiver profiles and availability.
                </li>
                <li style={li}>
                  <span style={dot} aria-hidden="true" />
                  Direct, secure messaging to align tasks, hours and start date.
                </li>
                <li style={li}>
                  <span style={dot} aria-hidden="true" />
                  Transparent costs — more of your budget goes to real care.
                </li>
              </ul>

              <div style={ctaRow}>
                <a href={familyCtaHref} style={{ textDecoration: "none" }}>
                  <button
                    type="button"
                    style={primaryBtn}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    Join the waiting list
                  </button>
                </a>

                <span style={{ color: COLORS.muted, fontWeight: 650, fontSize: ".95rem" }}>
                  We’ll notify you when we open in your area.
                </span>
              </div>
            </div>
          </div>
        </div>

        <style>{`
        @media (max-width: 900px){
          .icare-2paths{ grid-template-columns: 1fr !important; }
        }
      `}</style>
      </section>

      <ReceiversFooter />
    </>
  );
}
