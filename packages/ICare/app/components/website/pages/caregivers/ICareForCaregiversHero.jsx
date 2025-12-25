import React from "react";
import { Link } from "react-router";
import heroImage from "/images/heros/icare-for-caregivers.jpg";
import ICareNavbar from "../shared/ICareNavbar";

export default function ICareForCaregiversHero() {
    return (
        <>
            <ICareNavbar />

            {/* ==== HERO ==== */}
            <section
                aria-label="ICare for Caregivers hero"
                style={{
                    position: "relative",
                    minHeight: "clamp(560px, 76vh, 980px)",
                    width: "100%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    paddingTop: "90px",
                }}
            >
                <img
                    src={heroImage}
                    alt="Care support background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(.72) saturate(.97)",
                        zIndex: 0,
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.32)",
                        zIndex: 1,
                    }}
                />

                {/* ✅ CONTENT WRAPPER — aligned left */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,

                        /* full width + controlled gutters */
                        width: "100%",
                        paddingLeft: "clamp(20px, 6vw, 96px)",
                        paddingRight: "clamp(20px, 6vw, 48px)",

                        /* left-aligned layout */
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 560px) 1fr",
                        alignItems: "center",
                    }}
                >
                    <div>
                        {/* ===== WHITE TITLE ===== */}
                        <h1
                            style={{
                                fontSize: "3rem",
                                margin: 0,
                                fontWeight: 800,
                                lineHeight: 1.05,
                                color: "#fff",
                            }}
                        >
                            ICare for Caregivers
                        </h1>

                        <p
                            style={{
                                marginTop: "1.6rem",
                                fontSize: "clamp(1.05rem,1.3vw,1.2rem)",
                                maxWidth: "60ch",
                                lineHeight: 1.6,
                                color: "rgba(255,255,255,.92)",
                            }}
                        >
                            <p style={{ fontSize: "1.6rem", fontWeight: "700", marginBottom: "1rem" }}>Work directly with families.</p>
                            <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>No agencies.</p>
                            <p style={{ fontSize: "1.2rem" }}> No unfair commissions.</p>
                        </p>


                        {/* ===== BUTTON ===== */}
                        <Link
                            to="/register"
                            style={{
                                display: "inline-flex",
                                padding: "1rem 2rem",
                                borderRadius: 999,
                                marginTop: "2.4rem",
                                background: "rgb(185, 122, 87)",
                                color: "#fff",
                                fontWeight: 700,
                                letterSpacing: ".02em",
                                textDecoration: "none",
                                transition: "all .22s ease",
                            }}
                        >
                            Quick registration
                        </Link>
                    </div>
                </div>
            </section>

        </>
    );
}
