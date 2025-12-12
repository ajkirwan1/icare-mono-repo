import React from "react";

export default function CareTimeline() {
    const items = [
        {
            title: "Explore profiles",
            desc: "See experience, languages, personality & care style.",
            img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
            iconBg: "#E6F5EE",
            iconColor: "#4C7865",
            icon: (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="#4C7865" strokeWidth="1.2" />
                    <line x1="21" y1="21" x2="16.2" y2="16.2" stroke="#4C7865" strokeWidth="1.2" />
                </svg>
            ),
        },
        {
            title: "Start a conversation",
            desc: "Private, safe and warm messaging for families.",
            img: "https://images.unsplash.com/photo-1598971639058-cd7e5f9f01aa?auto=format&fit=crop&w=800&q=80",
            iconBg: "#EDF3FB",
            iconColor: "#5F6C80",
            icon: (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="10" width="18" height="11" rx="2" stroke="#5F6C80" strokeWidth="1.2" />
                    <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="#5F6C80" strokeWidth="1.2" />
                </svg>
            ),
        },
        {
            title: "Agree fair terms",
            desc: "Set expectations and rate in a calm, transparent way.",
            img: "https://images.unsplash.com/photo-1521165943319-5b4dc3f26f32?auto=format&fit=crop&w=900&q=80",
            iconBg: "#F3F0FA",
            iconColor: "#7E69B6",
            icon: (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="10" width="16" height="10" rx="2" stroke="#7E69B6" strokeWidth="1.2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#7E69B6" strokeWidth="1.2" />
                </svg>
            ),
        },
    ];

    return (
        <section
            aria-label="Care timeline"
            style={{
                width: "100%",
                background: "#FFFFFF",
                padding: "clamp(6rem, 9vw, 8rem) 0",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div style={{ width: "min(1180px, 92vw)", margin: "0 auto" }}>

                {/* HEADER */}
                <header style={{ textAlign: "center", marginBottom: "5.4rem" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            fontSize: "clamp(2.6rem,3.4vw,3rem)",
                            color: "#0F172A",
                            letterSpacing: "-0.5px",
                            lineHeight: 1.12,
                        }}
                    >
                        A guided — human way to find trusted care
                    </h2>

                    <p
                        style={{
                            margin: "1.8rem auto 0",
                            maxWidth: "64ch",
                            color: "#475569",
                            fontSize: "clamp(1.35rem,1.6vw,1.45rem)",
                            lineHeight: 1.72,
                            fontWeight: 450,
                            opacity: 0.95,
                        }}
                    >
                        Clear, step-by-step support to help you find the caregiver who truly fits your family.
                    </p>

                    {/* Luxe Divider */}
                    <div
                        aria-hidden="true"
                        style={{
                            width: 80,
                            height: 3,
                            background: "rgba(31,171,31,0.22)",
                            borderRadius: 99,
                            margin: "2.4rem auto 0",
                        }}
                    />
                </header>


                {/* ----------------------------------------- */}
                {/* ⭐ INSERTED SECTION — TYPES OF CARE ⭐ */}
                {/* ----------------------------------------- */}

                <section
                    aria-label="Types of care"
                    style={{
                        width: "min(980px, 92vw)",          // było 1100px → ciaśniej
                        margin: "0 auto 4rem",             // mniej przestrzeni
                    }}
                >
                    <h3
                        style={{
                            fontSize: "clamp(1.4rem, 2vw, 1.8rem)",   // mniejszy o ~30%
                            fontWeight: 800,
                            margin: 0,
                            color: "#0F172A",
                            letterSpacing: "-0.25px",
                        }}
                    >
                        Types of care we support
                    </h3>

                    <p
                        style={{
                            marginTop: ".6rem",
                            color: "#475569",
                            fontSize: "1rem",               // było 1.12rem → mniejsze
                            maxWidth: "54ch",
                            lineHeight: 1.55,
                        }}
                    >
                        Choose the support your family needs. ICare connects you with trusted,
                        independent caregivers for flexible home care.
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            // było 260px → boxy są węższe
                            gap: "1rem",                    // mniej przerwy
                            marginTop: "1.8rem",
                        }}
                    >
                        {[
                            { icon: "👵", label: "Elderly care", desc: "Daily support & companionship" },
                            { icon: "🧹", label: "Household help", desc: "Cleaning, cooking & chores" },
                            { icon: "🧑‍🦽", label: "Mobility support", desc: "Walking & transfers" },
                            { icon: "⚕️", label: "Medication support", desc: "Reminders & stability" },
                            { icon: "🌙", label: "Night care", desc: "Overnight presence & safety" },
                            { icon: "🕒", label: "Hourly care", desc: "Short visits, flexible" },
                            { icon: "🏡", label: "Live-in care", desc: "Full-time home assistance" },
                            { icon: "🧒", label: "Specialist care", desc: "Dementia & extra needs" },
                        ].map((box) => (
                            <div
                                key={box.label}
                                style={{
                                    padding: "1rem",          // było 1.4rem
                                    borderRadius: "14px",     // mniejszy radius
                                    border: "1.5px solid #E5E7EB",
                                    background: "#fff",
                                    transition: "all .25s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "#B97A57";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "#E5E7EB";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <div style={{ fontSize: "1.6rem", marginBottom: ".4rem" }}>{box.icon}</div>

                                <h4
                                    style={{
                                        fontWeight: 700,
                                        margin: "0 0 .2rem 0",
                                        color: "#0F172A",
                                        fontSize: "1.05rem",   // mniejsze
                                    }}
                                >
                                    {box.label}
                                </h4>

                                <p
                                    style={{
                                        margin: 0,
                                        color: "#475569",
                                        fontSize: ".85rem",     // mniejsze
                                        lineHeight: 1.45,
                                    }}
                                >
                                    {box.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ----------------------------------------- */}
                {/* END OF INSERTED SECTION */}
                {/* ----------------------------------------- */}


                {/* TIMELINE */}
                <div
                    style={{
                        animation: "fadeUp .8s ease both",
                    }}
                >
                    <Timeline items={items} />
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}


function Timeline({ items }) {
    return (
        <div style={{ position: "relative", maxWidth: 1050, margin: "0 auto", paddingTop: "4rem" }}>
            <div
                style={{
                    position: "absolute",
                    top: 88,
                    left: "8%",
                    right: "8%",
                    height: 2,
                    background: "rgba(76,120,101,0.20)",
                    zIndex: 1,
                }}
            />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "2rem",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {items.map((it, i) => (
                    <TimelineStep key={i} index={i} item={it} />
                ))}
            </div>
        </div>
    );
}

function TimelineStep({ item, index }) {
    return (
        <div
            style={{
                textAlign: "center",
                animation: `fadeUp .7s ease ${0.15 + index * 0.22}s forwards`,
                opacity: 0,
            }}
        >
            <div
                style={{
                    width: 92,
                    height: 92,
                    borderRadius: "50%",
                    background: item.iconBg,
                    display: "grid",
                    placeItems: "center",
                    border: `1px solid ${item.iconColor}33`,
                    margin: "0 auto 1.4rem",
                }}
            >
                {item.icon}
            </div>

            <div
                style={{
                    width: 82,
                    height: 82,
                    borderRadius: 18,
                    overflow: "hidden",
                    margin: "0 auto 1.2rem",
                }}
            >
                <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <h3 style={{ fontWeight: 800 }}>{item.title}</h3>
            <p style={{ maxWidth: "32ch", margin: "0 auto", color: "#475569" }}>
                {item.desc}
            </p>
        </div>
    );
}
