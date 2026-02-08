import React from "react";
import VideoSection from "../../common/sections/VideoSection";

export default function ThreeStepGuide() {
  const bullets = [
    "Create a clear profile and describe your needs or availability",
    "Connect instantly with suitable caregivers or families",
    "Agree care details upfront before anything starts",
    "Begin working together with shared expectations"
  ];

  return (
    <section
      id="how-it-works-steps"
      aria-label="Three steps"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        width: "100vw",
        background: "rgba(255, 249, 239, 0.85)",
        borderTop: "1px solid rgba(15,23,42,0.06)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
        padding: "clamp(3.8rem, 6.2vw, 5.6rem) 0",
        scrollMarginTop: "110px",
        fontFamily:
          "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 clamp(22px,4vw,44px)"
        }}
      >
        {/* HEADER */}
        <h2
          style={{
            margin: 0,
            fontWeight: 500,
            letterSpacing: "-0.6px",
            lineHeight: 1.14,
            fontSize: "clamp(2.25rem, 3vw, 2.6rem)",
            color: "#0F172A"
          }}
        >
          Get started in 3 simple steps
        </h2>

        <p
          style={{
            margin: "18px 0 0",
            color: "#0F172A",
            fontWeight: 400,
            lineHeight: 1.65,
            fontSize: "1.4rem",
            maxWidth: "78ch"
          }}
        >
          A calmer, guided process.
          <br />
          Arrange care directly - with clarity and built-in safety.
        </p>

        <div style={{ height: "30px" }} />

        {/* VIDEO + BULLETS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "clamp(28px,4vw,48px)",
            alignItems: "center"
          }}
        >
          {/* VIDEO */}
          <VideoSection videoSrc="images/web/how-it-works/howitworks.mp4" />

          {/* RIGHT COLUMN */}
          <div>
            <h3
              style={{
                margin: "0 0 1.2rem 0",
                fontWeight: 600,
                fontSize: "1.35rem",
                color: "#0F172A"
              }}
            >
              A simple, guided process
            </h3>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
                fontSize: "1.25rem",
                lineHeight: 1.6,
                color: "#0F172A"
              }}
            >
              {bullets.map((text, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px"
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      marginTop: "0.6em",
                      borderRadius: "50%",
                      background: "#778d43",
                      flexShrink: 0
                    }}
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ height: "clamp(2.0rem, 3.2vw, 2.8rem)" }} />

        {/* CTA */}
        <div>
          <a
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              color: "#fff",
              background: "#778d43",
              padding: "0.95rem 1.8rem",
              borderRadius: 999,
              fontWeight: 850,
              letterSpacing: ".01em",
              fontSize: "1rem",
              border: "1px solid rgba(0,0,0,0.08)",
              transition: "transform .18s ease, filter .18s ease"
            }}
          >
            Create your free account
          </a>
        </div>
      </div>
    </section>
  );
}
