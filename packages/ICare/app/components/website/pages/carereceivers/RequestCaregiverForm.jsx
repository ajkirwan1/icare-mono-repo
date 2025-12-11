// ============================================
// ICare – ULTRA COMPACT Empty States (40% width)
// Positioned UNDER the map, LEFT aligned
// ============================================

import React, { useState } from "react";

const containerStyle = {
    width: "min(400px, 95vw)",   // +10% wider
    marginLeft: "0",             // LEFT alignment under title
    paddingBottom: "40px",
};

const inputStyle = {
    padding: "10px 12px",        // slightly larger inputs
    borderRadius: "10px",
    border: "1px solid #DDD",
    fontSize: "0.9rem",
    width: "100%",
};


// ============================================
// 1) Compact EMPTY STATE
// ============================================

export function EmptyStateNoCaregivers() {
    return (
        <div style={{ ...containerStyle, textAlign: "left", marginTop: "1.2rem" }}>
            <h2 style={{ fontSize: "1.28rem", fontWeight: 700, marginBottom: "0.3rem", color: "#1A1A1A" }}>
                Caregivers coming soon
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.45, margin: 0 }}>
                We’re onboarding caregivers in your area. Join the waiting list or send a request.
            </p>
        </div>
    );
}


// ============================================
// 2) Placeholder caregivers
// ============================================

export function PlaceholderCaregivers() {
    const placeholders = [
        { name: "Caregiver joining soon", skill: "Verification in progress" },
        { name: "Local caregiver (coming soon)", skill: "Profile activation pending" },
    ];

    return (
        <div style={{ ...containerStyle, marginTop: "1.2rem", display: "grid", gap: "1rem" }}>
            {placeholders.map((p, i) => (
                <div
                    key={i}
                    style={{
                        padding: "14px",
                        borderRadius: "12px",
                        background: "#FAFAF8",
                        border: "1px solid #E7E4DF",
                        textAlign: "left",
                    }}
                >
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "#EAE7E3",
                            marginBottom: "0.4rem",
                        }}
                    />
                    <h3 style={{ margin: "0 0 0.2rem", fontSize: "1rem", fontWeight: 600 }}>
                        {p.name}
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>{p.skill}</p>
                </div>
            ))}
        </div>
    );
}


// ============================================
// 3) Compact WAITING LIST CTA
// ============================================

export function WaitingListCTA() {
    const handleEmail = (e) => {
        e.preventDefault();
        alert("You're on the waiting list!");
    };

    return (
        <form
            onSubmit={handleEmail}
            style={{
                ...containerStyle,
                marginTop: "1.2rem",
                display: "flex",
                gap: "8px",
            }}
        >
            <input name="email" placeholder="Email" required style={{ ...inputStyle, flex: 1 }} />
            <button
                type="submit"
                style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "#1FAB1F",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                }}
            >
                Go
            </button>
        </form>
    );
}



// ============================================
// 4) Compact REQUEST FORM + Support Needs (wider + left aligned)
// ============================================

export function RequestCaregiverForm() {
    const [selected, setSelected] = useState([]);

    const careOptions = [
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
    ];

    const toggleNeed = (option) => {
        setSelected((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            postcode: e.target.postcode.value,
            careType: e.target.careType.value,
            hoursPerWeek: e.target.hoursPerWeek.value,
            notes: e.target.notes.value,
            needs: selected,
        };

        console.log("Submitted:", formData);
        alert("We’ll match you with caregivers shortly.");
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                ...containerStyle,
                marginTop: "1.4rem",
                padding: "18px",
                borderRadius: "14px",
                background: "#FFF",
                border: "1px solid #E7E4DF",
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
            }}
        >
            <h3 style={{ fontSize: "1.05rem", margin: 0, marginBottom: "0.7rem", fontWeight: 700 }}>
                Request a caregiver
            </h3>

            {/* BASIC INFO */}
            <div style={{ display: "grid", gap: "0.8rem" }}>
                <input name="name" placeholder="Your name" required style={inputStyle} />
                <input name="email" placeholder="Email" required style={inputStyle} />
                <input name="postcode" placeholder="Postcode" required style={inputStyle} />

                <select name="careType" style={inputStyle}>
                    <option value="">Type of care</option>
                    <option value="hourly">Hourly care</option>
                    <option value="live-in">Live-in care</option>
                    <option value="overnight">Overnight assistance</option>
                    <option value="dementia">Dementia care</option>
                    <option value="respite">Respite care</option>
                    <option value="post-surgery">Post-surgery recovery</option>
                </select>

                <input
                    name="hoursPerWeek"
                    placeholder="Approx. hours per week"
                    style={inputStyle}
                />

                <textarea
                    name="notes"
                    placeholder="Short notes..."
                    style={{ ...inputStyle, minHeight: "60px" }}
                />
            </div>


            {/* SUPPORT NEEDS */}
            <h4 style={{ marginTop: "1.2rem", fontSize: "1rem", fontWeight: 600 }}>
                Choose the support you need
            </h4>

            <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "0.8rem" }}>
                We’ll connect you with caregivers who match your situation and preferences.
            </p>

            <div style={{ display: "grid", gap: "8px", marginBottom: "1.4rem" }}>
                {careOptions.map((option) => (
                    <label
                        key={option}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(option)}
                            onChange={() => toggleNeed(option)}
                        />
                        {option}
                    </label>
                ))}
            </div>

            {/* SUBMIT BUTTON AT THE VERY BOTTOM */}
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
