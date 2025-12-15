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

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "min(1100px, 92vw)",
                        margin: "0 auto",
                    }}
                >
                    {/* ===== WHITE TITLE ===== */}
                    <h1
                        style={{
                            fontSize: "clamp(2.6rem,4vw,3.3rem)",
                            margin: 0,
                            fontWeight: 900,
                            lineHeight: 1.05,
                            color: "#fff",
                            maxWidth: "14ch",
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
                        <strong>Work directly with families.</strong><br />
                        <strong>No agencies. No unfair commissions.</strong>
                    </p>

                    {/* ===== PLAIN LIST (no bullets) ===== */}
                    <div
                        style={{
                            display: "grid",
                            gap: ".8rem",
                            marginTop: "2rem",
                            fontSize: "1.05rem",
                        }}
                    >
                        <div>Find care roles that suit your experience</div>
                        <div>Agree transparent terms</div>
                        <div>Keep 90% of your earnings</div>
                        <div>Free registration — no subscription</div>
                    </div>

                    {/* ===== BUTTON (homepage green) ===== */}
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
            </section>
        </>
    );
}
