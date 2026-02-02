import React from "react";
import { InfoCard } from "../cards/info-card";
import styles from "../../../../../styles/components/website/pages/who-we-are/sections/first-section.module.scss";

export function OurFoundationSection() {
    const TEXT = "#0F172A";

    return (
        <>
            <section
                id="foundation"
                aria-label="Our foundation and mission"
                style={{
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    fontFamily:
                        "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    color: TEXT, // ✅ default for whole section
                }}
            >
                {/* ================= LEFT — OUR FOUNDATION ================= */}
                <div
                    style={{
                        background: "#f1e2c9",
                        padding: "3rem",
                        display: "flex",
                        justifyContent: "flex-end",
                        color: TEXT, // ✅
                    }}
                >
                    <div style={{ maxWidth: "500px", color: TEXT }}>
                        <h2
                            style={{
                                fontSize: "2.8rem",
                                fontWeight: 500,
                                lineHeight: 1.22,
                                letterSpacing: "-0.3px",
                                marginBottom: "1.4rem",
                                color: TEXT, // ✅
                            }}
                        >
                            Our foundation
                        </h2>

                        <p
                            style={{
                                fontSize: "1.22rem",
                                lineHeight: 1.65,
                                marginBottom: "1.8rem",
                                color: TEXT, // ✅
                                fontWeight: 400,
                            }}
                        >
                            Care often begins with a simple intention - helping someone stay safe and comfortable at home.
                        </p>

                        <p
                            style={{
                                fontSize: "1.22rem",
                                lineHeight: 1.65,
                                marginBottom: "1.8rem",
                                color: TEXT, // ✅
                                fontWeight: 400,
                            }}
                        >
                            In practice, families quickly face uncertainty: how to find the right person, how to organise support, and how to know what’s really happening day to day.
                        </p>

                        <p
                            style={{
                                marginTop: "2rem",
                                fontSize: "1.22rem",
                                lineHeight: 1.6,
                                color: TEXT, // ✅
                            }}
                        >
                            ICare was shaped by first-hand experience of live-in care.
                            We saw how difficult it can be to balance trust, responsibility and everyday life — both for families and for caregivers.
                        </p>

                        <p
                            style={{
                                marginTop: "2rem",
                                fontSize: "1.22rem",
                                lineHeight: 1.6,
                                color: TEXT, // ✅
                            }}
                        >
                            That experience led us to build ICare: a platform that brings structure and clarity to care arrangements, while keeping relationships direct and respectful.
                            Caregivers remain independent. Families gain confidence. Expectations stay clear from the start
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT — OUR MISSION ================= */}
                <div
                    style={{
                        background: "#fff9ef",
                        padding: "3rem",
                        display: "flex",
                        justifyContent: "flex-start",
                        color: TEXT, // ✅
                    }}
                >
                    <div style={{ maxWidth: "500px", color: TEXT }}>
                        <h2
                            style={{
                                fontSize: "2.8rem",
                                fontWeight: 500,
                                lineHeight: 1.22,
                                letterSpacing: "-0.3px",
                                marginBottom: "1.4rem",
                                color: TEXT, // ✅
                            }}
                        >
                            Our mission
                        </h2>

                        <p
                            style={{
                                fontSize: "1.22rem",
                                lineHeight: 1.65,
                                marginBottom: "1.6rem",
                                color: TEXT, // ✅
                            }}
                        >
                            We help older adults live with dignity, connection and everyday companionship.
                            <br /><br />
                            Across the UK, too many people experience loneliness, while families struggle to find support they can truly trust.
                            <br />
                            ICare exists to make finding companionship calmer, clearer and more human - while valuing the caregivers who bring warmth and presence into people’s lives.
                        </p>

                        <p
                            style={{
                                fontSize: "1.22rem",
                                lineHeight: 1.65,
                                color: TEXT, // ✅
                            }}
                        >
                            Our focus is simple: reduce unnecessary stress, make arrangements clearer, and support care that feels respectful and well-organised from the start.
                            <br />
                            By keeping communication direct, information secure and costs transparent, we help care begin on steady, confident terms.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= NEW SECTION — WHAT WE'RE BUILDING (ADDED ONLY) ================= */}
            <section
                id="what-were-building"
                aria-label="What we’re building"
                style={{
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    background: "#fff9ef",
                    padding: "3rem",
                    fontFamily:
                        "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    color: TEXT,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div style={{ width: "100%", maxWidth: "500px", color: TEXT }}>
                    <h2
                        style={{
                            fontSize: "2.4rem",
                            fontWeight: 500,
                            lineHeight: 1.22,
                            letterSpacing: "-0.3px",
                            marginBottom: "1.2rem",
                            color: TEXT,
                        }}
                    >
                        What we are building
                    </h2>

                    <p
                        style={{
                            fontSize: "1.22rem",
                            lineHeight: 1.65,
                            marginBottom: "1.4rem",
                            color: TEXT,
                        }}
                    >
                        ICare is a UK-based platform designed to connect families with trusted companions for older adults.
                        We’re starting with <strong>companionship</strong>, because meaningful human connection is where care truly begins.
                    </p>

                    <p
                        style={{
                            fontSize: "1.22rem",
                            lineHeight: 1.65,
                            marginBottom: "1.4rem",
                            color: TEXT,
                        }}
                    >
                        For families, ICare helps you find someone who can spend unhurried, quality time with your loved one - for conversation, shared activities, walks, or simply being present.
                        Clear profiles and direct communication support confident choices.
                    </p>

                    <p
                        style={{
                            fontSize: "1.22rem",
                            lineHeight: 1.65,
                            marginBottom: "0",
                            color: TEXT,
                        }}
                    >
                        For caregivers, ICare offers flexibility, respect and the opportunity to build genuine relationships.
                        Caregivers remain independent, choose who they work with, and are valued for the connection and presence they provide.
                    </p>
                </div>
            </section>
        </>
    );
}
