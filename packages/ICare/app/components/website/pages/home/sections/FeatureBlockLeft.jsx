import React from "react";
import { IcareWebBlock } from "react-library";

export default function FeatureBlockLeft({ imgSrc, header, body }) {
    return (
        <IcareWebBlock
            imgSrc={imgSrc}
            style={{
                borderRadius: 0,
                padding: "0",
                background: "transparent",
                border: "none",
                boxShadow: "none",
                display: "grid",
                gridTemplateColumns: "1.05fr 0.95fr",
                gap: "clamp(48px,6vw,80px)",
                alignItems: "center",
                maxWidth: 1280,
                marginInline: "auto",
                paddingBlock: "clamp(4rem,7vw,6rem)",
            }}
        >

            {/* HEADER */}
            <span
                slot="header-contents"
                style={{
                    display: "block",
                    fontSize: "clamp(1.9rem,2.6vw,2.35rem)", // ⬅️ mniejszy, subtelniejszy
                    fontWeight: 800,
                    color: "#1A1A1A",
                    marginBottom: "1.1rem",
                    lineHeight: 1.18,
                    letterSpacing: "-0.4px",
                    maxWidth: "26ch",
                }}
            >
                {header}
            </span>

            {/* BODY */}
            <span
                slot="body-contents"
                style={{
                    display: "block",
                    fontSize: "clamp(1rem,1.2vw,1.14rem)", // ⬅️ mniejszy, bardziej naturalny
                    lineHeight: 1.72,
                    color: "#4A4A4A",
                    fontWeight: 400,
                    maxWidth: "58ch",
                    opacity: 0.95,
                    marginBottom: "0.6rem",
                }}
            >
                {body}
            </span>

            {/* MEDIA — Norfolk Editorial Image */}
            <div
                slot="media"
                style={{
                    position: "relative",
                    width: "100%",
                    height: "min(480px, 52vh)",
                    borderRadius: 28,
                    overflow: "hidden",
                }}
            >
                <img
                    src={imgSrc}
                    alt=""
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                    }}
                />
            </div>

        </IcareWebBlock>


    );
}
