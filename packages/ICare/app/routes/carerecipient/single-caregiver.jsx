import { useState } from "react";
import { useLoaderData, NavLink } from "react-router";
import { json } from "@remix-run/node";

export function meta() {
    return [
        { title: "ICare | Caregiver Profile" },
        { name: "description", content: "Meet trusted caregivers with verified experience and empathy." }
    ];
}

export async function loader({ params }) {
    const id = params.caregiverId;
    if (!id) throw new Response("Caregiver id missing", { status: 400 });

    const res = await fetch("http://localhost:4000/caregivers");
    if (!res.ok) throw new Response("Failed to load caregivers", { status: res.status });

    const caregivers = await res.json();
    const caregiver = caregivers.find((c) => String(c.id) === id);

    if (!caregiver) throw new Response("Caregiver not found", { status: 404 });
    return json(caregiver);
}

export default function CaregiverRecipientHome() {
    const caregiver = useLoaderData();
    const [isFavourited, setIsFavourited] = useState(false);
    const [hoveredBtn, setHoveredBtn] = useState(null);

    const toggleFavourite = () => setIsFavourited((v) => !v);

    const colors = {
        background: "#ffffff",
        cardBg: "#f4f4f4", // 💡 szarość tylko dla karty
        green: "#619482",
        greenDark: "#4c7865",
        border: "#dcdede",
        text: "#333",
    };

    const styles = {
        wrapper: {
            display: "flex",
            justifyContent: "center",
            backgroundColor: colors.background,
            padding: "3rem 1rem",
            fontFamily: "Nunito, sans-serif",
        },
        card: {
            backgroundColor: colors.cardBg,
            borderRadius: "30px",
            maxWidth: "820px",
            width: "100%",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            padding: "2.5rem",
            color: colors.text,
            border: `1px solid ${colors.border}`,
        },
        header: {
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            borderBottom: `2px solid ${colors.border}`,
            paddingBottom: "1.5rem",
        },
        avatar: {
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: `3px solid ${colors.green}`,
            backgroundColor: "#fff",
        },
        name: { fontSize: "1.9rem", margin: 0, color: colors.greenDark },
        role: { fontSize: "1rem", color: "#777" },
        location: { fontSize: "1.1rem", color: "#5c6b67" },
        favButton: (active) => ({
            marginTop: "1rem",
            backgroundColor: active ? colors.green : "#e7ebe9",
            color: active ? "#fff" : colors.greenDark,
            fontSize: "1rem",
            border: "none",
            borderRadius: "14px",
            padding: "0.7rem 1.2rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
        }),
        capsules: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.2rem",
            margin: "2rem 0",
        },
        capsule: {
            backgroundColor: "#fafafa",
            borderRadius: "22px",
            padding: "1rem 1.5rem",
            textAlign: "center",
            flex: "1 1 30%",
            minWidth: "160px",
            border: `1px solid ${colors.border}`,
        },
        label: { color: "#66736f", fontSize: "1rem", display: "block", marginBottom: "0.3rem" },
        value: { fontSize: "1.4rem", fontWeight: "600", color: colors.greenDark },
        section: { margin: "2rem 0" },
        sectionTitle: {
            fontSize: "1.3rem",
            color: colors.greenDark,
            borderLeft: `4px solid ${colors.green}`,
            paddingLeft: "0.5rem",
            marginBottom: "1rem",
        },
        languageCard: {
            backgroundColor: "#fbfbfb",
            border: `1px solid ${colors.border}`,
            borderRadius: "14px",
            padding: "1rem",
            marginBottom: "1rem",
        },
        bio: {
            fontSize: "1.15rem",
            lineHeight: 1.6,
            color: "#444",
            backgroundColor: "#f8f8f8",
            padding: "1.2rem",
            borderRadius: "14px",
        },
        footer: {
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${colors.border}`,
            marginTop: "2rem",
            paddingTop: "1.5rem",
            gap: "1rem",
            flexWrap: "wrap",
        },
        footerBtn: {
            backgroundColor: colors.green,
            color: "#fff",
            textDecoration: "none",
            padding: "1rem 2rem",
            borderRadius: "36px",
            fontWeight: "700",
            fontSize: "1.1rem",
            transition: "all 0.25s ease",
            boxShadow: "0 3px 10px rgba(97,148,130,0.25)",
        },
        footerBtnHover: {
            backgroundColor: colors.greenDark,
            transform: "scale(1.05)",
            boxShadow: "0 4px 12px rgba(76,120,101,0.3)",
        },
    };

    if (!caregiver) return <p style={{ textAlign: "center" }}>Loading...</p>;

    return (
        <main style={styles.wrapper}>
            <div style={styles.card}>
                <header style={styles.header}>
                    <img src={`/${caregiver.imgSrc}`} alt={caregiver.name} style={styles.avatar} />
                    <div>
                        <h1 style={styles.name}>{caregiver.name}</h1>
                        <p style={styles.role}>Professional Caregiver</p>
                        <p style={styles.location}>{caregiver.location}</p>
                        <button onClick={toggleFavourite} style={styles.favButton(isFavourited)}>
                            ❤️ {isFavourited ? "In favourites" : "Add to favourites"}
                        </button>
                    </div>
                </header>

                <section style={styles.capsules}>
                    <div style={styles.capsule}>
                        <span style={styles.label}>Age</span>
                        <span style={styles.value}>{caregiver.age}</span>
                    </div>
                    <div style={styles.capsule}>
                        <span style={styles.label}>Experience</span>
                        <span style={styles.value}>{caregiver.experience || "5+ years"}</span>
                    </div>
                    <div style={styles.capsule}>
                        <span style={styles.label}>Rating</span>
                        <span style={styles.value}>{caregiver.averageRating} ⭐</span>
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Languages</h2>
                    {caregiver.languages?.map((lang, i) => (
                        <div key={i} style={styles.languageCard}>
                            <h3 style={{ margin: "0 0 0.3rem", color: colors.greenDark }}>
                                {lang.language}
                            </h3>
                            <p>🗣 Speaking: <strong>{lang.speaking}</strong></p>
                            <p>📖 Reading: <strong>{lang.reading}</strong></p>
                        </div>
                    ))}
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>About Me</h2>
                    <p style={styles.bio}>{caregiver.bio}</p>
                </section>

                <footer style={styles.footer}>
                    {["Contact", "Resume"].map((label, i) => (
                        <NavLink
                            key={i}
                            to={label === "Contact" ? "messages" : "resume"}
                            style={{
                                ...styles.footerBtn,
                                ...(hoveredBtn === i ? styles.footerBtnHover : {}),
                            }}
                            onMouseEnter={() => setHoveredBtn(i)}
                            onMouseLeave={() => setHoveredBtn(null)}
                        >
                            {label === "Contact" ? "💬 Contact " + caregiver.name : "📄 View Resume"}
                        </NavLink>
                    ))}
                </footer>
            </div>
        </main>
    );
}
