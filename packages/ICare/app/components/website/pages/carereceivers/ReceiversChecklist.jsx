import React from "react";
import { Link } from "react-router";


export default function ReceiversChecklist() {
    return (
        <section
            aria-label="Care Needs"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#FAF8F5",
                borderTop: "1px solid #EDE7E2",
                borderBottom: "1px solid #EDE7E2",
                padding: "120px 20px 140px",
            }}
        >
            <div
                style={{
                    width: "min(1200px,92vw)",
                    margin: "0 auto",
                    display: "grid",
                    justifyItems: "center",
                }}
            >
                <div
                    style={{
                        width: "min(1000px,85vw)",
                        background: "#FFFFFF",
                        borderRadius: 32,
                        border: "1px solid rgba(166,122,99,0.18)",
                        boxShadow: "0 18px 48px rgba(0,0,0,0.06)",
                        padding: "56px 48px 68px",
                    }}
                >
                    {/* ===== HEADER ===== */}
                    <header
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid rgba(166,122,99,0.18)",
                            paddingBottom: 22,
                            marginBottom: 36,
                            flexWrap: "wrap",
                            gap: 20,
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                fontWeight: 800,
                                letterSpacing: "-0.2px",
                                fontSize: "clamp(2rem,2.6vw,2.4rem)",
                                color: "#1A1A1A",
                                lineHeight: 1.25,
                            }}
                        >
                            Tell us what you need
                        </h3>

                        <Link
                            to="/register"
                            style={{
                                background: "#A67A63",
                                color: "#fff",
                                padding: "14px 28px",
                                borderRadius: 999,
                                fontWeight: 700,
                                fontSize: "1rem",
                                textDecoration: "none",
                                boxShadow: "0 10px 28px rgba(166,122,99,0.25)",
                                transition: "all .25s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                    "0 16px 34px rgba(166,122,99,0.32)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 10px 28px rgba(166,122,99,0.25)";
                            }}
                        >
                            Show matching caregivers
                        </Link>
                    </header>

                    {/* ===== SUBTEXT ===== */}
                    <p
                        style={{
                            margin: "0 auto 34px",
                            textAlign: "center",
                            maxWidth: 640,
                            color: "#6B5F58",
                            fontSize: "1.1rem",
                            lineHeight: 1.75,
                        }}
                    >
                        Choose the support you need — we’ll connect you with the right caregivers who match your situation and preferences.
                    </p>

                    {/* ===== GRID OPTIONS ===== */}
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                            gap: 20,
                        }}
                    >
                        {[
                            "Dementia care",
                            "Mobility support",
                            "Post-surgery recovery",
                            "Overnight assistance",
                            "Live-in care",
                            "Hourly visits",
                            "Driving & errands",
                            "Polish language",
                            "German language",
                            "English language",
                        ].map((k) => (
                            <li key={k}>
                                <label
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "14px 18px",
                                        borderRadius: 18,
                                        background: "#FAF8F5",
                                        border: "1px solid rgba(166,122,99,0.25)",
                                        cursor: "pointer",
                                        transition: "all .25s",
                                        fontWeight: 600,
                                        color: "#4A4A4A",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "#F2ECE8";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "#FAF8F5";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    {/* ICON */}
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#A67A63"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="7" width="18" height="13" rx="2" />
                                        <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                                    </svg>

                                    <input
                                        type="checkbox"
                                        style={{
                                            transform: "scale(1.2)",
                                            accentColor: "#A67A63",
                                        }}
                                    />

                                    {k}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
