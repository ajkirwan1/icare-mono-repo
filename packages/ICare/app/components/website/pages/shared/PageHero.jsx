import React from "react";
import ICareNavbar from "./ICareNavbar";

export default function PageHero({
    image,
    title,
    description,
    minHeight = "clamp(560px, 76vh, 980px)",
    contentWidth = "min(1100px, 92vw)",
    overlay = "rgba(0,0,0,0.32)",
    imageFilter = "brightness(.72) saturate(.97)",
    children,
}) {
    return (
        <>
            <ICareNavbar />

            <section
                aria-label="Page hero"
                style={{
                    position: "relative",
                    minHeight,
                    width: "100%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    paddingTop: "90px", // fixed navbar offset
                }}
            >
                {/* BACKGROUND IMAGE */}
                <img
                    src={image}
                    alt=""
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: imageFilter,
                        zIndex: 0,
                    }}
                />

                {/* OVERLAY */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: overlay,
                        zIndex: 1,
                    }}
                />

                {/* CONTENT */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: contentWidth,
                        margin: "0 auto",
                    }}
                >
                    {title && (
                        <h1
                            style={{
                                fontSize: "clamp(2.6rem,4vw,3.3rem)",
                                margin: 0,
                                fontWeight: 900,
                                lineHeight: 1.05,
                                color: "#fff",
                                maxWidth: "16ch",
                            }}
                        >
                            {title}
                        </h1>
                    )}

                    {description && (
                        <p
                            style={{
                                marginTop: "1.2rem",
                                fontSize: "clamp(1.05rem,1.3vw,1.2rem)",
                                maxWidth: "60ch",
                                lineHeight: 1.6,
                                color: "rgba(255,255,255,.92)",
                            }}
                        >
                            {description}
                        </p>
                    )}

                    {/* OPTIONAL EXTRA CONTENT */}
                    {children}
                </div>
            </section>
        </>
    );
}
