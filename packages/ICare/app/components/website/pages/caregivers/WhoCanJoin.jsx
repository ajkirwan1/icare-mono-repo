import React from "react";

export default function WhoCanJoin() {
    const separator = {
        height: "1px",
        background: "rgba(15,23,42,0.12)",
        margin: "1.5rem 0",
        width: "100%",
    };

    return (
        <section
            aria-label="Caregiver benefits"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                background: "#f2eee6",
                padding: "6rem 0",
                fontFamily:
                    "Inter, system-ui, -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(1200px,92vw)",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "2.6rem",
                        alignItems: "start",
                    }}
                >
                    {/* LEFT — TEXT */}
                    <div>

                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 500,
                                fontSize: "2.6rem",
                                color: "#0F172A",
                                lineHeight: 1.15,
                                letterSpacing: "-0.4px",
                            }}
                        >
                            A platform designed<br />around caregivers
                        </h2>
                        <img
                            src="images/web/icare-for-caregivers/blackcarer.jpg"
                            alt="Caregiver providing home care support"
                            style={{
                                width: "100%",
                                height: "520px",
                                objectFit: "cover",
                                borderRadius: "22px",
                                boxShadow: "0 18px 48px rgba(0,0,0,0.16)",
                                display: "block",
                                marginTop: "2rem"
                            }}
                        />


                        <div style={{ height: "1.6rem" }} />

                    </div>

                    {/* RIGHT — IMAGE */}
                    <div style={{ marginTop: "7.5rem" }}>

                        {/* === SECTION 1 === */}
                        <div>
                            <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600, color: "#0F172A" }}>
                                ICare is not an agency
                            </h3>
                            <p style={{ marginTop: ".5rem", fontSize: "1.2rem", lineHeight: 1.55, color: "#0f172a" }}>
                                ICare connects you directly with families looking for care.<br />
                                We don’t allocate shifts or control your schedule - you stay fully independent,
                                with your work organised in one place.
                            </p>
                        </div>

                        <div style={separator} />

                        {/* === SECTION 2 === */}
                        <div>
                            <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600, color: "#0F172A" }}>
                                Your schedule and rates stay yours
                            </h3>
                            <p style={{ marginTop: ".25rem", fontSize: "1.2rem", lineHeight: 1.55, color: "#0f172a" }}>
                                Set your availability, hours and pricing based on your experience and the support you offer. You choose what to accept and agree details directly with families - clearly and without pressure.
                            </p>
                        </div>

                        <div style={separator} />

                        {/* === SECTION 3 === */}
                        <div>
                            <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600, color: "#0F172A" }}>
                                Flexible, independent work
                            </h3>
                            <p style={{ marginTop: ".25rem", fontSize: "1.2rem", lineHeight: 1.55, color: "#0f172a" }}>
                                There are no agency-style tie-ins or rigid commitments.<br />
                                You can adjust your availability and care types as your work evolves.
                            </p>
                        </div>

                        <div style={separator} />

                        {/* === SECTION 4 === */}
                        <div>
                            <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600, color: "#0F172A" }}>
                                You stay independent. We provide structure and safeguards.
                            </h3>
                            <p style={{ marginTop: ".25rem", fontSize: "1.2rem", lineHeight: 1.55, color: "#0f172a" }}>
                                ICare provides tools that support safe, professional care - clear agreements,
                                secure messaging, shared expectations, and guidance on boundaries and safeguarding.
                            </p>
                        </div>



                    </div>
                </div>
            </div>
        </section>
    );
}
