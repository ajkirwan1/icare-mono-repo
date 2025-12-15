// ============================================
// ICare – ULTRA COMPACT Pre-Launch (Waiting List)
// Same component names, improved UX
// ============================================

import React, { useState } from "react";

const containerStyle = {
    width: "min(400px, 95vw)",
    margin: "1.2rem auto",
    paddingBottom: "32px",
};

const inputStyle = {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #DDD",
    fontSize: "0.9rem",
    width: "100%",
};


// ============================================
// 1) EmptyStateNoCaregivers — NOW A WAITING LIST HEADER
// ============================================

export function EmptyStateNoCaregivers() {
    return (
        <div style={{ ...containerStyle, textAlign: "left", marginTop: "1.2rem" }}>
            <h2
                style={{
                    fontSize: "1.45rem",
                    fontWeight: 800,
                    marginBottom: "0.4rem",
                    color: "#1A1A1A",
                    letterSpacing: "-0.3px",
                }}
            >
                ICare is launching soon
            </h2>

            <p
                style={{
                    fontSize: "0.95rem",
                    color: "#555",
                    lineHeight: 1.5,
                    marginBottom: "0.8rem",
                }}
            >
                We’re preparing trusted caregivers and finalising our platform.
                Join the early access list to be notified when ICare becomes available in your area.
            </p>
        </div>
    );
}


// ============================================
// 2) PlaceholderCaregivers — NOW INFORMATIVE BULLETS
// ============================================

export function PlaceholderCaregivers() {
    const bullets = [
        "Verified caregivers arriving soon",
        "Secure messaging & transparent pricing",
        "Early access to care matches",
    ];

    return (
        <div style={{ ...containerStyle, marginTop: "1rem" }}>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: "0.7rem",
                }}
            >
                {bullets.map((text) => (
                    <li
                        key={text}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#444",
                            fontSize: "0.92rem",
                            lineHeight: 1.4,
                        }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1FAB1F"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {text}
                    </li>
                ))}
            </ul>
        </div>
    );
}


// ============================================
// 3) WaitingListCTA — KEEP NAME, MAKE IT PREMIUM
// ============================================

export function WaitingListCTA() {
    const handleEmail = (e) => {
        e.preventDefault();
        alert("You're on the early access list!");
    };

    return (
        <form
            onSubmit={handleEmail}
            style={{
                ...containerStyle,
                marginTop: "1.4rem",
                display: "flex",
                gap: "8px",
            }}
        >
            <input
                name="email"
                placeholder="Enter your email"
                required
                style={{ ...inputStyle, flex: 1 }}
            />

            <button
                type="submit"
                style={{
                    padding: "10px 16px",
                    borderRadius: "10px",
                    background: "#1FAB1F",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                }}
            >
                Notify me
            </button>
        </form>
    );
}


// ============================================
// 4) RequestCaregiverForm — LITTLE CHANGE, STILL AVAILABLE
// (kept for people who want to request care before launch)
// ============================================

export function RequestCaregiverForm() {
    const [selected, setSelected] = useState([]);

    const toggleNeed = (option) => {
        setSelected((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Request submitted — we'll contact you before launch.");
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                ...containerStyle,
                marginTop: "1.6rem",
                padding: "18px",
                borderRadius: "14px",
                background: "#FFF",
                border: "1px solid #E7E4DF",
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
            }}
        >
            <h3
                style={{
                    fontSize: "1.1rem",
                    marginBottom: "0.7rem",
                    fontWeight: 800,
                }}
            >
                JOIN WAITLIST
            </h3>

            <div style={{ display: "grid", gap: "0.8rem" }}>
                <input name="name" placeholder="Your name" required style={inputStyle} />
                <input name="email" placeholder="Email" required style={inputStyle} />
                <input name="postcode" placeholder="Postcode" required style={inputStyle} />
            </div>

            <button
                type="submit"
                style={{
                    marginTop: "1rem",
                    padding: "12px",
                    borderRadius: "12px",
                    background: "#1FAB1F",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: 700,
                    width: "100%",
                }}
            >
                Submit
            </button>
        </form>
    );
}
