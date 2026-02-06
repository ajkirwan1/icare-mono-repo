import WaitinglistForm from "~/components/website/common/forms/waitinglist-form";


export default function ICareEarlyAccessHomeSection() {

    const OLIVE = "#778d43";
    const wrap = {
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        padding: "clamp(3.2rem, 5vw, 4rem) 0",
        borderTop: "1px solid rgba(15,23,42,0.06)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
        fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // ✅ prevents background/hero resizing when email section expands
        minHeight: "clamp(860px, 88vh, 980px)"
    };

    const card = {
        height: "100%",
        borderRadius: 24,

        border: "1px solid rgba(15,23,42,0.10)",
        boxShadow: "0 18px 44px rgba(15,23,42,0.08)",

        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",

        padding: "clamp(18px, 2.4vw, 26px)",
        display: "flex",
        flexDirection: "column"
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

    const estimatorHeader = {
        width: "min(92vw,1100px)",
        margin: "0 auto",
        display: "grid",
        alignItems: "start",
        marginBottom: "2rem"
    }

    const estimatorImg = {
        borderRadius: 24
    }

    const container = {
        width: "min(92vw,1100px)",
        margin: "0 auto",
        display: "grid",
        gap: "clamp(16px, 2.4vw, 24px)",
        alignItems: "start",
    };

    const icareLayout = {
        display: "grid",
        gap: "clamp(16px, 2.4vw, 24px)",
        alignItems: "start",
        gridTemplateColumns: "1fr 1fr"
    }

    const header = {
        maxWidth: "72ch",
        textAlign: "left"
    };

    const h1 = {
        margin: "0 0 1.5rem",
        fontWeight: 600,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "2.4rem",
        textAlign: "center",
        // color: "#fff"
    };

    const lead = {
        margin: "0 0 1rem",
        // color: "rgba(255,255,255,0.92)",
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: "1.3rem",
        textAlign: "center"
    };

    const microCSS = `
    @media (max-width: 920px){
      .icare-est-cards{ grid-template-columns: 1fr !important; }
    }
    .icare-est-input:focus{
      border-color: rgba(185,122,87,0.55) !important;
      box-shadow: 0 0 0 4px rgba(185,122,87,0.14) !important;
    }

    /* ✅ Tooltip bubble (shows on hover OR keyboard focus) */
    .icare-tip { position: relative; display: inline-flex; align-items: center; }
    .icare-tip-bubble {
      position: absolute;
      left: 50%;
      bottom: calc(100% + 10px);
      transform: translateX(-50%);
      width: min(280px, 68vw);
      background: rgba(15,23,42,0.96);
      color: rgba(255,255,255,0.96);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      padding: 10px 12px;
      font-size: 0.92rem;
      line-height: 1.35;
      box-shadow: 0 18px 44px rgba(15,23,42,0.22);
      opacity: 0;
      pointer-events: none;
      transition: opacity .14s ease, transform .14s ease;
      transform-origin: bottom center;
    }
    .icare-tip-bubble::after{
      content: "";
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      border: 7px solid transparent;
      border-top-color: rgba(15,23,42,0.96);
    }
    .icare-tip:hover .icare-tip-bubble,
    .icare-tip:focus-within .icare-tip-bubble{
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(-2px);
    }
  `;


    return (
        <section id="waitlist" aria-label="Cost estimator" style={wrap}>
            <style>{microCSS}</style>

            <div style={estimatorHeader}>

                <h1 style={h1}>
                    Be among the first when ICare opens near you
                </h1>
                <p style={lead}>
                    Leave a few details and we’ll let you know when ICare opens near you.<br />Your answers help us understand where care is needed most, so we can
                    open in&nbsp;the right places first.
                </p>

            </div>

            <div style={container}>
                <div className="icare-wl-layout" style={icareLayout}>
                    {/* LEFT */}
                    <div style={card}>
                        <WaitinglistForm />
                    </div>

                    <img style={estimatorImg} src="/images/web/homepage/elderly2.png" alt="Elderly" />

                </div>

            </div>
        </section>
    );
}
