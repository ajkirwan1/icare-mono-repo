import React from "react";
import sampleImage from "/images/web-cards/web-card-image-1.jpg";

export default function HalfOverlayCard({
  image = sampleImage,
  title = "Coordinated Care",
  text = "Keep everyone aligned with a shared, secure overview.",
  ctaLabel = "Learn More",
  onClick = () => {}
}) {
  const wrap = {
    width: "50%",
    minWidth: "320px",
    position: "relative",
    borderRadius: "24px",
    overflow: "hidden",
    aspectRatio: "16 / 9",
    boxShadow: "0 8px 24px -8px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)",
    display: "flex"
  };

  const img = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    filter: "brightness(.82)"
  };

  const overlay = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(160deg, rgba(0,0,0,0.55), rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.55))"
  };

  const content = {
    position: "relative",
    zIndex: 5,
    padding: "1.75rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: ".75rem",
    color: "#fff",
    width: "100%"
  };

  const titleStyle = {
    margin: 0,
    fontSize: "clamp(1.4rem,2.2vw,1.9rem)",
    lineHeight: 1.1,
    fontWeight: 600,
    textShadow: "0 3px 12px rgba(0,0,0,0.5)"
  };

  const textStyle = {
    margin: 0,
    fontSize: ".95rem",
    lineHeight: 1.4,
    maxWidth: "520px",
    color: "rgba(255,255,255,0.92)",
    textShadow: "0 2px 8px rgba(0,0,0,0.45)"
  };

  const btn = {
    alignSelf: "flex-start",
    marginTop: ".4rem",
    background: "#ffffff",
    color: "#5B7562",
    border: "none",
    padding: ".7rem 1.2rem",
    fontSize: ".9rem",
    fontWeight: 600,
    borderRadius: "10px",
    cursor: "pointer",
    letterSpacing: ".4px",
    boxShadow: "0 4px 14px -4px rgba(0,0,0,0.35)",
    transition: "background .25s, transform .2s"
  };

  return (
    <div style={wrap} aria-label={title}>
      <img src={image} alt={title} style={img} />
      <div style={overlay} />
      <div style={content}>
        <h3 style={titleStyle}>{title}</h3>
        <p style={textStyle}>{text}</p>
        <button
          style={btn}
          onClick={onClick}
          onMouseOver={e => {
            e.currentTarget.style.background = "#5B7562";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.color = "#5B7562";
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}