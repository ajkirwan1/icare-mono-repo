import WaitinglistForm from "~/components/website/common/forms/waitinglist-form";


export default function ICareWaitlistFinal() {
  const TEXT = "#0F172A";
  const OLIVE = "#778d43";

  const wrap = {
    width: "100%",
    background: "#ffffff",
    color: TEXT,
    padding: "clamp(3.8rem, 5.6vw, 5.2rem) 0",
    fontFamily:
      "Nunito, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  };

  const container = {
    width: "min(92vw, 1100px)",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "clamp(18px, 3vw, 40px)",
    alignItems: "stretch"
  };

  const card = {
    height: "100%",
    borderRadius: 24,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(15,23,42,0.10)",
    boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
    padding: "clamp(18px, 2.4vw, 26px)",
    display: "flex",
    flexDirection: "column"
  };

  const imageWrap = {
    height: "100%",
    borderRadius: 24,
    overflow: "hidden",
    border: "1px solid rgba(15,23,42,0.10)",
    boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
    background: "rgba(15,23,42,0.03)"
  };

  const image = {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover"
  };

  // ✅ H1 10% bigger (was clamp(1.42–1.64))
  const h1 = {
    margin: 0,
    fontWeight: 500,
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
    fontSize: "clamp(1.56rem, 2.08vw, 1.80rem)", // ✅ +10%
    color: TEXT
  };

  const h2 = {
    margin: "22px 0 0",
    fontWeight: 700,
    letterSpacing: "-0.15px",
    lineHeight: 1.28,
    fontSize: "1.5rem",
    color: OLIVE,
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "6px"
  };

  const lead = {
    margin: "18px 0 0",
    color: TEXT,
    fontWeight: 500,
    lineHeight: 1.65,
    fontSize: "1.2rem",
    maxWidth: "72ch"
  };

  const microCSS = `
    @media (max-width: 980px){
      .icare-wl-layout{ grid-template-columns: 1fr !important; }
      .icare-wl-image{ aspect-ratio: 4 / 3; }
    }
    @media (max-width: 620px){
      .icare-wl-grid2{ grid-template-columns: 1fr !important; }
    }
    .icare-wl-input:focus{
      border-color: rgba(231,153,97,0.55) !important;
      box-shadow: 0 0 0 4px rgba(231,153,97,0.16) !important;
    }
  `;

  return (
    <section id="waitlist" aria-label="Join the ICare waiting list" style={wrap}>
      <style>{microCSS}</style>

      <div className="icare-wl-layout" style={container}>
        {/* LEFT */}
        <div style={card}>
          <h1 style={h1}>
            Be among the first when ICare <br />
            opens near you
          </h1>
          <h2 style={h2}>Get early access in your area</h2>
          <p style={lead}>
            Leave a few details and we’ll let you know when ICare opens near you.
            Your answers help us understand where care is needed most, so we can
            open in the right places first.
          </p>

          <WaitinglistForm />
        </div>

        {/* RIGHT */}
        <div style={imageWrap}>
          <img src="/images/web/homepage/elderly2.png" alt="Browse caregivers" style={image} />
        </div>
      </div>
    </section>
  );
}
