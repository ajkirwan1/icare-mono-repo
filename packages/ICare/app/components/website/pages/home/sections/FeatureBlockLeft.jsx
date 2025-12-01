import React from "react";
import { IcareWebBlock } from "react-library";

export default function FeatureBlockLeft({ imgSrc, header, body }) {
    return (
        <IcareWebBlock
            imgSrc={imgSrc}
            style={{
                background: "#F4F5F4",
                borderRadius: "28px",
                padding: "clamp(3.2rem, 5vw, 4.2rem) clamp(1.5rem, 4vw, 3rem)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "2.5rem",
                flexDirection: "row",
                boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
                marginBottom: "clamp(48px, 6vw, 72px)",
                maxWidth: 1200,
                marginInline: "auto",
                border: "1px solid rgba(0,0,0,0.04)",
            }}
        >
            <span
                slot="header-contents"
                style={{
                    display: "block",
                    fontSize: "clamp(2.05rem, 3.8vw, 2.35rem)",
                    fontWeight: 900,
                    color: "#0F172A",
                    marginBottom: "1.25rem",
                    lineHeight: 1.12,
                    letterSpacing: "-0.35px",
                }}
            >
                {header}
            </span>

            <span
                slot="body-contents"
                style={{
                    fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                    lineHeight: 1.82,
                    color: "rgba(15,23,42,0.72)",
                    fontWeight: 400,
                    maxWidth: "640px",
                    display: "block",
                    letterSpacing: "0.25px",
                }}
            >
                {body}
            </span>
        </IcareWebBlock>
    );
}
