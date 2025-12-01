import React from "react";
import { IcareWebBlock } from "react-library";

export default function FeatureBlockRight({ imgSrc, header, body, cta }) {
    return (
        <IcareWebBlock
            imgSrc={imgSrc}
            style={{
                background: "#F7F5F0",
                borderRadius: "28px",
                padding: "clamp(3rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)",
                boxShadow: "0 6px 22px rgba(0,0,0,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "2.5rem",
                flexDirection: "row-reverse",
                maxWidth: 1200,
                marginInline: "auto",
                border: "1px solid rgba(0,0,0,0.04)",
            }}
        >
            <span
                slot="header-contents"
                style={{
                    display: "block",
                    fontSize: "clamp(2rem, 3.3vw, 2.35rem)",
                    fontWeight: 900,
                    color: "#0F172A",
                    marginBottom: "1.1rem",
                    lineHeight: 1.13,
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
                    maxWidth: "620px",
                    marginBottom: "1.75rem",
                }}
            >
                {body}
            </span>

            {cta}
        </IcareWebBlock>
    );
}
