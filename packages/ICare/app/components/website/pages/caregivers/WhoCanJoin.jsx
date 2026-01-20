import React from "react";

export default function WhoCanJoin() {
    return (
        <section
            aria-label="Caregiver benefits"
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                background: "#fff9ef",
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
                    {/* LEFT — TEXT (stacked, no boxes) */}
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

                        <div style={{ height: "1.6rem" }} />

                        {/* === SECTION 1 === */}
                        <div style={{ marginBottom: "1.6rem" }}>
                            <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>
                                ICare is not an agency
                            </h3>
                            <p style={{ marginTop: ".5rem", fontSize: "1.1rem", lineHeight: 1.55, color: "#0f172a" }}>
                                We don’t allocate shifts or run your schedule for you.
                                ICare helps you connect directly with families looking for care - while keeping your work organised in one place.
                            </p>
                        </div>

                        {/* === SECTION 2 === */}
                        <div style={{ marginBottom: "1.6rem" }}>
                            <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>
                                Your schedule stays yours
                            </h3>
                            <p style={{ marginTop: ".5rem", fontSize: "1.1rem", lineHeight: 1.55, color: "#0f172a" }}>
                                Set your availability, hours, and care types. You choose what you
                                take on and what you decline - always on your terms.
                            </p>
                        </div>

                        {/* === SECTION 3 === */}
                        <div style={{ marginBottom: "1.6rem" }}>
                            <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>
                                Your rates stay yours
                            </h3>
                            <p style={{ marginTop: ".5rem", fontSize: "1.1rem", lineHeight: 1.55, color: "#0f172a" }}>
                                You set your pricing based on experience and the support required,
                                then agree details directly with families - clear, respectful, and
                                pressure-free.
                            </p>
                        </div>

                        {/* === SECTION 4 === */}
                        <div style={{ marginBottom: "1.6rem" }}>
                            <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>
                                Flexible arrangements (no tie-ins)
                            </h3>
                            <p style={{ marginTop: ".5rem", fontSize: "1.1rem", lineHeight: 1.55, color: "#0f172a" }}>
                                There are no rigid agency-style commitments. As your work evolves,
                                you can adjust your availability and the type of support you offer.
                            </p>
                        </div>

                        {/* === SECTION 5 === */}
                        <div style={{ marginBottom: "1.6rem" }}>
                            <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>
                                Independent - with professional protection
                            </h3>
                            <p style={{ marginTop: ".5rem", fontSize: "1.1rem", lineHeight: 1.55, color: "#0f172a" }}>
                                ICare provides tools that help protect you in your work — clear
                                agreements, care expectations, secure messaging, and guidance on
                                boundaries, safeguarding, and best practice.
                            </p>
                        </div>

                        {/* === SECTION 6 === */}
                        <div>
                            <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>
                                You stay independent. We provide structure and safeguards.
                            </h3>
                            <p style={{ marginTop: ".5rem", fontSize: "1.1rem", lineHeight: 1.55, color: "#0f172a" }}>
                                From first contact to ongoing work, ICare supports you with the
                                tools, clarity, and protections needed to work safely, confidently,
                                and professionally with families.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT — IMAGE (top aligned) */}
                    <div>
                        <img
                            src="images/web/icare-for-caregivers/blackcarer.jpg"
                            alt="Caregiver providing home care support"
                            style={{
                                width: "100%",
                                height: "380px",
                                objectFit: "cover",
                                borderRadius: "22px",
                                boxShadow: "0 18px 48px rgba(0,0,0,0.16)",
                                display: "block",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
