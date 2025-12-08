import React from "react";
import { IcareWebBlock } from "react-library";

export default function FeatureBlockLeft({ imgSrc, header, body }) {
    return (
        <IcareWebBlock
            imgSrc={imgSrc}
            style={{
                borderRadius: 32,
                padding: "clamp(3rem,5vw,4rem) clamp(1.8rem,5vw,3rem)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "3rem",
                flexWrap: "wrap",
                background: "rgba(31,171,31,0.05)",       // 💚 ICare tint
                border: "1px solid rgba(31,171,31,0.12)", // light green border
                boxShadow: "0 10px 32px rgba(0,0,0,0.04)",
                marginBottom: "clamp(48px,6vw,72px)",
                maxWidth: 1200,
                marginInline: "auto",
            }}
        >
            {/* HEADER */}
            <span
                slot="header-contents"
                style={{
                    display: "block",
                    fontSize: "clamp(2.2rem,3.5vw,2.6rem)",
                    fontWeight: 900,
                    color: "#0F172A",
                    marginBottom: "1.2rem",
                    lineHeight: 1.1,
                    letterSpacing: "-0.4px",
                    maxWidth: "22ch",
                }}
            >
                {header}
            </span>

            {/* BODY */}
            <span
                slot="body-contents"
                style={{
                    fontSize: "clamp(1.06rem,1.25vw,1.18rem)",
                    lineHeight: 1.8,
                    color: "#475569",
                    fontWeight: 400,
                    maxWidth: "48ch",
                    display: "block",
                }}
            >
                {body}
            </span>
        </IcareWebBlock>

    );
}
