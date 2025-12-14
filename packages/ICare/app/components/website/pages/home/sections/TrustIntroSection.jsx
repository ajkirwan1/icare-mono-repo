import React from "react";

export default function TrustIntroSection() {
    return (
        <section
            aria-label="Trust care and community intro"
            style={{
                margin: "8rem auto 3.5rem",
                padding: "0 clamp(20px,6vw,70px)",
                maxWidth: "1100px",
                fontFamily:
                    "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
            }}
        >
            <header>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        fontSize: "clamp(2.1rem,3.2vw,2.6rem)",
                        letterSpacing: "-0.35px",
                        color: "#0F172A",
                    }}
                >
                    Trust, care & community
                </h2>

                <p
                    style={{
                        marginTop: "1rem",
                        fontSize: "1.22rem",
                        lineHeight: 1.72,
                        color: "#475569",
                        maxWidth: "60ch",
                    }}
                >
                    Three values that define everything we do — safe,
                    human and connected.
                </p>
            </header>
        </section>
    );
}
