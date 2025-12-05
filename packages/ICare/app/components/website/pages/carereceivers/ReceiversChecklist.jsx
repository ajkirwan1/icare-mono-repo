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
                background: "#F3F9F4", // soft green-tinted background
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
                        boxShadow: "0 18px 48px rgba(0,0,0,0.05)",
                        padding: "56px 48px 68px",
                        border: "1px solid rgba(31,171,31,0.12)",
                    }}
                >
                    {/* ===== HEADER ===== */}
                    <header
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: 12,
                            marginBottom: 36,
                            flexWrap: "wrap",
                            gap: 20,
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                fontWeight: 800,
                                fontSize: "clamp(2rem,2.6vw,2.4rem)",
                                color: "#0F172A",
                                lineHeight: 1.25,
                            }}
                        >
                            Tell us what you need
                        </h3>

                        <Link
                            to="/register"
                            style={{
                                background: "#126012c8",
                                color: "#fff",
                                padding: "14px 28px",
                                borderRadius: 999,
                                fontWeight: 700,
                                fontSize: "1rem",
                                textDecoration: "none",
                                transition: "all .25s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                    "0 1px 1px rgba(31,171,31,0.32)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 1px 1px rgba(31,171,31,0.25)";
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
                            color: "#475569",
                            fontSize: "1.1rem",
                            lineHeight: 1.75,
                        }}
                    >
                        Choose the support you need — we’ll connect you with caregivers who match your situation and preferences.
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
                                        padding: "16px 20px",
                                        borderRadius: 20,
                                        background: "#F0F7F1",
                                        cursor: "pointer",
                                        transition: "all .25s",
                                        fontWeight: 600,
                                        color: "#1C2A1E",
                                        border: "1px solid rgba(31,171,31,0.22)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "#E3F3E5";
                                        e.currentTarget.style.transform =
                                            "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "#F0F7F1";
                                        e.currentTarget.style.transform =
                                            "translateY(0)";
                                    }}
                                >
                                    {/* ICON — iOS-style lock/clipboard */}
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1c5a40db"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            x="3"
                                            y="7"
                                            width="18"
                                            height="13"
                                            rx="3"
                                        />
                                        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                                    </svg>

                                    <input
                                        type="checkbox"
                                        style={{
                                            transform: "scale(1.2)",
                                            accentColor: "#1c5a40db",
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
